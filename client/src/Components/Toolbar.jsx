import React from 'react'
import "../styles/Toolbar.scss"
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Line from '../tools/Line'

const Toolbar = ({ context = null, resizeFunction }) => {

    const changeColor = (e) => {
        toolState.setFillColor(e.target.value)
        // toolState.setStrokeColor(e.target.value)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();//ссылка на наш канвас
        console.log("dataUrl ", dataUrl);
        const a = document.createElement("a");         //создание элемента типы ссылка
        a.href = dataUrl;
        a.download = canvasState.sessionid + ".jpg";
        console.log("download ", a.download);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    return (
        <div className='Toolbar'>
            <button className='Toolbar__btn brush' onClick={() => { toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionid)) }}></button>
            <button className='Toolbar__btn rect' onClick={() => { toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionid)) }}></button>
            <button className='Toolbar__btn circle' onClick={() => { toolState.setTool(new Circle(canvasState.canvas)) }}></button>
            <button className='Toolbar__btn eraser' onClick={() => { toolState.setTool(new Eraser(canvasState.canvas)) }}></button>
            <button className='Toolbar__btn line' onClick={() => { toolState.setTool(new Line(canvasState.canvas)) }}></button>
            <input onChange={(e) => { changeColor(e) }} style={{ marginLeft: "10px" }} type='color'></input>
            <button className='Toolbar__btn undo' onClick={() => { console.log("Toolbar undo"); canvasState.undo(); }}></button>
            <button className='Toolbar__btn redo' onClick={() => { canvasState.redo(); }}></button>
            <button className='Toolbar__btn save' onClick={() => { console.log(context); download(); }}></button>

        </div >
    )
}

export default Toolbar
