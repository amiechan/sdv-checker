import React from "react";
import {
  Row, Col, Card, ProgressBar
} from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ data }) => {
  if (data !== "") {
    const parser = new DOMParser();
    // XMLDocument object returned by parseFromString to get elements from
    const friendshipData = parser.parseFromString(data, "text/xml");
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
                    {friend['Points'] % 250} / 250
                    <img class="heartResize" src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend['Points'] / 250) + `_hearts.png`}></img>
                    {Math.floor(friend['Points'] / 250)} / 10
                  </Card.Text>
                </Card>
              </Col>
            ))}
          </>
        </Row>
      </Card >

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
