import React from "react";
import {ProgressBar, Card, Row, Col}  from "react-bootstrap";
import parse from "../parse";

const Friendship = ({ professionsDataString, skillExpDataString }) => {

    // function takes array of skill xp levels 
    // returns array with additional info for each skill for rendering
    function combineSkillData(skillExpData) {
        let combinedData = [];
        const skillNames = ["Farming", "Fishing", "Foraging", "Mining", "Combat"];
        // exp cutoff for each level
        const totalLevelExp = [100, 380, 770, 1300, 2150, 3300, 4800, 6900, 10000, 15000];
        const levelExp = [100, 280, 390, 530, 850, 1150, 1500, 2100, 3100, 5000];

        skillExpData.forEach( (skill, skillIndex) => {
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
                        currentLevelExp = totalSkillExp - totalLevelExp[i-1];
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
        
        const professionsData = parser.parseFromString(professionsDataString, "text/xml");
        const skillExpData = parser.parseFromString(skillExpDataString, "text/xml");
        const tags = ["int"];

        const professions = parse(professionsData, tags);
        console.log(professions);
        const playerProfessions = defineProfessions(professions);
        console.log(playerProfessions);

        // order: farming, fishing, foraging, mining, combat 
        // 6th skill parsed is "Luck", but not currently implemented in the game
        const skillExp = parse(skillExpData, tags);
        skillExp.pop();
        // combine skill name, lowerLevel, upperLevel, exp, percentage, maybe combine with professions?
        const playerSkills = combineSkillData(skillExp);
        
        return (
            <Card body className="contentCard fileDiv">
                <h5>Farmer</h5>
                <Row>
                    <Col id="Farmer Information">
                    </Col>
                    <Col id="Skills">
                    <>
                    {playerSkills.map((skill, skillIndex) => (
                        <Card>
                            <Card.Title>{skill["name"]} (Level {skill["currentLevel"]})</Card.Title>
                            <Card.Body body key={skillIndex} >
                                <Card.Text>
                                    <p>{skill["lowerBound"]}</p>
                                    <ProgressBar max={skill["totalCurrentLevelExp"]} now={skill["currentLevelExp"]}  />
                                    <p>{skill["upperBound"]}</p>
                                    <p>{skill["currentLevelExp"]}/{skill["totalCurrentLevelExp"]}</p>
                                    {(15000 - skill["totalSkillExp"]) !== 0 ? (
                                        <div>
                                            <p>{skill["totalCurrentLevelExp"] - skill["currentLevelExp"]} XP to next level</p>
                                            <p>{15000 - skill["totalSkillExp"]} XP to max skill</p>
                                        </div>
                                    ) : (<></>)}
                                    {(skill["currentLevel"]) >= 5 ? (
                                        <p>{playerProfessions[skill["name"]][0]}</p>
                                    ):(<></>)}
                                    {(skill["currentLevel"]) === 10 ? (
                                        <p>{playerProfessions[skill["name"]][1]}</p>
                                    ):(<></>)}

                                    
                                </Card.Text>
                            </Card.Body>
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
