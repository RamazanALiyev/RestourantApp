import React, { useEffect, useState } from "react";
import MyLoader from "../Skeleton/MyLoader";
import Detailtable from "../Detailtable/Detailtable";
import { useSelector, useDispatch } from "react-redux";
import { tableProducts } from "../../features/tableProduct";
import { BiReset } from "react-icons/bi";

function Table() {
  const products = useSelector((state) => state.tableProducts);
  const dispatch = useDispatch();
  console.log(products);
  useEffect(() => {
    dispatch(tableProducts());
  }, [dispatch]);
  console.log(products);
  const [showDetailTable, setShowDetailTable] = useState(false);
  const [eachOrder, setEachOrder] = useState([]);
  const handleClick = (order) => {
    setEachOrder(order);
  };
  useEffect(() => {}, []);
  return (
    <>
      {products.loading && (
        <div className="flex">
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
        </div>
      )}
      {!products.loading && products.error ? <div>Error</div> : null}
      <table className="w-full px-10">
        <thead className="border-b w-full">
          <tr className="w-full pb-2 flex justify-around">
            <th className="border-r border-l w-[14%]">Sıra Sayı</th>
            <th className="border-r w-[14%]">Masa</th>
            <th className="border-r w-[14%]">Xidmətçi</th>
            <th className="border-r w-[14%]">Status</th>
            <th className="border-r w-[14%]">Məbləğ</th>
            <th className="border-r w-[16%]">Sonlanma Tarixi</th>
            <th className="border-r w-[14%]">Ətraflı</th>
          </tr>
        </thead>
        {!products.loading && products.products.length ? (
          <tbody>
            {products.products.map((order, index) => (
              <tr
                key={index}
                className={
                  !order.status
                    ? "text-rose-500 w-full border-b py-3 flex justify-around"
                    : "text-emerald-900 w-full border-b py-3 flex justify-around"
                }
              >
                <td className="text-center border-r border-l w-[14%]">
                  {index + 1}
                </td>
                <td className="text-center border-r w-[14%]">{order.table}</td>
                <td className="text-center border-r w-[14%]">{order.waiter}</td>
                <td className="text-center border-r w-[14%]">
                  {!order.status ? "sonlanmayıb" : "sonlanıb"}
                </td>
                <td className="text-center border-r w-[14%]">{order.price}</td>
                <td className="text-center border-r w-[16%]">{order.date}</td>
                <td
                  className="text-center border-r w-[14%] cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={() => {
                    handleClick(order);
                    setShowDetailTable(true);
                  }}
                >
                  Bax
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div>
            <p className="border text-center my-10 py-3 bg-yellow-600 text-white flex justify-center items-center text-lg cursor-progress">
              <span className="mr-2">
                Zəhmət olmasa səfihəni yeniləyin və ya məhsul yoxdur
              </span>{" "}
              <BiReset />
            </p>
            <div className="fixed w-full flex justify-around my-2">
              <span class="flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-25"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <span class="flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-25"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <span class="flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-25"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <span class="flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-200 opacity-25"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
              <span class="flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </div>
          </div>
        )}
      </table>
      {showDetailTable ? (
        <Detailtable
          eachOrder={eachOrder}
          setShowDetailTable={setShowDetailTable}
        />
      ) : null}
    </>
  );
}

export default Table;
