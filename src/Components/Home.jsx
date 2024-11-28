import React, {useState, useEffect} from "react";

import {Link} from "react-router-dom";
import {useAuth} from "../AuthContext";
import supabase from "../utils/supabase";
import {motion} from "framer-motion";

import t1 from "../assets/t1.jpg";
import t2 from "../assets/t4.jpg";

function Home() {
  const {user, loading} = useAuth();
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      const {data, error} = await supabase.from("pins").select("*");
      if (error) {
        console.error("Error fetching pins:", error);
        return;
      }
      // console.log(data);
      setPins(data);
    };

    fetchPins();
  }, []);

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
      {/* Images showing here */}
      <div className="columns-5 gap-4 px-4 py-2">
        {/* Sample Pin */}
        {/* <div className="w-full mb-2 break-inside-avoid">
          <img src={t1} alt="an image" className="h-full rounded-lg " />
          <p className="text-sm font-semibold">
            This is the title of the image
          </p>
          <p className="text-sm font">Author</p>
        </div> */}

        {/* Pins from DB */}
        {pins.map((pin) => (
          <div key={pin.id} className="w-full mb-2 break-inside-avoid">
            <Link to={`/post/${pin.id}`} className="hover:cursor-pointer">
              <img
                src={pin.imageUrl} // Use imageUrl from the pin
                alt="Pin Image"
                className="h-full rounded-lg"
              />
            </Link>
            <p className="text-sm font-semibold">{pin.title}</p>
            <p className="text-sm font">{pin.user_id}</p>
            {/* <p className="text-sm">{pin.description}</p> */}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Home;
