import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Document } from "./pages/Document";

function App() {
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/doc/:docId" element={<Document />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
