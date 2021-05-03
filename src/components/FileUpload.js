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
        var lastModified = 0;
        // Get file location
        [fileHandle] = await window.showOpenFilePicker();
        while (true) {
            // Get file contents
            const fileData = await fileHandle.getFile();
            if(lastModified != fileData.lastModified) {
                lastModified = fileData.lastModified;
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
            }
            else {
                console.log('No change');
            }
            // sleep
            await new Promise(r => setTimeout(r, 20000));
        }

    };

    const changeHandler = (e) => {
        // get file
        var file = e.target.files[0];
        console.log("file name:" + file.name);

        var fileRead = new FileReader();
        fileRead.readAsText(file);
        fileRead.onloadend = function () {
            // entire xml file as string
            var xmlData = fileRead.result;

            // Friendship
            setFriendshipDataString(
                getDataString(xmlData, "<friendshipData>", "</friendshipData>")
            );
        };
    };
    return (
        <div>
            {/* File Upload Component */}
            <Card body className="contentCard fileDiv">
                <Row >
                    <Col xl="3" className="col-12 m-3">
                        <Button type="button" className="btn btn-info" onClick={getTheFile}>Automatic reupload</Button>
                        <Row className="pl-3"><h5>OR</h5></Row>
                        <Form onChange={changeHandler}>
                            <Form.File
                                id="file-upload"
                                label="Manual upload"
                                custom
                            />
                        </Form>
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
