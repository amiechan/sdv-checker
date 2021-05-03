import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image, Accordion } from "react-bootstrap";
import parse from "../parse";
import eradicationGoals from "../data/eradicationGoalData";

const EradicationGoals = ({ monsterDataString }) => {
    if (monsterDataString !== "") {
        const parser = new DOMParser();
        const monsterData = parser.parseFromString(monsterDataString, "text/xml");
        const tags = ['string', 'int'];
        const monsterList = parse(monsterData, tags);
        console.log(monsterList);
        return (
            <Accordion defaultActiveKey="0">
                <Card body className="contentCard fileDiv">
                    <Accordion.Toggle className="p-0" as={Card.Header} eventKey="0">
                        <Card.Title><h5>Eradication Goals</h5></Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card>
                            <Row>
                                {monsterList.map((item, index) => (
                                    <Col xl="2" md="6" sm="12" xs="12">
                                        <Card className="p-3">
                                            <Card.Title><a href={"https://stardewvalleywiki.com/" + item['string']} target="_blank" rel="noreferrer">{item['string']}</a></Card.Title>
                                            <Image className="craftImage" src={`${process.env.PUBLIC_URL}/img/crafting/` + item['string'].replace(/ /g, "_").replace(/:/g, "") + ".png"}></Image>
                                            {'Slain: ' + item['int']}
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
                    <h5>Eradication Goals</h5>
                </Card>
        );
    }
};

export default EradicationGoals;