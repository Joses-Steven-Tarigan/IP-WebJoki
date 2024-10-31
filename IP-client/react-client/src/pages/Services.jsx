
import {React, useEffect, useState} from 'react'
import ServicesCard from '../components/ServiceCard'
import Swal from 'sweetalert2'
import { jokiApi } from '../../helpers/axios'



const Services = () => {

  // const [search, setSearch] = useState([])

  // const [sort, setSort] = useState("asc")


  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
   

    try {
      let response = await jokiApi({
        method: "GET",
        url: "/service/list",
        headers: {Authorization: "Bearer " + localStorage.getItem("access_token")},
        data: {}
      })
      // response.data.data.query.forEach(el => {
      //   el.createdAt = el.createdAt.split("T")[0];
      //   el.updatedAt = el.updatedAt.split("T")[0];
      //   return el
      // });

      console.log(response.data);
      setData(response.data)
    } catch (error) {
      console.log(error, "ini error service");
      Swal.fire({
        title: `Error ${error.response.status}!`,
        text: error.response.data.message,
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  }

 

  // const handleSearch = (e) => {
  //   setSearch(e.target.value)
  // }

  // const handleSort = (e) => {
  //   setSort(e.target.value)
  //   console.log(e.target.value);
  // }

  return (
    <div>
      {data.map((e) => (
            <ServicesCard
              key={e.id}
              id={e.id}
              name={e.name}
              region={e.region}
              imageUrl={e.imageUrl}
              price={e.price}
              description={e.description}
              

            />
          ))}
      
    </div>

  )
}

export default Services