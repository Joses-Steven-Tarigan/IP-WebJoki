import { createSlice } from "@reduxjs/toolkit"
import { jokiApi } from "../../helpers/axios"
import Swal from "sweetalert2"

export const serviceSlice = createSlice({
    name: "service",
    initialState: {
        value: [],
        errors: null,
        laoding: false
    },
    reducers:{
        fetchSuccess: (state, action) => {
            const service = action.payload
            state.value= [...service]
        },
    }
})


export const {fetchSuccess} = serviceSlice.actions
export const fetchService = () => async (dispatch) => {
    try {
        let { data } = await jokiApi({
          method: "GET",
          url: "/service/list",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
          data: {},
        });
      
        dispatch(fetchSuccess(data));
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

export default serviceSlice.reducer