import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Farmer from "./Farmer";
import Friendship from "./Friendship";
import EradicationGoals from "./EradicationGoals";

function getDataString(data, startTag, endTag) {
    var start = data.indexOf(startTag);
    var end = data.indexOf(endTag);
    var dataString = data.substring(start, end + endTag.length);
    return dataString;
};

function capitalizeFirstLetter(string) {
    return (string.slice(0, 15) + string.charAt(15).toUpperCase() + string.slice(16));
};

function getPlayerData(data) {
    var starterTag = "<playerInfo><data>";
    var playerInfo = getDataString(data, "<player>", "</player>");
    var playerName = getDataString(playerInfo, "<name>", "</name>");
    var playerSeason = capitalizeFirstLetter(getDataString(data, "<currentSeason>", "</currentSeason>"));
    var playerYear = getDataString(data, "<year>", "</year>");
    var playerDay = getDataString(data, "<dayOfMonth>", "</dayOfMonth>");
    var endingTag = "</data></playerInfo>";
    // is this important?
    // var versionNumber = getDataString(data, "<gameVersion>", "</gameVersion>");
    var totalMoney = getDataString(data, "<totalMoneyEarned>", "</totalMoneyEarned>");
    var playerString = starterTag.concat(playerName, playerDay, playerSeason, playerYear, endingTag, totalMoney);
    return playerString;
};

const FileUpload = () => {
    // Player (Player Info, Professions, Skill Exp)
    const [playerDataString, setPlayerDataString] = useState("");
    const [professionsDataString, setProfessionsDataString] = useState("");
    const [skillExpDataString, setSkillExpDataString] = useState("");
    
    // Friendship (Villager Name, Points, Status )
    const [friendshipDataString, setFriendshipDataString] = useState("");

    // Eradication Goals (Monster Name, Number Slain )
    const [monsterDataString, setMonsterDataString] = useState("");

    const changeHandler = (e) => {
        // get file
        var file = e.target.files[0];
        console.log("file name:" + file.name);

        var fileRead = new FileReader();
        fileRead.readAsText(file);
        fileRead.onloadend = function () {
            // entire xml file as string
            var xmlData = fileRead.result;

            // Player
            setPlayerDataString(
                getPlayerData(xmlData)
            );
            setProfessionsDataString(
                getDataString(xmlData, "<professions>", "</professions>")
            );
            setSkillExpDataString(
                getDataString(xmlData, "<experiencePoints>", "</experiencePoints>")
            );

            // Friendship
            setFriendshipDataString(
                getDataString(xmlData, "<friendshipData>", "</friendshipData>")
            );

            // Eradication Goals
            setMonsterDataString(
                getDataString(xmlData, "<specificMonstersKilled>", "</specificMonstersKilled>")
            );
        };
    };

    };
    return (
        <div>
            {/* File Upload Component */}
            <Card body className="contentCard fileDiv">
                <Row>
                    <Col>
                        <Button type="button" className="btn btn-info" onClick={getTheFile}>Upload save</Button>
                    </Col>
                    <Col>
                        <div id="fileUploadInfo">
                            This site tracks your progress and achievements for
                            Stardew Valley by reading your save file. The site
                            will be updated with your current progress whenever
                            you go to bed (ingame). Browsers do not allow
                            files to be automatically reuploaded from system
                            directories. The default Stardew Valley save directory
                            is in a system directory. To circumvent this,
                            follow the folllowing instructions to upload your save:
                            <ol>
                                <li>
                                    The default save folder is located at:
                                    %AppData%\StardewValley\Saves\
                                </li>
                                <li>
                                    Run the command mklink /j C:\StardewSaveLink
                                    %AppData%\StardewValley\Saves\
                                    using the program cmd,
                                    creating a folder linking your save folder to C:\StardewSaveLink
                                </li>
                                <li>
                                    Press the upload button and browse to
                                    C:\StardewSaveLink
                                </li>
                                <li>
                                    Enter the farmname_farmid directory and
                                    select the file named farmname_farmid.
                                </li>
                            </ol>
                            These steps are needed to enable auto file upload.
                            You can skip these steps and manually reupload your
                            save file.
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* other components */}
            <Farmer playerDataString={playerDataString} professionsDataString={professionsDataString} skillExpDataString={skillExpDataString} />
            <Friendship friendshipDataString={friendshipDataString} />
            <EradicationGoals  monsterDataString={monsterDataString} />
        </div>
    );
};

export default FileUpload;