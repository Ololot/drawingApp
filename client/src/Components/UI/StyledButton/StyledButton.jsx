import "./StyledButton.scss";
import { useState } from "react";

export function StyledButton({ children, ...props }) {
    const [init, set_init] = useState("init");
    return (
        <div className={`SubstrateStyledBurron ${init}`} onMouseOver={() => { set_init("") }}>
            <button {...props} className="StyledButton">
                {children}
            </button>
        </div>
    )
}

export default StyledButton;
