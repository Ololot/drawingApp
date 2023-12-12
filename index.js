const btn = document.getElementById("btn");
const socket = new WebSocket("ws://localhost:5000/");

socket.onopen = () => {
    console.log("Client connected");
    socket.send(JSON.stringify({
        message: "Hello",
        method: "connection",
        id: 555,
        username: "WoodenUnicorn",
    }))
}

socket.onmessage = (e) => {
    console.log("Server msg: ", e.data);
}

btn.onclick = () => {
    socket.send(JSON.stringify({
        message: "Hello",
        method: "message",
        id: 555,
        username: "WoodenUnicorn",
    }))
}