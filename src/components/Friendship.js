import React from "react";
import { Card, Row, Col, Accordion, Container } from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ data }) => {
  if (data !== "") {
    const parser = new DOMParser();
    // XMLDocument object returned by parseFromString to get elements from
    const friendshipData = parser.parseFromString(data, "text/xml");
    const tags = ['string', 'Points', 'Status'];
    const friendList = parse(friendshipData, tags);

    return (
        <Container fluid body >
          <Card className="contentCard">
          <Card.Header><h5>Friends</h5></Card.Header>
            <>
              {friendList.map((friend) => (
                <>
                  <Col className="col-xl-3 col-6 p-1">
                    <Card>
                      <Card.Body className="p-2">
                        <>
                          <div className="d-flex justify-content-between px-md-1">
                            <h4 className="text-primary mb-1"><a href={"https://stardewvalleywiki.com/" + friend[0]} target="_blank">{friend[0]}</a></h4>
                            <p className="mb-0">Level: { }/10</p>
                            <img src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend[1] / 250) + `_hearts.png`} className="img-fluid" alt="Hearts" style={{ maxHeight: '9px', maxWidth: '119px' }} />
                            <div className="align-self-center">
                              <img src={`${process.env.PUBLIC_URL}/img/villagers/` + friend[0] + `.png`} className="img-fluid" alt={friend[0]} style={{ maxHeight: '75px', maxWidth: '75px' }} />
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
                  <Accordion defaultActiveKey="0">
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        Click me!
                    </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Click me!
                    </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </>
              ))}
            </>
          </Card>
        </Container>
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
