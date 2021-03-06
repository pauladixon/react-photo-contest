import React, { Component } from 'react';
import './SignupForm.css';
import { Link } from 'react-router-dom';
import userService from '../../utils/userService';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/');
      })
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="SignupForm">
        <form onSubmit={this.handleSubmit} >
          <div>
            <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
          </div>
          <div>
            <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
          </div>
          <div>
            <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
          </div>
          <div>
            <input type="password" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
          </div>
          <div>
            <button disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
            <Link to='/'>Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
};

export default SignupForm;
