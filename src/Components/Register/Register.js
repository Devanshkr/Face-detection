import React from 'react';
import 'tachyons';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Password: '',
      name: ''
    }
  }

  onNameChange = (event) => { this.setState({ name: event.target.value }); }
  onEmailChange = (event) => { this.setState({ Email: event.target.value }); }
  onPasswordChange = (event) => { this.setState({ Password: event.target.value }); }

  onSubmitSignIn = () => {
    fetch('https://ancient-taiga-01841.herokuapp.com/register', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email: this.state.Email,
        password: this.state.Password,
        name: this.state.name
      })
    })
      .then(resp => resp.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render(){
    return (
    <article className="br3 ba dark-gray b--black-20 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="fw6 lh-copy f6" htmlFor="name" />Name
            <input 
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
            type="text" 
            name="name" 
            id="name"
            onChange={this.onNameChange} 
            />
            </div>
            <div className="mt3">
              <label className="fw6 lh-copy f6" htmlFor="email-address" />Email
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="email" 
              name="email-address" 
              id="email-address" 
              onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="fw6 lh-copy f6" htmlFor="password" />Password
              <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password" 
              id="password" 
              onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={this.onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib"
              type="submit"
              value="Register" />
          </div>
        </div>
      </main>
    </article>
    );
  }
  
}

export default Register;
