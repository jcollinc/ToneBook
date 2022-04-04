import React, { useState } from "react";
import { Switch, Route } from "react-router-dom"
import logo from '../logo.svg';
import '../styles/App.css';
import '../styles/NavBar.css';
import NavBar from "./NavBar"

function App() {
  return (
    <div className="app-container">
      <NavBar>

      </NavBar>
      <Switch>
        <Route exact path="/">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to ToneBook: Music Journal
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Enter
            </a>
          </header>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
