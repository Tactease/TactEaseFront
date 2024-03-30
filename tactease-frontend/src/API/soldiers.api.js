import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getSoldiers = async () => {
    return await axios.get(`${baseURL}/soldiers`);
}

export const getSoldierById = async (soldierId) => {
    return await axios.get(`${baseURL}/soldiers/${soldierId}`);
}

export const createSoldier = async (soldier) => {
    return await axios.post(`${baseURL}/soldiers`, soldier);
}

export const updateSoldier = async (soldierId, soldier) => {
    return await axios.put(`${baseURL}/soldiers/${soldierId}`, soldier);
}

export const deleteSoldier = async (soldierId) => {
    return await axios.delete(`${baseURL}/soldiers/${soldierId}`);
}
