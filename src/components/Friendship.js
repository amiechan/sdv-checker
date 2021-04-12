import React from "react";
import {
  Image, Row, Col, Card, ProgressBar, Accordion
} from "react-bootstrap";
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
        <Row>
          <>
            {friendList.map((friend, index) => (
              <Col className="p-1">
                <Accordion>
                  <Card className="friendCard">
                    <Accordion.Toggle className="p-0" as={Card.Header} eventKey="0">
                      <Card body key={index} className="friendCard">
                        <Card.Title><a href={"https://stardewvalleywiki.com/" + friend['string']} target="_blank">{friend['string']}</a></Card.Title>
                        <Card.Img fluid variant="top" src={`${process.env.PUBLIC_URL}/img/villagers/` + friend['string'] + `.png`} />
                        <Card.Text className="text-center">
                          <br />
                          {friend['Points'] % 250} / 250
                          <ProgressBar className="mb-3" max="250" variant="danger" now={(friend['Points'] % 250)} />
                          <Image fluid className="heartResize" src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend['Points'] / 250) + `_hearts_stack.png`}></Image>
                        </Card.Text>
                      </Card>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>e x p a n d</Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
                <br />

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
