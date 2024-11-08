import { useEffect, useState } from "react";
import { jokiApi } from "../../helpers/axios";

export default function Myorder() {
  const [dataInvoice, setInvoice] = useState([]);

  useEffect(() => {
    fetchInvoice();
  }, []);

  const fetchInvoice = async () => {
    try {
      let response = await jokiApi({
        method: "GET",
        url: "/invoice",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: {},
      });
      // console.log(response);
      setInvoice(response.data);
    } catch (error) {
      console.log(error, "<<<< error HomePage");
    }
  };
    const handleDelete = async (id) => {
      try {
        await jokiApi.delete(`/invoice/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        await fetchInvoice();
      } catch (error) {
        console.log(error, "<<< erorr handleDelete");
        
      }
    };
    const handlePayment = async () => {
      try {
        const {data} = await jokiApi.post(`/generate-midtrans-token`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        console.log(data);
        window.snap.pay(data.token, {
          onSuccess: function(result){
            /* You may add your own implementation here */
             console.log("Success Boss !!!");
          },
        })
      } catch (error) {
        console.log(error, "<<< erorr handlePayment");
        
      }
    };


  
  return (
    <div className="container overflow-x-auto py-20">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 rounded-s-lg">
          Product name
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3 rounded-e-lg">
          Price
        </th>
        <th scope="col" className="px-6 py-3 rounded-e-lg">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {dataInvoice.map((d) => (
      <tr className="bg-white dark:bg-gray-800"
      key={d.id}
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {d.name}
        </th>
        <td className="px-6 py-4">1</td>
        <td className="px-6 py-4">{d.price}</td>
        <td className="px-6 py-4 col-2">
        <button
          onClick={() => handleDelete(d.id)}
          className="flex-wrap items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Delete
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
           
          </svg>
        </button>
        <button
          onClick={handlePayment}
          className="flex-wrap items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          CheckOut
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
           
          </svg>
        </button>
          </td>
      </tr>
      ))}
    </tbody>
  </table>
</div>

      
    
  );
}
