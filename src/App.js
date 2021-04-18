import React, { Component } from "react";
import { getAllUsers, createUser } from "./services/UserService";
import "./App.css";
import Home from "./pages/home";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  state = {
    user: {},
    users: [],
    numberOfUsers: 0,
  };

  createUser = (e) => {
    console.log(this.state.user);
    createUser(this.state.user).then((response) => {
      console.log(response);
      this.setState({ numberOfUsers: this.state.numberOfUsers + 1 });
    });
  };

  getAllUsers = () => {
    getAllUsers().then((users) => {
      console.log(users);
      this.setState({ users: users, numberOfUsers: users.length });
    });
  };

  onChangeForm = (e) => {
    let user = this.state.user;
    if (e.target.name === "firstname") {
      user.firstName = e.target.value;
    } else if (e.target.name === "lastname") {
      user.lastName = e.target.value;
    } else if (e.target.name === "email") {
      user.email = e.target.value;
    }
    this.setState({ user });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home
              state={this.state}
              changeForm={() => this.onChangeForm()}
              getUsers={() => this.getAllUsers()}
              createUser={() => this.createUser()}
            />
          </Route>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/page2">
            <Page2 />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
