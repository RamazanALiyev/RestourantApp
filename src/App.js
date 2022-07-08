import { Toaster } from "react-hot-toast";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "./firebase";
import { logout as logoutHandle } from "./features/auth";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import Formproduct from "./components/FormProduct/Formproduct";
import Table from "./components/Table/Table";
function App() {
  const [isShow, setIsShow] = useState(false);
  const [bookProduct, setBookProduct] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
    });
  };
  if (user) {
    return (
      <div className="h-screen">
        <button
          onClick={() => setBookProduct(!bookProduct)}
          className="fixed right-0 bottom-5 w-1/5 h-8 rounded px-4 mr-10 text-sm text-white bg-rose-500 hover:bg-rose-600 flex justify-center items-center cursor-pointer transition duration-150 ease-out hover:ease-in"
        >
          {bookProduct
            ? "Sifariş pəncərəsini bağlayın"
            : "Sifariş pəncərəsini açın"}
        </button>
        {bookProduct ? <Formproduct /> : null}
        <div className="border h-[10%] max-screen mx-auto flex justify-between items-center">
          <h1 className="w-1/5 ml-10 h-8 rounded px-4 mr-10 text-sm text-white bg-indigo-500 hover:bg-indigo-700 flex justify-center items-center cursor-pointer transition duration-150 ease-out hover:ease-in">
            Admin Panelə Xoş Gəlmisiniz
          </h1>
          <p className="w-3/5 h-8 rounded px-4 mr-10 text-sm text-white bg-green-500 hover:bg-green-600 flex justify-center items-center cursor-pointer transition duration-150 ease-out hover:ease-in">
            {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="w-1/5 h-8 rounded px-4 mr-10 text-sm text-white bg-rose-500 hover:bg-rose-600 flex justify-center items-center cursor-pointer transition duration-150 ease-out hover:ease-in"
          >
            Logout
          </button>
        </div>
        <div className="h-1/5 border-b flex items-center">
          <div className="px-10 mx-auto text-justify">
            <span
              className="text-indigo-700 underline cursor-pointer"
              onClick={() => setIsShow(true)}
            >
              Şirkət Haqqında:
            </span>{" "}
            {isShow
              ? `Lorem ipsum dolor sit, amet
                 consectetur adipisicing elit. Perspiciatis error esse provident
                 recusandae, nostrum sit. Vero explicabo sequi nam dolor odit qui
                 corporis eaque atque quibusdam ipsam, quis exercitationem ut. Lorem
                 ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis
                 error esse provident recusandae, nostrum sit. Vero explicabo sequi
                 nam dolor odit qui corporis eaque atque quibusdam ipsam, quis
                 exercitationem ut.`
              : null}
          </div>
        </div>
        <div className="h-2/4 border-b px-10 py-5">
          <Table />
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
