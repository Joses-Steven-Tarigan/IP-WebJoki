import { useEffect, useState } from "react";
import CardMyClub from "../components/CardMyOrder";
import { jokiApi } from "../../helpers/axios";

export default function Myorder() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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
      setData(response.data);
    } catch (error) {
      console.log(error, "<<<< error HomePage");
    }


  };
  return (
    <div className="container-fluid p-12 py-20 flex gap-8 justify-evenly flex-wrap w-full">
      {data.map((d) => (
        <CardMyClub key={d.id} data={d} onDelete={fetchData}/>
      ))}
    </div>
  );
}
