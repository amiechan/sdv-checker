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
                        <>
                        <Col className="col-xl-3 col-6 p-1">
                          <Card>
                            <Card.Body className="p-2">
                              <>
                              <div className="d-flex justify-content-between px-md-1">
                                  <h4 className="text-primary mb-1"><a href={"https://stardewvalleywiki.com/" + friend[0]} target="_blank">{friend[0]}</a></h4>
                                  <p className="mb-0">Level: {}/10</p>
                                  <img src="img/${friendLevel}_hearts.png" className="img-fluid" alt="Hearts" style={{ maxWidth: '6.5em' }} />
                                <div className="align-self-center">
                                  <img src={require("../img/villagers/" + friend[0] + ".png")} className="img-fluid" alt={friend[0]} style={{ maxHeight: '75px', maxWidth: '75px' }} />
                                </div>
                              </div>
                              <div className="px-md-1">
                                <div className="progress mt-1 mb-1 rounded" style={{ height: '7px' }}>
                                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: '${friendPercent}%' }} aria-valuenow="${friendPercent}" aria-valuemin={0} aria-valuemax={100} />
                                </div>
                                <p className="mb-0">Exp: {friend[1]}/250</p>
                              </div>
                              </>
                            </Card.Body>
                          </Card>
                        </Col>
                
                      </>
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
