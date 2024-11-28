import {useState, useEffect} from "react";
import SignUpImage from "/SignUp.jpg";
import PinLogo from "/pin-logo.png";
import {CiWarning} from "react-icons/ci";

import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../AuthContext";

import supabase from "../utils/supabase";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {user} = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  //! Sign Up User
  async function SignUpUser() {
    const {user, error: signupError} = await supabase.auth.signUp({
      email,
      password,
    });
    if (signupError) {
      console.error("Sign up error:", signupError);
      setError(signupError.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      <div className="flex flex-1 overflow-hidden">
        {/* Image */}
        <div className="w-1/3 relative">
          <img
            src={SignUpImage}
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full flex flex-col justify-center items-center p-8">
          <div className="h-full w-1/2 py-10 border-2 shadow-lg bg-white rounded-2xl">
            <div className="flex justify-center items-center mb-5">
              <img src={PinLogo} className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-10">
              Welcome to Pinterest!
            </h2>
            {/* Sign Up Form */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                SignUpUser();
              }}
            >
              <div className="flex flex-col gap-8 justify-center items-center">
                <div className="w-full flex flex-col gap-2 justify-center px-4">
                  <label
                    className=" text-sm font-medium leading-none"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="border-[1px] rounded-lg px-4 py-2 border-gray-600 outline-none"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex flex-col gap-2 justify-center px-4">
                  <label
                    className=" text-sm font-medium leading-none"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="border-[1px] rounded-lg px-4 py-2 border-gray-600 outline-none"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full px-4">
                  <button
                    type="submit"
                    className="border-[1px] bg-gray-800 text-white w-full rounded-lg px-4 py-2 border-gray-600 outline-none font-semibold tracking-tight hover:bg-gray-900 transition-all "
                  >
                    Sign Up
                  </button>
                  <p className="text-sm tracking-tight font-medium mt-2 flex justify-end">
                    Already have an account? &nbsp;
                    <Link to={"/signin"} className="font-semibold">
                      {" "}
                      Sign in
                    </Link>
                  </p>
                  {error ? (
                    <p className="bg-red-200 flex justify-center items-center rounded-md py-1 mt-2 text-red-500 text-medium gap-2 font-semibold">
                      <CiWarning size={25} /> {error}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
