import React, { Component } from 'react'
import * as RealEstateAPI from '../RealEstateAPI';
import '../styles/App.css'
import SearchPage from './SearchPage'
import Results from './Results'
import { Transition, } from "react-spring/renderprops";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { teal, green } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: green
  }
})

class App extends Component {
  state = {
    inputAddress: '',
    results: {},
    showResults: true
  }

  switchScreens = () => {
    this.setState({showResults: this.state.showResults ? false : true})
  }

  updateAddress = (input) => {
    this.setState({inputAddress: input})
  }

  search = () => {
    if(this.state.inputAddress !== ''){
      RealEstateAPI.getAll(this.state.inputAddress).then(data => {
        this.setState({results: data})
        this.switchScreens()
        console.log(this.state.results)
      })
    }
  }

  render() {
    let transformFromDir = this.state.showResults ? 'translate3d(-100%,0,0)' : 'translate3d(100%,0,0)'
    let transformLeaveDir = this.state.showResults ? 'translate3d(100%,0,0)' : 'translate3d(-100%,0,0)'

    return (
      <div className='App-main'>
        <MuiThemeProvider theme={theme}>
          <Transition
            items={this.state.showResults}
            initial={false}
            from={{ position: 'absolute', opacity: 0, transform: transformFromDir, width: '80%'}}
            enter={{ opacity: 1, transform: 'translate3d(0%,0,0)', width: '80%'}}
            leave={{ opacity: 0, transform: transformLeaveDir, width: '80%' }}
            >
            {items =>
              items
                ? props => <div style={props}>
                  <SearchPage
                    updateAddress={this.updateAddress}
                    search={this.search}
                  />
                </div>
                : props => <div style={props}>
                  <Results
                    results={this.state.results}
                    switch={this.switchScreens}
                  />
                </div>
            }
          </Transition>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
