import axios from "axios";
import React, { useEffect, useState } from "react";
import MyLoader from "../Skeleton/MyLoader";

function Table() {
  const [getData, setGetData] = useState([]);
  const [skeleton, setSkeleton] = useState(true);
  useEffect(() => {
    axios.get("http://localhost:8000/rostAbout").then((res) => {
      setGetData(res.data);
      setSkeleton(false);
    });
  }, []);
  // console.log(getData)
  return (
    <>
      {skeleton ? (
        <div className="flex">
          <MyLoader />
          <MyLoader />
          <MyLoader />
          <MyLoader />
        </div>
      ) : (
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
          <tbody>
            {getData.map((data, index) => (
              <tr
                key={index}
                className={
                  !data.status
                    ? "text-rose-500 w-full border-b py-3 flex justify-around"
                    : "text-emerald-900 w-full border-b py-3 flex justify-around"
                }
              >
                <td className="text-center border-r border-l w-[14%]">
                  {index + 1}
                </td>
                <td className="text-center border-r w-[14%]">{data.table}</td>
                <td className="text-center border-r w-[14%]">{data.waiter}</td>
                <td className="text-center border-r w-[14%]">
                  {!data.status ? "sonlanmayıb" : "sonlanıb"}
                </td>
                <td className="text-center border-r w-[14%]">{data.price}</td>
                <td className="text-center border-r w-[16%]">{data.date}</td>
                <td className="text-center border-r w-[14%] cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700">
                  Bax
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Table;
