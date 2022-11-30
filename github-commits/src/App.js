import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Commits from './components/commits';

function App() {

  // const [token, setToken] = useState(null)

  // const getToken = (token) => {
  //   setToken(to)
  // }

  return (
      <Router>
    <div className="App">
      <header className="App-header">
     <Routes>
          <Route path="/commits" element={<Commits />} />
          <Route path="/" element={<Form />} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
