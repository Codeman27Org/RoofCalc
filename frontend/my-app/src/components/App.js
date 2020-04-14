import React from 'react'
//import logo from './logo.svg'
import '../styles/App.css'
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact'
import SearchPage from './SearchPage'

function App() {
  return (
    <div className='App'>
      <main className='App-main'>
        <h1><span className='roof'>Roof</span>\Cal</h1>
        <SearchPage/>
      </main>
    </div>
  )
}

export default App
