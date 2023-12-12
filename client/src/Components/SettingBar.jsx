import React from 'react'
import "../styles/SettingBar.scss"
import toolState from '../store/toolState'

const SettingBar = () => {
    return (
        <div className='SettingBar'>
            <label style={{ margin: "0 10px" }} htmlFor="line-width">Толщина линии:</label>
            <input
                id='line-width'
                type="number"
                defaultValue={1} min={1} max={50}
                onChange={(e) => { toolState.setLineWidth(e.target.value) }}
            />
            <label style={{ margin: "0 10px" }} htmlFor="stroke-color">Цвет обводки:</label>
            <input
                id="stroke-color"
                type="color"
                onChange={(e) => { toolState.setStrokeColor(e.target.value) }}
            />
        </div>
    )
}

export default SettingBar
