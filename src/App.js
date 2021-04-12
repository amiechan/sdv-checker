import { Container, Col, Row } from "react-bootstrap";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <Row>
            <div className="sidebar col-xl-2 col-12 p-0" >
                <Sidebar />
            </div>
            <Col className="mainContent ml-1">
                <FileUpload />
            </Col>
        </Row>
    );
};

export default App;
