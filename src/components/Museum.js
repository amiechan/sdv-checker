import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image } from "react-bootstrap";
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
            if(!(item in translatedList)) {
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
            <Card body className="contentCard fileDiv">
                <h5>Museum</h5>
                {museumList.map((item, itemIndex) => (
                    <Card>
                        {item}
                    </Card>
                ))}
            </Card>
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