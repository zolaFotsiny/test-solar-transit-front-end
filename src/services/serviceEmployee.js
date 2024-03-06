import axios from 'axios';
const BASE_URL = 'https://solar-transit-back-end.onrender.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*', // Assurez-vous d'ajuster ceci en fonction de vos besoins
    // },
});

export const sendFile = async (file) => {
    try
    {
        let response = '';
        response = await axiosInstance.post(`${BASE_URL}/upload`, file);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};

export const saveEmployee = async (data) => {
    try
    {
        let response = '';
        response = await axiosInstance.post(`${BASE_URL}/employee`, data);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};

export const getEmployee = async () => {
    try
    {
        let response = '';
        response = await axiosInstance.get(`${BASE_URL}/employee`);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};


export const updateEmployee = async (id, data) => {
    try
    {
        let response = '';
        // console.log(`HUHU_Call_patch:${BASE_URL}/employee`);
        response = await axiosInstance.put(`${BASE_URL}/employee/${id}`, data);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};



