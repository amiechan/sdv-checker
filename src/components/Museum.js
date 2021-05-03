import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image, Accordion } from "react-bootstrap";
import parse from "../parse";
import museumData from "../data/museumData";

const Museum = ({ museumDataString }) => {

    // translate from ID to string and also add any undonated items
    function translateMuseumItems(museumList) {
        var translatedList = [];

        // add translated donated items to list
        museumList.forEach((donatedItem, donatedItemIndex) => {
            // push item ID and "donated" status
            translatedList[museumData[donatedItem["int"]]] = "Donated";
        })

        // add undonated items to list
        for (var item in museumData) {
            if(!(museumData[item] in translatedList)) {
                translatedList[museumData[item]] = "Not Donated";
            }
        }
        
        return translatedList;
    }
    
    if (museumDataString !== "") {
        const parser = new DOMParser();
        const museumData = parser.parseFromString(museumDataString, "text/xml");
        const tags = ['int'];
        var museumList = parse(museumData, tags);
        museumList = translateMuseumItems(museumList);
        console.log(museumList);
        return (
            <Accordion defaultActiveKey="0">
                <Card body className="contentCard fileDiv">
                    <Accordion.Toggle className="p-0" as={Card.Header} eventKey="0">
                        <Card.Title><h5>Museum</h5></Card.Title>
                    </Accordion.Toggle>

                    <Accordion.Collapse eventKey="0">
                        <Card>
                            <Row>
                                {Object.keys(museumList).map(item => (
                                    <Col xl="2" md="6" sm="12" xs="12">
                                        <Card className="p-3">
                                            <Card.Title className={museumList[item]=="Donated" ? 'green' : 'grey'} ><a href={"https://stardewvalleywiki.com/" + item} target="_blank" rel="noreferrer">{item}</a></Card.Title>
                                            {museumList[item]}
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
                <h5>Museum</h5>
            </Card>
        );
    }
};

export default Museum;