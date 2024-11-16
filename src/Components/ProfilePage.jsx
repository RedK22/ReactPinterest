import Nav from "./Nav";
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
    return (
      <div>
        <Nav />
        Loading....
      </div>
    );
  }

  if (!user) {
    // This ensures we are not rendering the Profile Page if no user is available
    return (
      <div>
        <Nav />
        You need to sign in to access your profile.
      </div>
    );
  }

  return (
    <>
      <Nav />

      <div>Welcome to Profile Page {user.email}</div>
    </>
  );
}

export default ProfilePage;
