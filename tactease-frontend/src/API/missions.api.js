import axios from 'axios';

const baseURL = 'http://localhost:3000';
const renderURL = 'https://tactease-sx73.onrender.com';

export const getMissions = async () => {
    return await axios.get(`${renderURL}/missions`);
}

export const getClassMissions = async (classId) => {
    return await axios.get(`${renderURL}/missions/list/${classId}`);
}

export const getMissionById = async (missionId) => {
    return await axios.get(`${renderURL}/missions/${missionId}`);
}

export const createMission = async (mission) => {
    return await axios.post(`${renderURL}/missions`, mission);
}

export const updateMission = async (missionId, mission) => {
    return await axios.put(`${renderURL}/missions/${missionId}`, mission);
}

export const deleteMission = async (missionId) => {
    return await axios.delete(`${renderURL}/missions/${missionId}`);
}
