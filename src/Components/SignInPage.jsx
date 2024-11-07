import React, {useState} from "react";
import Nav from "./Nav";
import SignInImage from "/SignIn.jpg";
import PinLogo from "/pin-logo.png";
import {CiWarning} from "react-icons/ci";

export default function SignInPage({supabase}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function SignInUser() {
    const {user, error: signinError} = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signinError) {
      console.error("Sign In error:", signinError.message);
      setError(signinError.message);
    } else {
      console.log("User signed in!");
      setEmail("");
      setPassword("");
      setError("");
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 relative">
          <img
            src={SignInImage}
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
            {/* Sign In Form */}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                SignInUser();
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
                    Sign In
                  </button>
                  <p className="text-sm tracking-tight font-medium mt-2 flex justify-end">
                    Don&apos;t have an account? &nbsp;
                    <span className="font-semibold"> Sign up</span>
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