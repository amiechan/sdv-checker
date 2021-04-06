import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="mainContent">
                <FileUpload />
            </div>
        </>
    );
};

export default App;
