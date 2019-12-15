import React from "react";
import "../css/hamburger.css";

function Hamburger(props) {
    return(
        <div onClick={props.toggle} className={props.isToggle ? "Hamburger change" : "Hamburger"}>
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
        </div>
    );
}

export default Hamburger;
