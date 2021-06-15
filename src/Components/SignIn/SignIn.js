import React from 'react';

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    // console.log(this.state);
    fetch('https://ancient-taiga-01841.herokuapp.com/signin', {
      method: 'post',
      //header accepts an object
      headers: {'Content-type': 'application/json'},
      //over backend we gotta stringify 
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      //yaani ab jab sahi credentials daalenge tabhi login ho payga.
      .then(resp => resp.json())
      .then(user => {
        //main point for that.
        // if (data === 'success') {
        //   this.props.onRouteChange('home');
        // }
        //check if user has an id, then only load them
        if (user.id) {
          this.props.loadUser(user)
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const {onRouteChange} = this.props;
    return (
    <article className="br3 ba dark-gray b--black-20 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                // onClick={onRouteChange('home')}
                onClick={this.onSubmitSignIn}  //parameterised fn.
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('Register')} className="f5 link dim black db pointer">Register</p>
            </div>
        </div>
      </main>
    </article>
    );
  }
}

export default SignIn;