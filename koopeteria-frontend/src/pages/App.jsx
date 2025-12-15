// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../components/homepage'; // Import your Homepage
import ErrorPage from '../components/errorpage'; // Import your ErrorPage

function App() {
  return (

    <Router basename="/kopeetearia-react/">
      <Routes>
        {/* Define a route for the homepage */}
        <Route path="/" element={<Homepage />} />
        {/* Add more routes as needed */}\
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
