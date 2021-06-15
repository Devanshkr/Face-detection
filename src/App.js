import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';  //done npm install react-particle-js
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
  route: 'signIn', //keeps track the route of the pages.
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

  //for new users
  loadUser = (data) =>{
    this.setState({user:{
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  //LINKING THE BACKEND
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // }

  //calculation part of where we have to draw box. getting coordinates.
  calculateFace = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(ClarifaiFace);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      //below are the corner points of border of box.
      //cal. starts from top 
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }
  }

  //box
  displayFace = (box) => {
    // console.log(box);
    this.setState({box: box});
  }

  //changing the value of input variable to the value of user has inputted.
  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({
      input: event.target.value
    });
  }

  // When submit button is clicked do the required job.
  onButtonSubmit = () => {
    // console.log('click');
    this.setState({imageUrl: this.state.input});
      // fetch('http://localhost:3000/imageUrl', {
        //doing below instead of above because we are deploying on heroku now.
        fetch('https://ancient-taiga-01841.herokuapp.com/imageUrl', {
        method: 'post',  //yaha se image api ko laare hai
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(resp => resp.json())
    // app.models.predict().then();  -> API CALL
    /*
      .predict(
        //"f76196b43bbd45c99b4f3cd8e8b40a8a", //this is the model id - related to the api of internet
        Clarifai.FACE_DETECT_MODEL,    //COLOR_MODEL,   //github se uthaya ye - clarifai github models
        this.state.input) //here comes the link which we will take from the user.
        //and can;t put imageUrl here, gives error.
      .then(
        function (response) {
          //the path of image coordinates.
          console.log(response);
        },
        function (err) {
          console.log('sed error');
        }
      );  */
      .then(resp => {
        if(resp) {
          fetch('https://ancient-taiga-01841.herokuapp.com/image', {
            method: 'put',
            //header accepts an object
            headers: { 'Content-type': 'application/json' },
            //over backend we gotta stringify 
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            //this was giving name undefined error because, it changes every variable.
            // this.setState({user: {
            //   entries: count
            // }})
            //do this instead of above
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
      this.displayFace(this.calculateFace(resp))
    })
      .catch(err => console.log(err));
  }

  //Go to another page 
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
        {/* USING TERNARY OPERATOR: WRAP IT IN {} BCZ IT'S JSX. */}
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
