import axios from "axios"

const URL = "https://6305428adde73c0f84446998.mockapi.io/all_notes"

const API = axios.create({
  baseURL: URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const notes = {
  getData: () => API.get(`/notes`),
  
  getDataById: (id:string | undefined) => API.get(`/notes/${id}`),
  deleteDataById: (id:string | undefined ) => API.delete(`/notes/${id}`),
  
  saveDataById: (id:string, data:{
    id?: string,
    title?: string,
    content?: string
  }) => API.put(`/notes/${id}`, data),

  saveNewData: ({ title, content }:{
    title: string,
    content: string
  })=> API.post(`/notes`, {
    title, content
  })
};

export default API;