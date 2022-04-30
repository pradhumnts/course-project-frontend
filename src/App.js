import React from 'react';
import './App.css';
import PersistentDrawerLeft from './components/Qbank'
import { Link } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <PersistentDrawerLeft />
    </React.Fragment>
  );
}

export default App;
