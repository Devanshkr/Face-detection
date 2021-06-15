import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

const ParticleOps = {
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}

const initialStage = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialStage;
  }
  
  loadUser = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  
  calculateFace = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }
  }

  displayFace = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
        fetch('https://ancient-taiga-01841.herokuapp.com/imageUrl', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(resp => resp.json())
      .then(resp => {
        if(resp) {
          fetch('https://ancient-taiga-01841.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      this.displayFace(this.calculateFace(resp))
    })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signOut'){
      this.setState(initialStage);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }

    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <Particles params={ParticleOps} className='Particles' />
        <Navigation onRouteChange={this.onRouteChange}
                    isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home' ? 
        <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition 
            box={this.state.box} 
            imageUrl={this.state.imageUrl} 
          />
          </div> : this.state.route === 'signIn' ?
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }

}

export default App;
