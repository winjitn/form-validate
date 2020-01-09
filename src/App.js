import React from "react";

import "./App.css";

class App extends React.Component {
  state = { user: false, email: false, password: false, con: false };
  user = React.createRef();
  email = React.createRef();
  password = React.createRef();
  con = React.createRef();
  btn = React.createRef();

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  async validate(e) {
    e.preventDefault();
    const user = this.user.current;
    const password = this.password.current;
    const con = this.con.current;
    const email = this.email.current;
    const emailvalid = this.validateEmail(email.value);

    const update = {};
    if (user.value === "" && !user.parentElement.classList.contains("error")) {
      user.parentElement.classList.toggle("error");
      update.user = true;
    } else {
      if (user.value !== "" && user.parentElement.classList.contains("error")) {
        user.parentElement.classList.toggle("error");
        update.user = false;
      }
    }

    if (!emailvalid && !email.parentElement.classList.contains("error")) {
      email.parentElement.classList.toggle("error");
      update.email = true;
    } else {
      if (emailvalid && email.parentElement.classList.contains("error")) {
        email.parentElement.classList.toggle("error");
        update.email = false;
      }
    }

    if (
      password.value === "" &&
      !password.parentElement.classList.contains("error")
    ) {
      password.parentElement.classList.toggle("error");
      update.password = true;
    } else {
      if (
        password.value !== "" &&
        password.parentElement.classList.contains("error")
      ) {
        password.parentElement.classList.toggle("error");
        update.password = false;
      }
    }

    if (
      con.checked === false &&
      !con.parentElement.classList.contains("error")
    ) {
      con.parentElement.classList.toggle("error");
      update.con = true;
    } else {
      if (
        con.checked === true &&
        con.parentElement.classList.contains("error")
      ) {
        con.parentElement.classList.toggle("error");
        update.con = false;
      }
    }

    await this.setState(update);

    for (var x in this.state) {
      if (this.state[x] === true) return;
    }

    const obj = this;

    this.btn.current.classList.add("loading");
    setTimeout(() => {
      obj.btn.current.classList.replace("loading", "positive");
      obj.btn.current.innerHTML = "Success!";
    }, 2e3);
  }

  render() {
    return (
      <div className="ui container">
        <div className="form-ctn">
          <div className="title">Create Account</div>
          <form className="ui form" onSubmit={e => this.validate(e)}>
            <div className="field">
              <label>Username</label>
              <input type="text" placeholder="Username" ref={this.user} />
              {this.state.user === true ? (
                <div className="e">You cannot leave username blank</div>
              ) : null}
            </div>
            <div className="field">
              <label>Email</label>
              <input type="text" placeholder="Email" ref={this.email} />
              {this.state.email === true ? (
                <div className="e">Please make sure email is valid</div>
              ) : null}
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                ref={this.password}
              />
              {this.state.password === true ? (
                <div className="e">You cannot leave password blank</div>
              ) : null}
            </div>
            <div className="field">
              <div className="ui checkbox">
                <input type="checkbox" ref={this.con} />
                <label>I agree to the Terms and Conditions</label>
                {this.state.con === true ? (
                  <div className="e">
                    You must agree to terms and conditions
                  </div>
                ) : null}
              </div>
            </div>
            <button
              className="ui fluid primary button"
              type="submit"
              ref={this.btn}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
