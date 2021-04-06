import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const FileUpload = () => {
    return (
        <Card body className="contentCard fileDiv">
            <Row>
                <Col>
                    <Form>
                        <Form.File
                            id="file-upload"
                            label="User save file input"
                            custom
                        />
                    </Form>
                </Col>
                <Col>
                    <span id="fileUploadInfo">
                        This site tracks your progress and achievements for
                        Stardew Valley by reading your save file. The site will
                        be updated with your current progress whenever you go to
                        bed (ingame). To upload your save (not enabled for this
                        prototype. Click on the browse button to view a sample
                        save): 1. Find your save file, which is located at:
                        %AppData%\StardewValley\Saves\ 2. Run the command mklink
                        /j C:\StardewSaveLink %AppData%\StardewValley\Saves\ 3.
                        Press the upload button and browse to C:\StardewSaveLink
                        4. Enter the farmname_farmid directory and select the
                        file named farmname_farmid These steps are needed to
                        enable auto file upload. You can skip these steps are
                        manually reupload your save file.
                    </span>
                </Col>
            </Row>
        </Card>
    );
};

export default FileUpload;
