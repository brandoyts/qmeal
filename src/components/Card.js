import React from "react";
import {Link} from "react-router-dom";
import "../css/card.css";

function Card(props) {
    return(
        <div className="Card">
            <img className="card-img" src={props.imgSrc} alt={props.imgSrc}></img>
                <div className="card-content">
                    <p className="card-title">{props.title}</p>
                    <Link className="cta card-btn" to={`/recipe/${props.id}`}>View Recipe</Link>
                </div>
        </div>
    )
}

export default Card;
