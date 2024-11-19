import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {MdOutlineModeEditOutline} from "react-icons/md";

function ProfilePage() {
  const navigate = useNavigate();
  const {user, loading} = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!user) {
    return <div>You need to sign in to access your profile.</div>;
  }

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="border-b-2 w-full flex items-center justify-center pt-10 pb-4 flex-col">
          <div className="w-24 h-24 bg-red-500 rounded-full relative">
            <div className="bg-white rounded-full flex items-center justify-center h-8 w-8 border-2 absolute top-1 -right-2 ">
              <MdOutlineModeEditOutline size={20} />
            </div>
            <img src="" alt="." />
          </div>
          <p className="mt-2 font-semibold">{user.email}</p>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ProfilePage;
