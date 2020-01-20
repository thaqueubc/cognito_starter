import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import LogIn from './components/auth/LogIn';

class App extends Component {
  state = {
    isAuth : false,
    user : null
  }

  authenticateUser = authenticated => {
    this.setState({isAuth : authenticated});
  }

  setAuthUser = user => {
    this.setState({ user : user });
  }
  render() {
    const authProps = {
      isAuth : this.state.isAuth,
      user :  this.state.user,
      authenticateUser : this.authenticateUser,
      setAuthUser : this.setAuthUser
    }

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar auth = {authProps} />
            <Switch>
              <Route exact path="/" render = {(props) => <Home  {...props}  auth = {authProps}/>}   />
              <Route exact path="/register" render = {(props) => <Register  {...props}  auth = {authProps}/>} />
              <Route exact path="/welcome" render = {(props) => <Welcome  {...props}  auth = {authProps}/>} />
              <Route exact path="/login" render = {(props) => <LogIn  {...props}  auth = {authProps}/>}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
