import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
function Formproduct() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  let day = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let nowDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  const [curPrice, setCurPrice] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [getFormData, setGetFormData] = useState({
    productName: "",
    number: "1",
    price: 0,
    table: "",
    waiter: "",
    status: false,
    date: nowDate,
  });

  const postMethod = async () => {
    await fetch("http://localhost:8000/rostAbout", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(getFormData),
    })
      .then((res) => res)
      .catch((e) => e.message);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postMethod();
  };
  const handleSelectName = (e) => {
    const dataPrice = products.products.filter(
      (datPrice) => datPrice.productName === e.target.value
    );
    dataPrice.forEach((priceNow) => setCurPrice(priceNow.productPrice));
    console.log(getFormData);
    setGetFormData((getFormData) => ({
      ...getFormData,
      productName: e.target.value,
    }));
    setNewPrice(curPrice * getFormData.number);
  };
  const handleChooseNumber = (e) => {
    setGetFormData((getFormData) => ({
      ...getFormData,
      number: e.target.value,
    }));
    setNewPrice(curPrice * getFormData.number);
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
              onChange={handleSelectName}
              id="productName"
              className="w-full rounded-xl h-12 text-center ceholder:text-center border border-indigo-500 focus:outline-none focus:ring focus:border-blue-500"
            >
              <option selected disabled hidden>
                Secin
              </option>
              {products.products.map((product, index) => (
                <option key={index}>{product.productName}</option>
              ))}
            </select>
          </label>
          <div className="flex mt-4 w-4/5">
            <label className="w-4/5 mt-3 mr-3" htmlFor="productNum">
              <h3 className="text-center mb-1">Məhsulun Sayı</h3>
              <input
                onChange={handleChooseNumber}
                required
                value={getFormData.number}
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
                value={`${newPrice} AZN`}
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
