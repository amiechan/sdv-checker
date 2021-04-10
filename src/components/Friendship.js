import React from "react";
import { Card, Container, Row } from "react-bootstrap";
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
        <Card.Header><h5>Friends</h5></Card.Header>
        {friendList.map((friend) => (
          <Card className="col-xl-3 col-6 p-1">
            <Card.Body className="p-2">
              <Row className="d-flex justify-content-between px-md-1">
                <h4 className="text-primary mb-1"><a href={"https://stardewvalleywiki.com/" + friend['string']} target="_blank" rel="noreferrer">{friend['string']}</a></h4>
                <p className="mb-0">Level: {Math.floor(friend['Points'] / 250)}/10</p>
                <img src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend['Points'] / 250) + `_hearts.png`} className="img-fluid" alt="Hearts" style={{ maxHeight: '9px', maxWidth: '119px' }} />
                <div className="align-self-center">
                  <img src={`${process.env.PUBLIC_URL}/img/villagers/` + friend['string'] + `.png`} className="img-fluid" alt={friend['string']} style={{ maxHeight: '75px', maxWidth: '75px' }} />
                </div>
              </Row>
              <div className="px-md-1">
                <div className="progress mt-1 mb-1 rounded" style={{ height: '7px' }}>
                  <div className="progress-bar bg-danger" role="progressbar" style={{ width: 100 * (friend['Points'] % 250) / 250 + '%' }} aria-valuenow={100 * (friend['Points'] % 250) / 250 + '%'} aria-valuemin={0} aria-valuemax={100} />
                </div>
                <p className="mb-0">Exp: {friend['Points'] % 250}/250</p>
              </div>
            </Card.Body>
          </Card>
        ))}
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
