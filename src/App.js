import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewPeople from './pages/people/people';
import EditPerson from './pages/people/editPerson';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ViewPeople />} />
        <Route path="/person/:id" element={<EditPerson />} />
      </Routes>
    </Router>
  );
}

export default App;
