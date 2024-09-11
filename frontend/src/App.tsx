import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Signup />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App;