import { React, useEffect, useState } from "react";
import ServicesCard from "../components/ServiceCard";
import Swal from "sweetalert2";
import { jokiApi } from "../../helpers/axios";
import { useSelector, useDispatch } from 'react-redux'
import { fetchService, fetchSuccess } from "../stores/serviceSlice";

const Services = () => {

  const serv = useSelector((state) => state.service.value)
  const dispatch = useDispatch()
  // const [data, setData] = useState([])

  useEffect(() => {
    dispatch(fetchService())
  }, []);

 

  return (
    <div className="flex flex-wrap justify-center space-x-4 space-y-16 p-6">
      {serv.map((e) => (
        <ServicesCard key={e.id} data={e} />
      ))}
    </div>
  );
};

export default Services;
