import axios from 'axios';

let urlAPI = ''

if (window.location.hostname === "app.misterins.com.br") {
  urlAPI = 'https://api.misterins.com.br'
}else{
  urlAPI = 'http://localhost:8000'
}

const api = axios.create({
  baseURL:urlAPI,
})

export default api;