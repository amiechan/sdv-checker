import React from "react";
import { Image, Row, Col, Card, ProgressBar, Accordion } from "react-bootstrap";
import parse from "../parse";
import returnFavories from "../data/friend_favorites.js";

const Friendship = ({ friendshipDataString }) => {
  if (friendshipDataString !== "") {
    const parser = new DOMParser();
    // XMLDocument object returned by parseFromString to get elements from
    const friendshipData = parser.parseFromString(friendshipDataString, "text/xml");
    const tags = ['string', 'Points', 'Status'];
    let friendList = parse(friendshipData, tags);
    // Henchman isn't a friend
    friendList = friendList.filter(friend => friend["string"] !== 'Henchman');
    // Get favorites
    let favorites = returnFavories();
    return (
      <Card body className="contentCard fileDiv">
        <h5>Friendship</h5>
        <Row>
          <>
            {friendList.map((friend, index) => (
              <Col key={index} className="p-1">
                <Accordion>
                  <Card className="friendCard">
                    <Accordion.Toggle className="p-0" as={Card.Header} eventKey="0">
                      <Card className="p-0" body key={index} className="friendCard">
                        <Card.Title><a href={"https://stardewvalleywiki.com/" + friend['string']} target="_blank" rel="noreferrer">{friend['string']}</a></Card.Title>
                        <Image fluid="true" variant="top" src={`${process.env.PUBLIC_URL}/img/villagers/` + friend['string'] + `.png`} />
                        <div className="text-center">
                          <br />
                          {(Math.floor(friend['Points'] / 250)) < 14 ? (friend['Points'] % 250) + ' / 250' : 'MAX'}
                          <ProgressBar className="mb-3" max="250" variant="danger" now={(friend['Points'] % 250)} />
                          <Image fluid="true" className="heartResize" src={`${process.env.PUBLIC_URL}/img/hearts/` + Math.floor(friend['Points'] / 250) + `_hearts_stack.png`}></Image>
                        </div>
                      </Card>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>Best Gifts:</p>
                        <>
                          {favorites[friend['string']].map((item, index) => (
                            <Row key={index} className="pb-1 justify-content-md-center">
                              <Image className="pr-1" src={`${process.env.PUBLIC_URL}/img/favorites/` + item.replace(/ /g, "_") + `.png`} />
                              <a href={"https://stardewvalleywiki.com/" + item} target="_blank" rel="noreferrer">{item}</a>
                            </Row>
                          ))}
                        </>
                      </Card.Body>
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
