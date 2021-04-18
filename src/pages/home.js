import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Users } from "../components/Users";
import { DisplayBoard } from "../components/DisplayBoard";
import CreateUser from "../components/CreateUser";

const Home = (props) => {
  console.log(props);
  return (
    <div className="page page2">
      <div className="App">
        <Header></Header>
        <div className="flagTop" />
        <div className="flagCenter">
          <h1 className="country">HOME</h1>
          <div className="otherLinks">
            <Link to="/page1">Argentina</Link>
            <Link to="/page2">Nigeria</Link>
          </div>
        </div>
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
              <CreateUser
                user={props.state.user}
                onChangeForm={props.changeForm}
                createUser={props.createUser}
              ></CreateUser>
            </div>
            <div className="col-md-4">
              <DisplayBoard
                numberOfUsers={props.state.numberOfUsers}
                getAllUsers={props.getUsers}
              ></DisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <Users users={props.state.users}></Users>
        </div>
      </div>
      <div className="flagBottom" />
    </div>
  );
};

export default Home;
