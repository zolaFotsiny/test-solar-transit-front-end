import axios from 'axios';
// const BASE_URL = 'https://solar-transit-back-end.onrender.com';
const BASE_URL = 'http://192.168.88.195:8080';


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
        console.log(`Call_POST:${BASE_URL}/upload `);
        console.log(`file`, file);
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
        console.log(`HUHU_Call_GET:${BASE_URL}/employee`);
        response = await axiosInstance.get(`${BASE_URL}/employee`);
        return response;
    } catch (error)
    {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};
export const deleteEmployee = async (id) => {
    try
    {
        let response = '';
        // console.log(`HUHU_Call_GET:${BASE_URL}/employee`);
        response = await axiosInstance.delete(`${BASE_URL}/employee/${id}`);
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



