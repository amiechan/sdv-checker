import React from "react";
import { ProgressBar, Card, Row, Col, Container, Image } from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ playerDataString, professionsDataString, skillExpDataString }) => {

    // function takes array of skill xp levels 
    // returns array with additional info for each skill for rendering
    function combineSkillData(skillExpData) {
        let combinedData = [];
        const skillNames = ["Farming", "Fishing", "Foraging", "Mining", "Combat"];
        // exp cutoff for each level
        const totalLevelExp = [100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000];
        const levelExp = [100, 280, 390, 530, 850, 1150, 1500, 2100, 3100, 5000];

        skillExpData.forEach((skill, skillIndex) => {
            let skillDict = {};
            var name = skillNames[skillIndex];
            var totalSkillExp, lowerBound, upperBound, currentLevelExp, totalCurrentLevelExp, currentLevel;
            totalSkillExp = parseInt(skillExpData[skillIndex]["int"]);

            if ((totalSkillExp > 15000) || (totalSkillExp === 15000)) {
                totalSkillExp = 15000;
                lowerBound = 9;
                upperBound = 10;
                currentLevel = 10;
                currentLevelExp = 5000;
                totalCurrentLevelExp = 5000;
            } else {
                for (var i = 0; i < totalLevelExp.length; i++) {
                    if (totalSkillExp > totalLevelExp[i]) {
                        continue;
                    } else if (totalSkillExp < totalLevelExp[i]) { // inbetween bounds
                        lowerBound = i;
                        upperBound = i + 1;
                        currentLevelExp = totalSkillExp - totalLevelExp[i - 1];
                        totalCurrentLevelExp = levelExp[lowerBound];
                        currentLevel = lowerBound;
                        break;
                    } else if (totalSkillExp === totalLevelExp[i]) { // equal to a bound
                        lowerBound = i + 1;
                        upperBound = i + 2;
                        currentLevelExp = 0;
                        totalCurrentLevelExp = levelExp[lowerBound];
                        currentLevel = lowerBound;
                        break;
                    }
                }
            }
            // name of skill
            skillDict["name"] = name;
            // xp towards next level
            skillDict["currentLevelExp"] = currentLevelExp;
            // total xp in current level
            skillDict["totalCurrentLevelExp"] = totalCurrentLevelExp;
            // overall total xp
            skillDict["totalSkillExp"] = totalSkillExp;
            // current level
            skillDict["lowerBound"] = lowerBound;
            // current level
            skillDict["currentLevel"] = currentLevel;
            // next level
            skillDict["upperBound"] = upperBound;


            combinedData.push(skillDict);
        })
        console.log(combinedData);
        return combinedData;
    }

    function defineProfessions(professionData) {
        const professionTitles = ["Rancher", "Tiller", "Coopmaster", "Shepherd", "Artisan", "Agriculturist",
            "Fisher", "Trapper", "Angler", "Pirate", "Mariner", "Luremaster",
            "Forester", "Gatherer", "Lumberjack", "Tapper", "Botanist", "Tracker",
            "Miner", "Geologist", "Blacksmith", "Prospector", "Excavator", "Gemologist",
            "Fighter", "Scout", "Brute", "Defender", "Acrobat", "Desperado"];

        var professions = {};
        var combatProfessions = [];
        var miningProfessions = [];
        var foragingProfessions = [];
        var fishingProfessions = [];
        var farmingProfessions = [];
        // for reach profession the player has, IDs ranged from 0 - 29
        for (var i = 0; i < professionData.length; i++) {
            var professionID = parseInt(professionData[i]["int"]);
            if (professionID > 23) {
                // Combat Professions
                combatProfessions.push(professionTitles[professionID]);
            } else if (professionID > 17) {
                // Mining Professions
                miningProfessions.push(professionTitles[professionID]);
            } else if (professionID > 11) {
                // Foraging Professions
                foragingProfessions.push(professionTitles[professionID]);
            } else if (professionID > 5) {
                // Fishing Professions
                fishingProfessions.push(professionTitles[professionID]);
            } else {
                // Farming Professions
                farmingProfessions.push(professionTitles[professionID]);
            }
        }

        professions["Farming"] = farmingProfessions;
        professions["Fishing"] = fishingProfessions;
        professions["Foraging"] = foragingProfessions;
        professions["Mining"] = miningProfessions;
        professions["Combat"] = combatProfessions;

        return professions;
    }

    if ((professionsDataString !== "") && (skillExpDataString !== "")) {
        const parser = new DOMParser();
        // XMLDocument object returned by parseFromString to get elements from
        // name, day, season, year
        const playerData = parser.parseFromString(playerDataString, "text/xml");
        const professionsData = parser.parseFromString(professionsDataString, "text/xml");
        const skillExpData = parser.parseFromString(skillExpDataString, "text/xml");
        const farmerInfoTags = ["name", "dayOfMonth", "currentSeason", "year"]
        const professionSkilltags = ["int"];

        const player = parse(playerData, farmerInfoTags);

        const professions = parse(professionsData, professionSkilltags);
        const playerProfessions = defineProfessions(professions);

        // order: farming, fishing, foraging, mining, combat 
        // 6th skill parsed is "Luck", but not currently implemented in the game
        const skillExp = parse(skillExpData, professionSkilltags);
        skillExp.pop();
        // combine skill name, lowerLevel, upperLevel, exp, percentage, maybe combine with professions?
        const playerSkills = combineSkillData(skillExp);

        return (
            <Card body className="contentCard fileDiv">
                <h5>Farmer</h5>
                <Row>
                    <Col id="Farmer Information">
                        <>
                            <Card>
                                <Card.Title>{player[0]["name"]}</Card.Title>
                                <Card.Text>Day {player[0]["dayOfMonth"]} of {player[0]["currentSeason"]}, Year {player[0]["year"]}</Card.Text>
                            </Card>
                        </>
                    </Col>
                    <Col id="Skills">
                        <>
                            {playerSkills.map((skill, skillIndex) => (
                                <Card className="skillCardSize">
                                    <Container>
                                        <Card.Body body key={skillIndex} >
                                            <h6 className="text-center font-weight-bold">{skill["name"]} (Level {skill["currentLevel"]}) </h6>
                                            <div className="text-center"><Image src={`${process.env.PUBLIC_URL}/img/skillIcons/` + skill["name"] + `.png`} /></div>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs xl="2"><p>{skill["lowerBound"]}</p></Col>
                                                    <Col xs xl="8"><ProgressBar max={skill["totalCurrentLevelExp"]} now={skill["currentLevelExp"]} /></Col>
                                                    <Col xs xl="2"><p>{skill["upperBound"]}</p></Col>
                                                </Row>
                                                <p className="text-center">{skill["currentLevelExp"]} / {skill["totalCurrentLevelExp"]}</p>
                                                {(15000 - skill["totalSkillExp"]) !== 0 ? (
                                                    <Row className="text-center">
                                                        <Col xs lg="6"><p>{skill["totalCurrentLevelExp"] - skill["currentLevelExp"]} XP to next level</p></Col>
                                                        <Col xs ls="6"><p>{15000 - skill["totalSkillExp"]} XP to max skill</p></Col>
                                                    </Row>
                                                ) : (<></>)}
                                                <Row className="text-center">
                                                    {(skill["currentLevel"]) >= 5 ? (
                                                        <Col xs lg="6"><p className="font-weight-bold">{playerProfessions[skill["name"]][0]}</p></Col>
                                                    ) : (<></>)}
                                                    {(skill["currentLevel"]) === 10 ? (
                                                        <Col xs lg="6"><p className="font-weight-bold">{playerProfessions[skill["name"]][1]}</p></Col>
                                                    ) : (<></>)}
                                                </Row>
                                            </Card.Text>
                                        </Card.Body>
                                    </Container>
                                </Card>
                            ))}
                        </>
                    </Col>
                </Row>
            </Card >
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
