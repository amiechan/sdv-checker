import { Col, Row } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <Row>
            <Col className="sidebar col-xl-2 col-12">
                <Sidebar />
            </Col>
            <Col className="mainContent ml-1">
                <FileUpload />
            </Col>
        </Row>
    );
};

export default App;
