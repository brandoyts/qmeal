import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import FilteredCategory from "./components/FilteredCategory";
import RandomMeals from "./components/RandomMeals";
import Recipe from "./components/Recipe";
import SearchResult from "./components/SearchResult";
import Hamburger from "./components/Hamburger";
import "./css/app.css";
import "./css/utility.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { categories: [], expandNav: false, redirect: false };
        this.handleExpandNav = this.handleExpandNav.bind(this);
    }

    async componentDidMount() {
        const response = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        const categories = response.data.categories;
        this.setState({ categories: [...categories] });
    }

    handleExpandNav() {
        this.setState({ expandNav: !this.state.expandNav });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Hamburger
                        toggle={this.handleExpandNav}
                        isToggle={this.state.expandNav}
                    />
                    <Sidebar
                        categories={this.state.categories}
                        expand={this.state.expandNav}
                    />
                    <Switch>
                        <Route exact path="/" component={RandomMeals} />
                        <Route
                            exact
                            path="/category/:category_name"
                            component={FilteredCategory}
                        />
                        <Route
                            exact
                            path="/recipe/:recipe_id"
                            component={Recipe}
                        />
                        <Route
                            exact
                            path="/search/:food_name"
                            component={SearchResult}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
