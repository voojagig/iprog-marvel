import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Register.css";
import Navbar from '../Navbar/Navbar';
import { Auth } from "aws-amplify";


{ /*https://serverless-stack.com/chapters/add-the-session-to-the-state.html*/}
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      type: '/register'

    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0 && (this.state.password === this.state.confirmPassword);

  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

handleSubmit = async event => {
  event.preventDefault();

  
}

  render() {
    return (
      <div className="Register">
       <Navbar location = {this.state.type}/>

        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"/>
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"/>
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit">

            Register
          </Button>
        </form>
      </div>
    );
  }
}
export default Register;
