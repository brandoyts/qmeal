import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";

class RandomMeals extends Component {
    constructor(props) {
        super(props);
        this.state = { meals: [], isLoading: true };
        this.renderContent = this.renderContent.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        this.setState({ meals: null });
    }

    async fetchData() {
        let randomMeals = [];
        // check if locals torage is empty
        // if its empty get the random meals from local storage
        if (!localStorage.getItem("randomMeals")) {
            // generate 20 random meals
            for (let i = 1; i <= 20; i++) {
                const response = await axios.get(
                    "https://www.themealdb.com/api/json/v1/1/random.php"
                );
                const data = response.data.meals[0];
                randomMeals.push(data);
            }

            localStorage.setItem("randomMeals", JSON.stringify(randomMeals));
        } else {
            // else fetch random meals and store them into local storage
            randomMeals = [...JSON.parse(localStorage.getItem("randomMeals"))];
        }

        this.setState({ meals: randomMeals, isLoading: false });
    }

    renderContent() {
        return this.state.meals.map(meal => {
            // generate a random a number
            // append random number to idMeal to prevent duplication
            const random = Math.ceil(Math.random() * 50);
            return (
                <Card
                    key={`${meal.idMeal}${random}`}
                    id={meal.idMeal}
                    imgSrc={meal.strMealThumb}
                    title={meal.strMeal}
                />
            );
        });
    }

    render() {
        return (
            <div className="RandomMeals container flex-row">
                {this.state.isLoading ? <Loader /> : this.renderContent()}
            </div>
        );
    }
}

export default RandomMeals;
