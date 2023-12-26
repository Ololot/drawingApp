import React, { useEffect, useRef, useState } from 'react'

import canvasState from '../store/canvasState';
import "../styles/CanvasComponent.scss"
import { observer } from 'mobx-react-lite';
import toolState from '../store/toolState';
import Brush from '../tools/Brush';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Rect from '../tools/Rect';
import axios from 'axios';

const Canvas = observer(() => {

    const canvasRef = useRef(null);
    const userNameRef = useRef(null);
    const [madal, setModal] = useState(true);
    const params = useParams();

    const mouseDownHandler = () => {
        // console.log("Запомнили ", canvasState.undoList);
        canvasState.pushToUndo(canvasRef.current.toDataURL()); //запоминаем снимок
        axios.post(`http://localhost:5000/image?id=${params.id}`, { img: canvasRef.current.toDataURL() }).
            then(responce => console.log(responce.data))
    };

    const connectionHandler = () => {
        canvasState.setUserName(userNameRef.current.value);
        setModal(false)
    };

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext("2d");
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break;
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
                break;
            case "finish":
                ctx.beginPath();
                break;
        }
    };

    useEffect(() => {

        // if (canvasState.userName !== null) {
        //     const socket = new WebSocket("ws://localhost:5000/");
        //     canvasState.setSocket(socket);
        //     canvasState.setSessionid(params.id);
        //     toolState.setTool(new Brush(canvasRef.current, socket, params.id));

        //     socket.onopen = () => {
        //         console.log("connection complite, ", canvasState.userName);
        //         socket.send(JSON.stringify({ id: params.id, userName: canvasState.userName, method: "connection" }));
        //     }
        //     socket.onmessage = (e) => {
        //         console.log(JSON.parse(e.data))
        //         let msg = JSON.parse(e.data);
        //         switch (msg.method) {
        //             case "connection":
        //                 console.log(`Пользователь ${msg.userName} присоединился`);
        //                 break;
        //             case "draw":
        //                 console.log("draw")
        //                 drawHandler(msg);
        //                 break;
        //         }
        //     }
        // }
    }, [canvasState.userName])

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        function newConnection() {
            axios.get(`http://localhost:5000/image?id=${params.id}`)
                .then(res => {
                    const img = new Image();
                    console.log("ИНИЦИАЛИЗАЦИЯ ", res)
                    img.src = res.data;
                    img.onload = () => {
                        const ctx = canvasRef.current.getContext("2d");
                        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                        ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    }
                })
                .catch(err => {
                    setTimeout(() => { newConnection(); }, 1000)
                    // newConnection();
                    console.log("ERROR ", err.message)
                })
        }
        newConnection()
    }, [])

    return (
        <div className='CanvasComponent_wrapper'>

            <Modal show={madal} onHide={() => { setModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={userNameRef} />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant="primary" onClick={() => { connectionHandler() }}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>

            <canvas
                ref={canvasRef}
                className='CanvasComponent'
                width={1000} height={1000}
                onMouseDown={() => mouseDownHandler()}
            >

            </canvas>
        </div>
    )
})

export default Canvas
