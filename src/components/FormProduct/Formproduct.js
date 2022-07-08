import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import axios from "axios";
function Formproduct() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [getFormData, setGetFormData] = useState({
    table: "",
    waiter: "",
    status: false,
    price: "",
    number: "",
    date: "",
  });
  let calculatePrice = getFormData.number * getFormData.price;
  console.log(getFormData);
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let nowDate = `${day < 10 ? `0${day}` : day}-${
    month < 10 ? `0${month}` : month
  }-${year} ${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setGetFormData((getFormData) => ({
      ...getFormData,
      date: nowDate,
    }));
     axios
      .post("http://localhost:8000/rostAbout", { getFormData })
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  };
  const chooseProductName = (e) => {
    const datar = products.products.filter(
      (eachProduct) => eachProduct.productName === e.target.value
    );
    datar.forEach((element) => {
      setGetFormData((getFormData) => ({
        ...getFormData,
        proName: e.target.value,
        price: element.productPrice,
      }));
    });
  };
  return (
    <>
      {products.loading && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-xl w-4/5 h-[70%] bg-indigo-300"
        >
          Loading...
        </form>
      )}
      {!products.loading && products.error ? <div>Error</div> : null}
      {!products.loading && products.products.length ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-xl w-4/5 h-[70%] bg-indigo-300"
        >
          <p className="text-3xl text-white mb-5">Məhsul seçimi edin!</p>
          <label className="w-4/5 mt-3" htmlFor="productName">
            <h3 className="mb-1 ml-12">Məhsulun adı</h3>
            <select
              onChange={chooseProductName}
              id="productName"
              className="w-full rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
            >
              {products.products.map((product, index) => (
                <option key={index}>{product.productName}</option>
              ))}
            </select>
          </label>
          <div className="flex mt-4 w-4/5">
            <label className="w-4/5 mt-3 mr-3" htmlFor="productNum">
              <h3 className="text-center mb-1">Məhsulun Sayı</h3>
              <input
                onChange={(e) => {
                  setGetFormData((getFormData) => ({
                    ...getFormData,
                    number: e.target.value,
                  }));
                }}
                required
                value={getFormData.proNumber}
                className="rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
                id="productNum"
                min={1}
                type="number"
              />
            </label>
            <label className="w-4/5 mt-3 ml-3" htmlFor="productPrice">
              <h3 className="text-center mb-1">Məhsulun Qiyməti</h3>
              <input
                required
                value={`${calculatePrice} AZN`}
                className="rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
                id="productPrice"
                readOnly
                type="text"
              />
            </label>
            <label className="w-4/5 mt-3 ml-3" htmlFor="table">
              <h3 className="text-center mb-1">Masa</h3>
              <select
                onChange={(e) =>
                  setGetFormData((getFormData) => ({
                    ...getFormData,
                    table: e.target.value,
                  }))
                }
                id="table"
                className="w-full rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>M1</option>
                <option>M2</option>
                <option>K1</option>
                <option>K2</option>
                <option>T1</option>
                <option>T2</option>
              </select>
            </label>
            <label className="w-4/5 mt-3 ml-3" htmlFor="waiter">
              <h3 className="text-center mb-1">Xidmətçi</h3>
              <select
                onChange={(e) =>
                  setGetFormData((getFormData) => ({
                    ...getFormData,
                    waiter: e.target.value,
                  }))
                }
                id="table"
                className="w-full rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option>Malik</option>
                <option>Kamil</option>
                <option>Teymur</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="fixed right-0 bottom-5 w-32 h-8 rounded px-4 mr-10 text-sm text-white bg-lime-800 hover:bg-lime-600 flex justify-center items-center cursor-pointer transition duration-150 ease-out hover:ease-in"
          >
            Əlavə et
          </button>
        </form>
      ) : null}
    </>
  );
}
export default Formproduct;
