import React, {Component} from 'react'
import * as RealEstateAPI from '../RealEstateAPI';
import '../styles/App.css'
import SearchPage from './SearchPage'
import Results from './Results'

class App extends Component {
  state = {
    inputAddress: '',
    results: {}
  }

  search = (input) => {
    this.setState({inputAddress: input})
    if(this.state.inputAddress !== ''){
      RealEstateAPI.getAll(this.state.inputAddress).then(data => {
        this.setState({results: data})
      })
    }
  }

  render() {
    return (
      <div className='App'>
        <main className='App-main'>
          <h1><span className='roof'>Roof</span>\Cal</h1>
          <SearchPage
            inputAddress = {this.state.inputAddress}
            search = {this.search}
          />
          <Results/>
        </main>
      </div>
    )
  }
}

export default App
