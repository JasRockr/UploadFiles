import React from 'react';
import './App.css';
import FileUploader from './Components/FileUploader';
import NavBar from './Components/NavBar';
import Home from './Views/Home';
import Page from './Views/Page';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex flex-col">
      {/* <FileUploader /> */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page" element={<Page />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
