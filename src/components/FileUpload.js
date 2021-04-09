import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

    const changeHandler = (e) => {
        console.log("file submitted");
        // get file
        var file = e.target.files[0];
        console.log(file.name);

        var fileRead = new FileReader();
        fileRead.readAsText(file);
        fileRead.onloadend = function () {
            // entire xml file as string
            var xmlData = fileRead.result;
            console.log("xmlData: ", xmlData);
            setFriendshipDataString(
                getDataString(xmlData, "<friendshipData>", "</friendshipData>")
            );
        };
    };

    return (
        <div>
            {/* File Upload Component */}
            <Card body className="contentCard fileDiv">
                <Row>
                    <Col>
                        <Form onChange={changeHandler}>
                            <Form.File
                                id="file-upload"
                                label="Choose a save file"
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
