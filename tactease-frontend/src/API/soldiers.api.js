import axios from 'axios';

const baseURL = 'http://localhost:3000';
const renderURL = 'https://tactease-sx73.onrender.com';


export const getSoldiers = async () => {
    return await axios.get(`${renderURL}/soldiers`);
}

export const getSoldierById = async (soldierId) => {
    return await axios.get(`${renderURL}/soldiers/${soldierId}`);
}

export const createSoldier = async (soldier) => {
    return await axios.post(`${renderURL}/soldiers`, soldier);
}

export const updateSoldier = async (soldierId, soldier) => {
    return await axios.put(`${renderURL}/soldiers/${soldierId}`, soldier);
}

export const deleteSoldier = async (soldierId) => {
    return await axios.delete(`${renderURL}/soldiers/${soldierId}`);
}
