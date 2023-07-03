import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import store from './Components/ReduxStore'
import { Provider, useSelector } from 'react-redux'
import Player from './Components/Player'

function App() {

  const playerid = useSelector(state => state.playerId)

  return (
    <div>
      <Provider store={store}>
        
        <Router>
        <Navbar />
          <Routes>
            <Route path='/' element={ <Home /> }></Route>
            <Route path='/player/:id' element={ <Player/> } ></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
