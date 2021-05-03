import React from "react";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import projectIcon from "../img/projectIcon.png";
import playerIcon from "../img/navIcons/playerIcon.png";
//import skillsIcon from "../img/navIcons/skillsIcon.png";
import friendshipIcon from "../img/navIcons/friendshipIcon.png";
import craftingIcon from "../img/navIcons/craftingIcon.png";
import itemShippedIcon from "../img/navIcons/itemShippedIcon.png";
import fishIcon from "../img/navIcons/fishIcon.png";
import artifactsIcon from "../img/navIcons/artifactsIcon.png";
import mineralsIcon from "../img/navIcons/mineralsIcon.png";
import cookingIcon from "../img/navIcons/cookingIcon.png";
import ccBundleIcon from "../img/navIcons/ccBundleIcon.png";
import eradicationIcon from "../img/navIcons/eradicationIcon.png";
import museumIcon from "../img/navIcons/museumIcon.png";
import grandpaIcon from "../img/navIcons/grandpaIcon.png";

const Sidebar = () => {
    return (
        <Nav defaultActiveKey="#farmer" className="flex-column" variant="pills">
            {/* Nav Header */}
            <Nav.Item className="navHeader">
                <a href="#upload"><Image className="navHeaderIcon" src={projectIcon} /></a>
                <span className="navHeaderText">sdv-checker</span>
            </Nav.Item>

            {/* Nav Menu */}
            <Nav.Link href="#farmer">
                <Image className="navIcon" src={playerIcon} />
                <span className="navText">Farmer</span>
            </Nav.Link>
            
            {/* Merged with previous section

            <Nav.Link eventKey="link-1">
                <Image className="navIcon" src={skillsIcon} />
                <span className="navText">Skills</span>
            </Nav.Link>
            */}

            <Nav.Link href="#friends">
                <Image className="navIcon" src={friendshipIcon} />
                <span className="navText">Friendship</span>
            </Nav.Link>
            <Nav.Link  href="#crafting">
                <Image className="navIcon" src={craftingIcon} />
                <span className="navText">Crafting</span>
            </Nav.Link>
            {/*<Nav.Link eventKey="link-4">
                <Image className="navIcon" src={itemShippedIcon} />
                <span className="navText">Items Shipped</span>
            </Nav.Link>
            <Nav.Link eventKey="link-5">
                <Image className="navIcon" src={fishIcon} />
                <span className="navText">Fish</span>
            </Nav.Link>
            <Nav.Link eventKey="link-6">
                <Image className="navIcon" src={artifactsIcon} />
                <span className="navText">Artifacts</span>
            </Nav.Link>
            <Nav.Link eventKey="link-7">
                <Image className="navIcon" src={mineralsIcon} />
                <span className="navText">Minerals</span>
            </Nav.Link>
            <Nav.Link eventKey="link-8">
                <Image className="navIcon" src={cookingIcon} />
                <span className="navText">Cooking</span>
            </Nav.Link>
            <Nav.Link eventKey="link-9">
                <Image className="navIcon" src={ccBundleIcon} />
                <span className="navText">Community Center</span>
            </Nav.Link>*/}
            <Nav.Link href="#monster">
                <Image className="navIcon" src={eradicationIcon} />
                <span className="navText">Eradication Goals</span>
            </Nav.Link>
            <Nav.Link href="#museum">
                <Image className="navIcon" src={museumIcon} />
                <span className="navText">Museum</span>
            </Nav.Link>
            {/*<Nav.Link eventKey="link-12">
                <Image className="navIcon" src={grandpaIcon} />
                <span className="navText">Grandpa's Evaluation</span>
            </Nav.Link>*/}
        </Nav>
    );
};

export default Sidebar;
