import axios from 'axios';

let urlAPI = ''

if (window.location.hostname === "app.misterins.com.br") {
  urlAPI = 'https://api.misterins.com.br/api/v1/'
}else{
  urlAPI = 'http://localhost:8000/api/v1/'
}

const api = axios.create({
  baseURL:urlAPI,
})

export default api;