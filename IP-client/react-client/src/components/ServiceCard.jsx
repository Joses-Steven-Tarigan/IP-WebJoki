import React from 'react';
import { jokiApi } from '../../helpers/axios';

const ServicesCard = ({ data }) => {

  const handleOrder = async () => {
    try {
      const response = await jokiApi({
        method: "POST",
        url: `/invoice/${data.id}`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
    //   navigate("/my-clubs")
    } catch (error) {
      console.log(error, "<<<<< error di cardHomepage join");
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 mt-16">
      <div className="relative group">
        <div className="aspect-w-1 aspect-h-1 w-full max-w-xs overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 transition-opacity duration-300">
          <img
            src={data.imageUrl}
            alt={`Image of ${data.name}`}
            className="h-48 w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-150">
          <a href="#">
            {data.name}
          </a>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{data.region}</p>
        <p className="mt-2 text-lg font-bold text-gray-900">Rp.{data.price}</p>
        <button onClick={handleOrder} className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150">
          Order
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path d="M1 5h12M7 1l6 4-6 4" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ServicesCard;
