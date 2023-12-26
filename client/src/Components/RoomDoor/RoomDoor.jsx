import React from 'react';
import "./RoomDoor.scss";
import { StyledInput } from '../UI/StyledInput/StyledInput';
import StyledButton from '../UI/StyledButton/StyledButton';
import { observer } from 'mobx-react-lite';
import canvasState from '../../store/canvasState';
import { useEffect } from 'react';

const RoomDoor = observer(({ set_roomDoor }) => {

    useEffect(() => { console.log('rooms ', canvasState.listOfRooms); }, [canvasState.listOfRooms]);

    return (
        <div className='roomDoorWrapper'>
            <div className='roomDoor'>
                <select>
                    <option selected value="Крокодил Гена">Выберите комнату</option>

                    {canvasState.listOfRooms.map(room =>
                        <option value={room}>{room}</option>
                    )}

                </select>

                <StyledInput />
                <StyledInput /><StyledButton onClick={() => { set_roomDoor(false) }}>Создать комнату</StyledButton>
            </div>
        </div>
    )
})

export default RoomDoor;