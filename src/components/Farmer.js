import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import parse from "../parse";

const Friendship = ({ professionsDataString, skillExpDataString }) => {

    function combineSkillData(skillExp) {
        const data = [];
        const skillNames = ["Farming", "Fishing", "Foraging", "Mining", "Combat"];

        skillExp.forEach( (skill, skillIndex) => {
            let  skillDict = {
                name: skillNames[skillIndex],
                //lowerLevel: 
                //upperLevel: 
                exp: skillExp[skillIndex],
                //percentage: skillExp[skillIndex]
            };

            data.push(skillDict);
        })

    }

    if ((professionsDataString !== "") && (skillExpDataString !== "")) {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        
        const professionsData = parser.parseFromString(professionsDataString, "text/xml");
        const skillExpData = parser.parseFromString(skillExpDataString, "text/xml");
        const tags = ["int"];

        // const professions = parse(professionsData, tags);
        // order: farming, fishing, foraging, mining, combat 
        // 6th skill parsed is "Luck", but not currently implemented in the game
        const skillExp = parse(skillExpData, tags);
        skillExp.pop();
        console.log(skillExp);
        
        // combine skill name, lowerLevel, upperLevel, exp, percentage,
        const skillCombinedData = combineSkillData(skillExp);
        

        return (
            <Card body className="contentCard fileDiv">
                <h5>Farmer</h5>
                <Row>
                    <Col id="Farmer Information">
                    </Col>
                    <Col id="Skills">
                    <>
                    {skillExp.map((skill, skillIndex) => (
                        <Card body key={skillIndex} >
                            {/*<p>{skillNames[skillIndex]}</p>*/}
                            <p>{skill['int']} / 15000</p>
                            <ProgressBar now={Number(skill['int'])}  />
                        </Card>
                    ))}
                </>
                    </Col>
                </Row>
            </Card>
        );
    } else {
        return (
            <Card body className="contentCard fileDiv">
                <h5>Farmer</h5>
            </Card>
        );
    }
};

export default Friendship;
