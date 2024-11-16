import {useAuth} from "../AuthContext";
import supabase from "../utils/supabase";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {FaCircleArrowUp} from "react-icons/fa6";
import {motion} from "framer-motion";

function CreatePin() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading....</div>;
  }

  return (
    <>
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
        className="px-4 "
      >
        <h1 className="text-2xl py-4 font-semibold border-b-[1px]">
          Create Pin
        </h1>
        <form>
          <div className="w-full min-h-96 flex gap-4 mt-10">
            {/* Pin Image */}
            <div className="w-1/3">
              <label className="flex h-full cursor-pointer justify-center items-center rounded-md border-2 hover:border-black transition-all">
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  className="bg-red-500 hidden w-full h-full rounded-md"
                />
                <div className="flex items-center justify-center flex-col ">
                  <FaCircleArrowUp size={50} />
                  <p className="mt-2">Upload images from device</p>
                </div>
              </label>
            </div>
            {/* Pin Details */}
            <div className="w-2/3">
              <div className="flex flex-col w-3/5">
                <label className="font-semibold text-sm mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Add a title"
                  className="border-[1px] rounded-lg px-4 py-2 text-sm border-gray-600 outline-none"
                />
              </div>
              {/*  */}
              <div className="flex flex-col w-3/5 mt-5">
                <label className="font-semibold text-sm mb-1">
                  Description
                </label>
                <textarea
                  type="text"
                  placeholder="Add a detailed description"
                  className="border-[1px] rounded-lg px-4 pt-2 pb-24 resize-none text-sm border-gray-600 outline-none"
                />
              </div>
              {/*  */}
              <div className="flex flex-col w-3/5 mt-5">
                <label className="font-semibold text-sm mb-1">Link</label>
                <input
                  type="text"
                  placeholder="Add a link"
                  className="border-[1px] rounded-lg px-4 py-2 text-sm border-gray-600 outline-none"
                />
              </div>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default CreatePin;
