import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Confirm from "./pages/Confirmation";
import RegistrationConfirmed from "./pages/Confirmed";
import Login from "./pages/Login";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Signup />} />
                    <Route path="/confirmation" element={<Confirm />} />
                    <Route path="/confirmed" element={<RegistrationConfirmed />} />
                    <Route path="/login" element={<Login />} />

                </Route>
            </Routes>
        </Router>
    )
}

export default App;