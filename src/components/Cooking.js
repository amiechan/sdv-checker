import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image } from "react-bootstrap";
import parse from "../parse";

const Cooking = ({ recipeDataString, cookingDataString }) => {


    
    if ((recipeDataString !== "") && (cookingDataString !== "")) {
        const parser = new DOMParser();
        // recipes owned
        const recipeData = parser.parseFromString(recipeDataString, "text/xml");
        // recipes cooked
        const cookingData = parser.parseFromString(cookingDataString, "text/xml");
        console.log(cookingData);
        const recipeTags = ['string'];
        const cookingTags = ['key', 'value'];
        const recipeList = parse(recipeData, recipeTags);
        const cookingList = parse(cookingData, cookingTags);
        console.log(recipeList);
        console.log(cookingList);
        return (
            <Card body className="contentCard fileDiv">
                <h5>Cooking</h5>
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
