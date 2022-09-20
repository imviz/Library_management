import axios from 'axios'


// for api calling we use axios
const  instance=axios.create({
    baseURL:'http://127.0.0.1:8000/',
})



export default instance