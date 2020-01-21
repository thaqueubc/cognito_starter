import React, { Component } from 'react';
import FormErrors from "../FormErrors";
import Validate from "../util/Validation";
import {Auth} from "aws-amplify";

class ChangePassword extends Component {
  state = {
        oldpassword : "",
       // email: "",
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
    await Auth.changePassword(
        this.props.auth.user,
        this.state.oldpassword,
        this.state.password
    );
    this.props.history.push("/ConfirmPassword");
    
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
                  type="password"
                  id="oldpassword"
                  placeholder="Old Password"
                  value={this.state.oldpassword}
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
                <button className="button is-success">
                  Confirm Password
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default ChangePassword;