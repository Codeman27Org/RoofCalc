import React, {Component} from 'react'
import * as RealEstateAPI from '../RealEstateAPI';
import '../styles/App.css'
import SearchPage from './SearchPage'
import Results from './Results'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

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
      <MDBContainer className='App-main'>
        <MDBRow>
        <MDBCol md='6'>
          <TransitionGroup >
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
        </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
}

export default App
