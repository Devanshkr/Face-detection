import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn){
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={() => onRouteChange('signOut')} className="f4 link dim black pa3 underline pointer">Sign Out</p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p onClick={() => onRouteChange('signIn')} className="f4 link dim black underline pa3 pointer">SignIn</p>
          <p onClick={() => onRouteChange('Register')} className="f4 link dim black underline pa3 pointer">Register</p>
        </nav>
      );
    }
    
}

export default Navigation;