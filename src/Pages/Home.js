import React from "react";
import { Link } from "react-router-dom";
import restourant from "../assets/restorant.svg";

function Home() {
  return (
    <div className="border w-screen h-screen flex justify-center items-center">
      <div className="border-r bg-amber-700 h-full w-2/5 flex justify-center ">
        <img className="w-4/5" src={restourant} alt="pic" />
      </div>
      <div className="p-4 w-3/5 h-full bg-lime-600 flex justify-center items-center">
        <Link
          className="mr-6 p-2 w-48 h-10 text-white text-center text-sm border-b rounded-2xl hover:rounded-2xl hover:border-none hover:text-white hover:bg-rose-700 transition duration-150 ease-out hover:ease-in"
          to="/register"
        >
          Qeydiyyatdan keçin
        </Link>
        <Link
          className="ml-6 p-2 w-48 h-10 bg-rose-700 border-b border-transparent text-white text-center text-sm border-b rounded-2xl hover:border-b hover:border-white hover:bg-transparent hover:text-white transition duration-150 ease-out hover:ease-in"
          to="/login"
        >
          Daxil ol
        </Link>
      </div>
    </div>
  );
}

export default Home;
