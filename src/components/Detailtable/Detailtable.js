import React, { useEffect } from "react";
import { MdOutlineClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  updatePost,
  tableProducts,
} from "../../features/tableProduct";

function Detailtable({ setShowDetailTable, eachOrder }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(tableProducts);
  }, [dispatch]);
  return (
    <div className="w-[95%] px-10 flex flex-col justify-center items-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border rounded-xl w-4/5 h-[40%] bg-indigo-300">
      <MdOutlineClear
        onClick={() => setShowDetailTable(false)}
        className="cursor-pointer fixed top-10 right-12 text-3xl text-white"
      />
      <table className="w-full">
        <thead className="border-b w-full">
          <tr className="text-slate-700 w-full pb-2 flex justify-around">
            <th className="border-r border-l w-[16%]">Sıra Sayı</th>
            <th className="border-r w-[20%]">Məhsul Adı</th>
            <th className="border-r w-[16%]">Miqdar</th>
            <th className="border-r w-[16%]">Məbləğ</th>
            <th className="border-r w-[16%]">Status</th>
            <th className="border-r w-[16%]">Geri</th>
          </tr>
        </thead>
        <tbody className="border-b w-full">
          <tr className="w-full py-2 my-2 flex justify-around items-center">
            <td className="text-center border-r border-l w-[16%]">{1}</td>
            <td className="text-center border-r w-[20%]">
              {eachOrder.productName}
            </td>
            <td className="text-center border-r w-[16%]">{eachOrder.number}</td>
            <td className="text-center border-r w-[16%]">{eachOrder.price}</td>
            <td
              onClick={() => {
                dispatch(updatePost(eachOrder.id));
                setShowDetailTable(false);
                window.reload();
              }}
              className="cursor-pointer text-center border-r w-[16%] bg-yellow-600 hover:bg-yellow-700 py-2 text-white"
            >
              {eachOrder.status ? "Sonlanıb" : "Sonlandır"}
            </td>
            <td
              onClick={() => {
                dispatch(deleteProduct(eachOrder.id));
                setShowDetailTable(false);
                window.reload();
              }}
              className="text-center border-r w-[16%] cursor-pointer bg-rose-500 py-2 text-white hover:bg-rose-600"
            >
              Ləgv et
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Detailtable;
