import React from "react";
import { Card, Row, Col, Accordion, Container } from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ data }) => {
    if (data !== "") {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        const friendshipData = parser.parseFromString(data, "text/xml");
        const tags = ["string", "Points", "Status"];
        const friendList = parse(friendshipData, tags);

        return (
            <Card body className="contentCard fileDiv">
                <h5>Friendship</h5>
                {friendList.map((friend, friendIndex) => (
                    <Card body key={friendIndex} className="friendCard">
                        <p>
                            {friend["string"]}/{friend["Points"]}/
                            {friend["Status"]}
                        </p>
                    </Card>
                ))}
            </Card>
        );
    } else {
        return (
            <Card body className="contentCard fileDiv">
                <h5>Friendship</h5>
            </Card>
        );
    }
};

export default Friendship;
