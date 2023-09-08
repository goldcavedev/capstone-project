import "./App.css"
import "./style/gamepage.css"
import React from "react";
import Home from "./pages/welcome";
import RegisterForm from "./forms/register";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import GamesPage from "./pages/gamepage";
import Login from "./forms/login";
import GameForm from "./forms/gameform";
import GameDetails from "./pages/gamedetail";
import UserPage from "./pages/userpage";
import SearchPage from "./pages/searchpage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<RegisterForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/games" exact element={<GamesPage />} />
          <Route path="/profile" exact element={<UserPage />} />
          <Route path="/game-details/:_id" exact element={<GameDetails />} />
          <Route path="/add-game" exact element={<GameForm />} />
          <Route path="/search" exact element={<SearchPage />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;