import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import supabase from "../utils/supabase";
import {useAuth} from "../AuthContext";

function PostPage() {
  const {id} = useParams();

  const {loading} = useAuth();
  const [pins, setPins] = useState([]);
  const [userDets, setUserDets] = useState([]);

  const pinData = pins[0];
  // console.log(pinData);

  useEffect(() => {
    const fetchPin = async () => {
      const {data, error} = await supabase
        .from("pins")
        .select(`*`)
        .eq("id", id);
      if (error) {
        console.error("Error fetching pins:", error);
        return;
      }
      // console.log(data);
      setPins(data);
    };

    fetchPin();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="px-4 py-2 w-full">
      {!loading && pins.length < 0 ? (
        <div>Pin does not exist.</div>
      ) : (
        // If Pin Exists, we show it here.
        <div className="flex items-center justify-center py-4">
          <div className=" min-h-96 w-3/4 flex bg-gray-100 shadow-md rounded-md">
            <div className="w-2/3 px-4 py-2 flex justify-center items-center">
              <img
                src={pinData?.imageUrl}
                alt="Pin Image"
                className="w-[65%] rounded-md"
              />
            </div>
            <div className="w-2/3 py-12">
              <h1 className="font-semibold text-3xl">{pinData?.title}</h1>
              <p className="mt-2">{pinData?.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
