import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormCreateEdit from "../components/FormCreateEdit";
import { jokiApi } from "../../helpers/axios";


export default function CreateService() {
  const [service, setService] = useState({
    name: "",
    region: "",
    price: 0,
    description: "",
    imageUrl: "",
    type: ""
  });

  const nav = useNavigate();

  const handleChangeInput = (event) => {
    setService((prevService) => ({
      ...prevService,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await jokiApi({
        method: "POST",
        url: "/service/add",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        data: {
          name: service.name,
          region: service.region,
          price: Number(service.price),
          description: service.description,
          imageUrl: service.imageUrl,
          type: service.type,
        },
      });

      nav("/services");
      // console.log(title, categoryId, content, imgUrl);
    } catch (error) {
      console.log(error.response, ">>> error createService");
      Swal.fire({
        title: `Error ${error.response.data.statusCode}!`,
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };
  console.log(service, ">>> ini service");
  return (
    <>
    <FormCreateEdit service={service} handleChangeInput={handleChangeInput} handleSubmit={handleSubmit} />
    </>
  );
}
