import './App.css';
import {Router} from '@reach/router'
import Search from './components/Search'
import DisplayItem from './components/DisplayItem'
import {useState} from 'react'
function App() {


  return (
    <div className="App">
        <Search/>
        <Router>
          <DisplayItem path="/:term/:id"/>
        </Router>
    </div>
  );
}

export default App;
