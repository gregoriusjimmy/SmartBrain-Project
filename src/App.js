import React, { Component } from 'react'
import './App.css'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
const app = new Clarifai.App({
  apiKey: '8f715aaa8dec48bea9a2cb69e1a8b5e9'
})

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    app.models
      .predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
      .then(
        function(response) {
          // do something with response
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          )
        },
        function(err) {
          // there was an error
        }
      )
  }
  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />

        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default App
