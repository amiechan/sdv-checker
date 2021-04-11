import React from "react";
import Card from "react-bootstrap/Card";
import parse from "../parse";

const Friendship = ({ friendshipDataString }) => {
    if (friendshipDataString !== "") {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        const friendshipData = parser.parseFromString(friendshipDataString, "text/xml");
        const tags = ["string", "Points", "Status"];
        const friendList = parse(friendshipData, tags);
        console.log(friendList);
        return (
            <Card body className="contentCard fileDiv">
                <h5>Friendship</h5>
                <>
                    {friendList.map((friend, friendIndex) => (
                        <Card body key={friendIndex} className="friendCard">
                            <p>{friend["string"]}/{friend["Points"]}/{friend["Status"]}</p>
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
