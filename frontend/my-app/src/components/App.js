import React, {Component} from 'react'
import * as RealEstateAPI from '../RealEstateAPI';
import '../styles/App.css'
import SearchPage from './SearchPage'
import Results from './Results'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

class App extends Component {
  state = {
    inputAddress: '',
    results: {},
    showResults: false
  }

  switchScreens = () => {
    this.setState({showResults: this.state.showResults ? false : true})
  }

  search = (input) => {
    this.setState({inputAddress: input})
    if(this.state.inputAddress !== ''){
      RealEstateAPI.getAll(this.state.inputAddress).then(data => {
        this.setState({results: data})
      })

    }
    this.switchScreens()
  }

  render() {
    return (
      <div className='App'>
        <TransitionGroup className='App-main'>
          <h1><span className='roof'>Roof</span>\Cal</h1>
          { this.state.showResults ?
            <CSSTransition
              in={true}
              appear={false}
              key={1}
              timeout={900}
              classNames={'slide'}>
                <Results
                  results= {this.state.results}
                  switch = {this.switchScreens}
                />
              </CSSTransition>
            :
            <CSSTransition
              in={true}
              appear={false}
              key={2}
              timeout={900}
              classNames={'slide'}>
              <SearchPage
                inputAddress = {this.state.inputAddress}
                search = {this.search}
              />
            </CSSTransition>
          }
        </TransitionGroup>
      </div>
    )
  }
}

export default App
