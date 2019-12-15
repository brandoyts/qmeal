import React from "react";
import "../css/instruction.css";


function Instruction(props) {
    return(
        <div className="Instruction">
            <h1 className="title">Instructions</h1>
            <p>{props.text}</p>
        </div>
    )
}

export default Instruction;
