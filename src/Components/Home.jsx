import React from "react";
import Nav from "./Nav";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div>
      <Nav />
      This is home page wooo!
      <br />
      <Link to={"/signin"}>Sign In</Link>
      <br />
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );
}

export default Home;
