import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

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
      <div>Welcome to Profile Page {user.email}</div>
    </>
  );
}

export default ProfilePage;
