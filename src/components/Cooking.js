import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image } from "react-bootstrap";
import parse from "../parse";
import cookingData from "../data/cookingData";

const Cooking = ({ recipeDataString, cookingDataString }) => {
    // some recipe names are listed slightly differently
    function translateRecipes(recipeList) {
        recipeList.forEach((recipe, recipeIndex) => {
            if (recipe["string"] === "Cheese Cauli.") {
                recipe["string"] = "Cheese Cauliflower";
            }
            if (recipe["string"] === "Cookies") {
                recipe["string"] = "Cookie";
            }
            if (recipe["string"] === "Cran. Sauce") {
                recipe["string"] = "Cranberry Sauce";
            }
            if (recipe["string"] === "Dish o' The Sea") {
                recipe["string"] = "Dish O' The Sea";
            }
            if (recipe["string"] === "Eggplant Parm.") {
                recipe["string"] = "Eggplant Parmesan";
            }
            if (recipe["string"] === "Vegetable Stew") {
                recipe["string"] = "Vegetable Medley";
            }
        })
        return recipeList;
    }

    
    if ((recipeDataString !== "") && (cookingDataString !== "")) {
        const parser = new DOMParser();
        // recipes owned
        const recipeData = parser.parseFromString(recipeDataString, "text/xml");
        // recipes cooked
        const cookingData = parser.parseFromString(cookingDataString, "text/xml");
        console.log(cookingData);
        // recipe title
        const recipeTags = ['string'];
        // recipe id + amount cooked
        const cookingTags = ['key', 'value'];
        var recipeList = parse(recipeData, recipeTags);
        const cookingList = parse(cookingData, cookingTags);
        recipeList = translateRecipes(recipeList);


        return (
            <Card body className="contentCard fileDiv">
                <h5>Cooking</h5>
                {cookingData.map((recipe, index) => (
                    <Card>
                        <Card.Title>{recipe}</Card.Title>
                    </Card>
                ))}
            </Card>
        );
    } else {
        return (
            <Card body className="contentCard fileDiv">
                <h5>Cooking</h5>
            </Card>
        );
    }
};

export default Cooking;
