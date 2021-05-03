import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image, Accordion } from "react-bootstrap";
import parse from "../parse";

const Crafting = ({ craftingDataString }) => {
    if (craftingDataString !== "") {
        const parser = new DOMParser();
        const craftingData = parser.parseFromString(craftingDataString, "text/xml");
        const tags = ['string', 'int'];
        const craftingItemList = parse(craftingData, tags);
        console.log(craftingItemList);
        return (
            <Accordion defaultActiveKey="0">
                <Card body className="contentCard fileDiv">
                    <Accordion.Toggle className="p-0" as={Card.Header} eventKey="0">
                        <Card.Title><h5>Crafting</h5></Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card>
                            <Row>
                                {craftingItemList.map((item, index) => (
                                    <Col xl="2" md="6" sm="12" xs="12">
                                        <Card className="p-3">
                                            <Card.Title><a href={"https://stardewvalleywiki.com/" + item['string']} target="_blank" rel="noreferrer">{item['string']}</a></Card.Title>
                                            <Image className="craftImage" src={`${process.env.PUBLIC_URL}/img/crafting/` + item['string'].replace(/ /g, "_").replace(/:/g, "") + ".png"}></Image>
                                            {'Crafted: ' + item['int']}
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </Accordion.Collapse>
                    </Card>
            </Accordion>
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
