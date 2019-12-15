import React, {Component} from "react";
import axios from "axios";
import Instruction from "./Instruction";
import Loader from "./Loader";
import "../css/recipe.css";


class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {ingredients: [],
                      measures: [],
                      instructions: "",
                      youtubeLink: "",
                      isLoading: true
                    };
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        const id = this.props.match.params.recipe_id;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = response.data.meals[0];

        // convert youtube link to embed
        const embeded = data.strYoutube.replace("watch?v=", "embed/");
        this.setState({ instructions: data.strInstructions, youtubeLink: embeded });


        // filter ingredients and measures that has a value
        for (let i = 1; i <= 20; i++) {
            const ingredient = `strIngredient${i}`;
            const measure = `strMeasure${i}`;

            if ((data[`strIngredient${i}`] === "" || data[`strMeasure${i}`] === "") || (data[`strIngredient${i}`] === null || data[`strMeasure${i}`] === null)) {
                continue;
            }

            this.setState(st => ({
                ingredients: [...st.ingredients, data[ingredient]],
                measures: [...st.measures, data[measure]],
                isLoading: false
            }));
        }
    }

    renderContent() {
        return (
            <div className="Recipe container">
                <div className="banner">
                    <div className="media"><iframe title={this.state.youtubeLink} src={this.state.youtubeLink} width="100%" height="100%" frameBorder="0"></iframe></div>
                    <div className="ingredients">
                        <h1 className="title">Ingredients</h1>
                        <ul className="ingredient-item">
                            {
                                this.state.ingredients.map((ingredient, index) => {
                                    return (
                                        <li key={index}>{ingredient} - {this.state.measures[index]}</li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
                <Instruction text={this.state.instructions} />
            </div>
        );
    }

    render() {
        return(
            this.state.isLoading ?
            <Loader /> : this.renderContent()
        );
    }
}



export default Recipe;
