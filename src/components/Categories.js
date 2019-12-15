import React from "react";
import {NavLink} from "react-router-dom";
import "../css/categories.css";

function Categories({categoryItems}) {
    return (
        <ul className="Categories">
            {categoryItems.map(c => {
                const imgSrc = `../img/${c.strCategory.toLowerCase()}.svg`;
                const id = c.idCategory;
                return(
                    <li key={id}>
                        <NavLink
                            exact
                            to={`/category/${c.strCategory}`}
                            className="category-item"
                            activeClassName="active-link"
                        >
                            {c.strCategory}
                            <i><img src={imgSrc} alt="" /></i>
                        </NavLink>
                    </li>
                );
            })}
        </ul>
    )
}

export default Categories;
