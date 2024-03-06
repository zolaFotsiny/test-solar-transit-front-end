import axios from 'axios';


const BASE_URL = "https://solar-transit-back-end.onrender.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*', // Assurez-vous d'ajuster ceci en fonction de vos besoins
    // },
});


export const getDept = async () => {
    try
    {

        let response = '';
        response = await axiosInstance.get(`${BASE_URL}/department`);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};

export const saveDept = async (data) => {
    try
    {
        let response = '';
        response = await axiosInstance.post(`${BASE_URL}/department`, data);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};

export const updateDept = async (id, data) => {
    try
    {
        let response = '';
        response = await axiosInstance.patch(`${BASE_URL}/department/${id}`, data);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};



