import React, { useState } from "react";
import { register } from "../firebase";
import { useNavigate } from "react-router-dom";
import registerPic from "../assets/register.svg";
import { Link } from "react-router-dom";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await register(email, password);
    console.log(user);
    if (user) {
      navigate("/login", {
        replace: true,
      });
    }
  };
  return (
    <div className="border w-screen h-screen flex justify-center items-center">
      <div className="border-r bg-amber-700 h-full w-2/5 flex justify-center ">
        <img className="w-4/5" src={registerPic} alt="pic" />
      </div>
      <form className="w-2/5 mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>
        <p className="text-center text-2xl text-white rounded-xl tracking-widest mb-3 bg-amber-500 py-3 cursor-pointer">
          Qeydiyyat
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            E-Posta
          </label>
          <div className="mt-1">
            <input
              type="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indogo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Şifrəniz
          </label>
          <div className="mt-1">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indogo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            className="w-4/12 disabled:opacity-20 inline-flex cursor-pointer items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!email || !password}
            type="submit"
          >
            Qeydiyyatdan keç
          </button>
          <Link
            to="/login"
            className="w-4/12 disabled:opacity-20 inline-flex cursor-pointer items-center px-4 py-2 ml-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Daxil ol
          </Link>
          <Link
            to="/"
            className="w-4/12 disabled:opacity-20 inline-flex cursor-pointer items-center ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {"< < <"}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
