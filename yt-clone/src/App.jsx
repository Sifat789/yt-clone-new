import { useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import store from './Components/ReduxStore'
import { Provider } from 'react-redux'

function App() {



  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <Router>
          <Routes>
            <Route path='/' element={<Home />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App
