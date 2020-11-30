import { Component } from "react";
import { Mutation } from "react-apollo";

import { AUTH_TOKEN } from "../constants";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../query/Query";
import { History } from "../interfaces/Interfaces";

class Login extends Component<History> {
  state = {
    login: true, // switch between Login and SignUp
    email: "",
    password: "",
    name: "",
  };

  render() {
    const { login, email, password, name } = this.state;
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={(e) => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation<any>
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={(data) => this._confirm(data)}
          >
            {(mutation: any) => (
              <div className="pointer mr2 button" onClick={mutation}>
                {login ? "login" : "create account"}
              </div>
            )}
          </Mutation>
          <div
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async (data: any) => {
    const { token } = this.state.login ? data.login : data.signup;

    this._saveUserData(token);
    this.props.history.push("/");
  };

  _saveUserData = (token: any) => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

export default Login;
