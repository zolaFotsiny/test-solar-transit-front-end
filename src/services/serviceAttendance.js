import axios from 'axios';
const BASE_URL = "https://solar-transit-back-end.onrender.com";

const axiosInstance = axios.create({
    baseURL: BASE_URL
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*', // Assurez-vous d'ajuster ceci en fonction de vos besoins
    // },
});


export const getAttendance = async () => {
    try {
        let response = '';
        console.log(`HUHU_Call_GET:${BASE_URL}/attendance`);
        response = await axiosInstance.get(`${BASE_URL}/attendance`);
        return response;
    } catch (error) {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};


export const getAttendanceStat = async () => {
    try {
        let response = '';
        console.log(`HUHU_Call_GET:${BASE_URL}/attendance/stat`);
        response = await axiosInstance.get(`${BASE_URL}/attendance/stat`);
        return response;
    } catch (error) {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};

export const deleteAttendance = async (id) => {
    try {
        let response = '';
        // console.log(`HUHU_Call_GET:${BASE_URL}/employee`);
        response = await axiosInstance.delete(`${BASE_URL}/attendance/${id}`);
        return response;
    } catch (error) {
        console.error('HUHU_ERROR lors de l\'envoi des données à l\'API :', error);
        throw error;
    }
};




