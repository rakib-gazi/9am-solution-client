import axios from 'axios';
const axiosPublic = axios.create({
    baseURL: 'https://mern-server-nu.vercel.app/',
    withCredentials: true,
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;