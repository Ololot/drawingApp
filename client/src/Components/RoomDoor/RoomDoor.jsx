import React from 'react';
import "./RoomDoor.scss";
import { StyledInput } from '../UI/StyledInput/StyledInput';

export function RoomDoor({ }) {

    return (
        <div className='roomDoorWrapper'>
            <div className='roomDoor'>
                <StyledInput />
                <StyledInput />
                <StyledInput />
            </div>
        </div>
    )
}
