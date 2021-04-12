import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Friendship from "./Friendship";

function getDataString(data, startTag, endTag) {
    var start = data.indexOf(startTag);
    var end = data.indexOf(endTag);
    var dataString = data.substring(start, end + endTag.length);
    return dataString;
};

const FileUpload = () => {
    const [friendshipDataString, setFriendshipDataString] = useState("");

    async function getTheFile() {
        let fileHandle;
        // Get file location
        [fileHandle] = await window.showOpenFilePicker();
        while (true) {
            // Get file contents
            const fileData = await fileHandle.getFile();
            console.log("file submitted");

            var fileRead = new FileReader();
            fileRead.readAsText(fileData);
            fileRead.onloadend = function () {
                // entire xml file as string
                var xmlData = fileRead.result;
                console.log("xmlData: ", xmlData);
                setFriendshipDataString(
                    getDataString(xmlData, "<friendshipData>", "</friendshipData>")
                );
            };
            // sleep
            await new Promise(r => setTimeout(r, 20000));
        }

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
                            you go to bed (ingame). To upload your save:
                            <ol>
                                <li>
                                    Find your save file, which is located at:
                                    %AppData%\StardewValley\Saves\
                                </li>
                                <li>
                                    Run the command mklink /j C:\StardewSaveLink
                                    %AppData%\StardewValley\Saves\
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
            <Friendship data={friendshipDataString} />

        </div>
    );
};

export default FileUpload;
