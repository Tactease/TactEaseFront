import axios from 'axios';

const baseURL = 'http://localhost:3000';
const renderURL = 'https://tactease-sx73.onrender.com';


export const getRequestsOfSoldier = async (soldierId) => {
    return await axios.get(`${renderURL}/soldiers/${soldierId}/requests`);
}

export const getRequestById = async (soldierId, requestId) => {
    return await axios.get(`${renderURL}/soldiers/${soldierId}/requests/${requestId}`);
}

export const createRequest = async (soldierId,request) => {
    return await axios.post(`${renderURL}/soldiers/${soldierId}/requests`, request);
}

export const updateRequest = async (data) => {
    return await axios.put(`${renderURL}/soldiers/${data.soldierId}/requests/${data.reqId}`, data);
}

export const deleteRequest = async (soldierId, requestId) => {
    return await axios.delete(`${renderURL}/soldiers/${soldierId}/requests/${requestId}`);
}
