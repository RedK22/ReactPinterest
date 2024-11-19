import {useAuth} from "../AuthContext";
import supabase from "../utils/supabase";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FaCircleArrowUp} from "react-icons/fa6";
import {motion} from "framer-motion";

function CreatePin() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview URL
    };
    reader.readAsDataURL(file);
  };

  // Create the pin entry
  async function handleCreate(e) {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image for the pin");
      return;
    }

    // Upload the pin image here
    const fileExt = imageFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const {data, error} = await supabase.storage
      .from("images")
      .upload(fileName, imageFile);

    if (error) {
      console.error("Error uploading image:", error);
      return; // Return early in case of an error
    }

    const imgData = await supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    if (!imgData || !imgData.data.publicUrl) {
      console.error("Failed to get image URL.");
      return;
    }

    const newPin = {
      title,
      description,
      link,
      imageUrl: imgData.data.publicUrl,
      user_id: user.id,
    };

    const {data: pinData, error: pinError} = await supabase
      .from("pins")
      .insert([newPin])
      .select();

    if (pinError) {
      console.error("Error inserting pin:", pinError);
      return;
    }

    navigate("/");
  }

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
              {/* Display the file input if no image is selected, else show the image preview */}
              {!imagePreview ? (
                <label className="flex h-full cursor-pointer justify-center items-center rounded-md border-2 hover:border-black transition-all">
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    className="bg-red-500 hidden w-full h-full rounded-md"
                    onChange={handleImageUpload}
                  />
                  <div className="flex items-center justify-center flex-col ">
                    <FaCircleArrowUp size={50} />
                    <p className="mt-2">Upload images from device</p>
                  </div>
                </label>
              ) : (
                <div className="flex justify-center items-center w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="object-cover w-[75%] h-full rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Pin Details */}
            <div className="w-2/3">
              <div className="flex flex-col w-3/5">
                <label className="font-semibold text-sm mb-1">Title</label>
                <input
                  type="text"
                  required
                  onChange={(e) => setTitle(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a detailed description"
                  className="border-[1px] rounded-lg px-4 pt-2 pb-24 resize-none text-sm border-gray-600 outline-none"
                />
              </div>
              {/*  */}
              <div className="flex flex-col w-3/5 mt-5">
                <label className="font-semibold text-sm mb-1">Link</label>
                <input
                  type="text"
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="Add a link"
                  className="border-[1px] rounded-lg px-4 py-2 text-sm border-gray-600 outline-none"
                />
              </div>
              <button
                onClick={handleCreate}
                className="mt-5 px-4 py-2 text-md font-semibold bg-red-600 hover:bg-red-700 transition-all text-white rounded-md"
              >
                Add Pin
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </>
  );
}

export default CreatePin;
