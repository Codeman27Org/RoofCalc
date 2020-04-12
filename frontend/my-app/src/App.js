import React from 'react'
import logo from './logo.svg'
import './App.css'
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact'
import SearchPage from './SearchPage'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <SearchPage/>
      </header>
    </div>
  )
}

export default App
