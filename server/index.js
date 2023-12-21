const express = require("express");
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();// объект для широковещательной рассылки
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
    // console.log("ПОКЛЮЧЕНИЕ УСТАНОВЛЕНО ", ws);

    // ws.send("Success connect!");
    ws.on("message", (msg) => {

        msg = JSON.parse(msg);
        console.log("METHOD ", msg.method)
        switch (msg.method) {
            case "connection": connectionHandler(ws, msg);
                break;
            case "draw":
                broadcastConnection(ws, msg);
                break;
        }
        // console.log(JSON.parse(msg))
    })
})

app.post("/image", (req, res) => {
    try {
        const data = req.body.img.replace("data:image/png;base64,", "");
        fs.writeFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`), data, "base64");
        return res.status(200).json({ message: "Загружено" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Server Error");
    }
})

app.get("/image", (req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`));
        const data = "data:image/png;base64," + file.toString("base64");
        res.json(data)
    }
    catch (e) {
        console.log(e);
        return res.status(500).json("Server Error");
    }
})

app.listen(PORT, () => { console.log(`server started with a port: ${PORT}`) })

const connectionHandler = (ws, msg) => {
    console.log("connectionHandler ", msg)
    ws.id = msg.id;
    broadcastConnection(ws, msg);
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => { //пробегаем по всем подключенным клиентам, которые у нас хранятся
        console.log("forEach")
        if (client.id === msg.id) {
            console.log("dd")
            client.send(JSON.stringify(msg))
        }
    })
};