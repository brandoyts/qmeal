import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import Categories from "./Categories";
import "../css/sidebar.css";

function Sidebar(props) {
    return (
        <aside className={props.expand ? "Sidebar expand" : "Sidebar"}>
            <div className="top">
                <Logo />
                <SearchBox />
            </div>
            <Categories categoryItems={props.categories} />
        </aside>
    );
}

export default Sidebar;
