import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../util/Validation";
import {Auth} from "aws-amplify";

class ForgotPasswordSubmit extends Component {
  state = {
    verificationcode : "",
     email: "",
    password: "",
    confirmpassword : "",
    errors: {
      blankfield: false,
      cognito : null,
      matchedpassword : " "
    }
  };

  clearErrors = () => {
    this.setState({
      errors: {
        blankfield: false,
        cognito : null
      }
    });
  };

  handleSubmit = async event => {
    //Prevent page reload
    event.preventDefault();
    
    //Form validation
    this.clearErrors();
    const error = Validate(event, this.state);
    if (error) {
      this.setState({
        errors: { ...this.state.errors, ...error }
      });
    }else{
    //Integrate Cognito here on valid form submission
    try{
    //   await Auth.signIn(this.state.username, this.state.password)
    //   console.log(user);
    //   this.props.auth.authenticateUser(true);
    //   this.props.auth.setAuthUser(user);
    //   this.props.history.push("/");
    await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.verificationcode,
        this.state.password
    );
    this.props.history.push("/changepasswordconfirmation");
    
  }catch(error){
      let err = null;
      !error.message ? err = {"message" : error} : err=error ;
      this.setState({
        errors : {
          ...this.state.error,
          cognito : err
        }
      }) 
  }
}
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
          <FormErrors formerrors={this.state.errors} />

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="text"
                  id="verificationcode"
                  placeholder="Enter your code"
                  value={this.state.verificationcode}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="New Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgotpassword">Forgot password?</a>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Reset Password
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ForgotPasswordSubmit;