import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from "./parse";

function parseFriendshipData(data) {
    console.log("Parse friendship data");

    var root = data.documentElement;
    var children = root.childNodes;
    console.log(children.length);
    var count = children.length;

    return parse(["string", "Points", "Status"], data);
}

const Friendship = ({ data }) => {
    if (data !== "") {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        const friendshipData = parser.parseFromString(data, "text/xml");
        const friendList = parseFriendshipData(friendshipData);

        return (
            <Card body className="contentCard fileDiv">
                <h5>Friendship</h5>
                <>
                    {friendList.map((friend, index) => (
                        <Card body key={index} className="friendCard">
                            {friend[0]}/{friend[1]}/{friend[2]}
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
