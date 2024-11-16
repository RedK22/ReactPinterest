import React from "react";
import Nav from "./Nav";
import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext";
import supabase from "../utils/supabase";

function Home() {
  const {user, loading} = useAuth();
  async function userLogout() {
    let {error} = await supabase.auth.signOut();
  }

  return (
    <div>
      <Nav />
      {user ? (
        <div>
          Welcome {user.email}
          <Link to={"/"}>
            <button onClick={userLogout}>Log Out</button>
          </Link>
        </div>
      ) : (
        <div>This is homepage!</div>
      )}

      <br />
      <Link to={"/signin"}>Sign In</Link>
      <br />
      <Link to={"/signup"}>Sign up</Link>
    </div>
  );
}

export default Home;
