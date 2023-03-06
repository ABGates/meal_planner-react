import './App.css';
import {Routes , Route, BrowserRouter} from "react-router-dom";
import React from 'react';

import MealPlanner from './pages/MealPlanner';
import MealCollection from './pages/MealCollection';
import CreateMeal from './pages/CreateMeal'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<MealPlanner/>}/>
              <Route path='/meals' element={<MealCollection/>}/>
              <Route path='/create' element={<CreateMeal/>}/>
          </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;