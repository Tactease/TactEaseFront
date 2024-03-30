import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getRequestsOfSoldier = async (soldierId) => {
    return await axios.get(`${baseURL}/soldiers/${soldierId}/requests`);
}

export const getRequestById = async (soldierId, requestId) => {
    return await axios.get(`${baseURL}/soldiers/${soldierId}/requests/${requestId}`);
}

export const createRequest = async (soldierId,request) => {
    return await axios.post(`${baseURL}/soldiers/${soldierId}/requests`, request);
}

export const updateSoldier = async (soldierId,requestId,request) => {
    return await axios.put(`${baseURL}/soldiers/${soldierId}/requests/${requestId}`, request);
}

export const deleteSoldier = async (soldierId, requestId) => {
    return await axios.delete(`${baseURL}/soldiers/${soldierId}/requests/${requestId}`);
}
