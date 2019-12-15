import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../css/searchBox.css";
import "../css/utility.css";

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = { text: "", isRedirect: false };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
        this.setState({ isRedirect: true });
    }

    render() {
        return (
            <div className="SearchBox">
                <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Search"
                    value={this.state.text}
                />
                {this.state.isRedirect ? (
                    <Redirect to={`/search/${this.state.text}`} />
                ) : null}
            </div>
        );
    }
}

export default SearchBox;
