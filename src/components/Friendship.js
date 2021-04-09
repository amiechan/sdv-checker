import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from "../parse";

const Friendship = ({ data }) => {
    if (data !== "") {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        const friendshipData = parser.parseFromString(data, "text/xml");
        const tags = ["string", "Points", "Status"];
        const friendList = parse(friendshipData, tags);

        console.log(friendList[0].value[0].string);

        return (
            <Card body className="contentCard fileDiv">
                <h5>Friendship</h5>
                <>
                    {friendList.map((friend, friendIndex) => (
                        <Card body key={friendIndex} className="friendCard">
                            {friend.value.map((attr, attrIndex) => (
                                <p>
                                    {/* need to fix? */}
                                    {attr.[tags[attrIndex]]}
                                </p>
                            ))}
                        </Card>
                    ))}
                </>
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
