import { useEffect } from "react"
import canvasState from "../store/canvasState"

function getInit(socket) {
    console.log(socket)
    socket.send(JSON.stringify(
        {
            method: "listOfRooms",
        }
    ))
}

export const useServer = () => {
    console.log()
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000/");
        socket.onopen = () => {
            // console.log("connection complite, ", canvasState.userName);
            socket.send(JSON.stringify({ id: 1, userName: "olololo", method: "connection" }));
            getInit(socket);
        }
        socket.onerror = (error) => {
            console.log("connection error, ", error);
            // socket.send(JSON.stringify({ id: 1, userName: "olololo", method: "connection" }));
        }
        socket.onmessage = (e) => {
            // console.log(JSON.parse(e.data))
            let msg = JSON.parse(e.data);
            switch (msg.method) {
                case "connection":
                    console.log(`Пользователь ${msg.userName} присоединился`);
                    break;
                case "draw":
                    // console.log("draw")
                    // drawHandler(msg);
                    break;
                case "listOfRooms":
                    console.log("listOfRooms ", msg);
                    canvasState.setListOfRooms(msg.listOfRooms)
                    break;
            }
        }

    }, []);
}
export default useServer;