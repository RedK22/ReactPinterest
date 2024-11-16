import React from "react";

import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext";
import supabase from "../utils/supabase";
import {motion} from "framer-motion";

function Home() {
  const {user, loading} = useAuth();
  async function userLogout() {
    let {error} = await supabase.auth.signOut();
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.3,
      }}
    >
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
    </motion.div>
  );
}

export default Home;
