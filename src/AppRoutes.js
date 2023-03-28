import React, { useState, useContext } from "react";

// Router
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

// pages
import Home from "./pages/home/home";

function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}
                />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
