import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";
import "../css/utility.css";

class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = { results: [], isLoading: true };
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.match.params.food_name !==
            this.props.match.params.food_name
        ) {
            this.setState({ isLoading: true });
            this.fetchData();
        }
    }

    async fetchData() {
        const name = this.props.match.params.food_name;
        const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        );
        const data = response.data.meals;
        this.setState({ results: data, isLoading: false });
    }

    renderContent() {
        if (this.state.results === null || this.state.results.length === 0) {
            return <h1>No Result!</h1>;
        }

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
            <div className="SearchResult container flex-row">
                {this.state.isLoading ? <Loader /> : this.renderContent()}
            </div>
        );
    }
}

export default SearchResult;
