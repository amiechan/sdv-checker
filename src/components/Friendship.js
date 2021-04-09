import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function parseFriendshipData(data) {
    console.log("Parse friendship data");

    var root = data.documentElement;
    var children = root.childNodes;
    console.log(children.length);
    var count = children.length;

    // new empty array to store parsed friend info
    var friends = [];

    // parse for name, points, and status
    for (let i = 0; i < count; i++) {
        if (data.getElementsByTagName("string")[i].textContent !== "Henchman") {
            let friendName = data.getElementsByTagName("string")[i].textContent;
            let friendPoints = data.getElementsByTagName("Points")[i]
                .textContent;
            let friendStatus = data.getElementsByTagName("Status")[i]
                .textContent;

            // add friend to array
            friends.push({
                name: friendName,
                points: friendPoints,
                status: friendStatus,
            });
        }
    }
    return friends;
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
                            {friend.name}/{friend.points}/{friend.status}
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
