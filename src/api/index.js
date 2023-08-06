import axios from "axios";

const headers = {
    Accept : 'application/json',
    'Content-type' : "application/json"
}

const api = axios.create({
    baseURL : `${process.env.NEXT_PUBLIC_BACKEND_URL}api`, // http://localhost:1337/api
    headers,
})

export default api