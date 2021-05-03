import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image } from "react-bootstrap";
import parse from "../parse";

const Crafting = ({ craftingDataString }) => {


    
    if (craftingDataString !== "") {
        const parser = new DOMParser();
        const craftingData = parser.parseFromString(craftingDataString, "text/xml");
        const tags = ['string', 'int'];
        const craftingItemList = parse(craftingData, tags);
        console.log(craftingItemList);
        return (
            <Card body className="contentCard fileDiv">
                <h5>Crafting</h5>
                {craftingItemList.map((item, index) => (
                    <Card>
                        {item['string']} / {item['int']}
                    </Card>
                ))}
            </Card>
        );
    } else {
        return (
            <Card body className="contentCard fileDiv">
                <h5>Crafting</h5>
            </Card>
        );
    }
};

export default Crafting;
