import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login as loginHandle } from "../features/auth";
import { login } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginPic from "../assets/login.svg";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (user) {
      dispatch(loginHandle(user));
      navigate("/", {
        replace: true,
      });
    }
  };
  return (
    <div className="border w-screen h-screen flex justify-center items-center">
      <div className="border-r bg-amber-700 h-full w-2/5 flex justify-center ">
        <img className="w-3/6" src={loginPic} alt="pic" />
      </div>
      <form className="w-2/5 mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>
        <p className="text-center text-2xl text-white rounded-xl tracking-widest mb-3 bg-amber-500 py-3 cursor-pointer">Giriş</p>
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
            Parola
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
            Daxil ol
          </button>
          <Link
            to="/register"
            className="w-4/12 disabled:opacity-20 inline-flex cursor-pointer items-center ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Qeydiyyatdan keç
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
export default Login;
