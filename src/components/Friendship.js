import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ friendshipDataString }) => {
  if (friendshipDataString !== "") {
    const parser = new DOMParser();
    // XMLDocument object returned by parseFromString to get elements from
    const friendshipData = parser.parseFromString(friendshipDataString, "text/xml");
    const tags = ['string', 'Points', 'Status'];
    const friendList = parse(friendshipData, tags);

    return (
      <Card body className="contentCard fileDiv">
        <h5>Friendship</h5>
        <Row>
          <>
            {friendList.map((friend, index) => (
              <Col xl="2" md="6" sm="12" xs="12">
                <br />
                <Card body key={index} className="friendCard">
                  <Card.Title>{friend['string']}</Card.Title>
                  <Card.Img variant="top" src={`${process.env.PUBLIC_URL}/img/villagers/` + friend['string'] + `.png`} />
                  <Card.Text>
                    <br />
                    <ProgressBar max="250" variant="danger" now={(friend['Points'] % 250)} />
                    <p className="text-center"> {friend['Points'] % 250} / 250 </p>
                    <img class="heartResize" src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend['Points'] / 250) + `_hearts.png`} alt=""></img>
                    <p className="text-center"> {Math.floor(friend['Points'] / 250)} / 10 </p>
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </>
        </Row>
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
