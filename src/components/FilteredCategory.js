import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";
import "../css/utility.css";

class FilteredCategory extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [], isLoading: true };
        this.renderContent = this.renderContent.bind(this);
    }

    async componentDidMount() {
        const category = this.props.match.params.category_name;
        const body = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        );
        const data = body.data.meals;
        this.setState({ results: data, isLoading: false });
    }

    async componentDidUpdate(prevProps, prevState) {
        const oldCategory = prevProps.match.params.category_name;
        const newCategory = this.props.match.params.category_name;

        if (oldCategory === newCategory) {
            return;
        }

        this.setState({ isLoading: true });
        const body = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${newCategory}`
        );
        const data = body.data.meals;
        this.setState({ results: data, isLoading: false });

        console.log(newCategory);
    }

    renderContent() {
        return this.state.results.map(result => {
            return (
                <Card
                    key={result.idMeal}
                    id={result.idMeal}
                    imgSrc={result.strMealThumb}
                    title={result.strMeal}
                />
            );
        });
    }

    render() {
        return (
            <div className="FilteredCategory container flex-row">
                {this.state.isLoading ? <Loader /> : this.renderContent()}
            </div>
        );
    }
}

export default FilteredCategory;
