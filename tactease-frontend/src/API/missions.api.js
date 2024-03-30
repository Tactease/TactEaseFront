import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getMissions = async () => {
    return await axios.get(`${baseURL}/missions`);
}

export const getMissionById = async (missionId) => {
    return await axios.get(`${baseURL}/missions/${missionId}`);
}

export const createMission = async (mission) => {
    return await axios.post(`${baseURL}/missions`, mission);
}

export const updateMission = async (missionId, mission) => {
    return await axios.put(`${baseURL}/missions/${missionId}`, mission);
}

export const deleteMission = async (missionId) => {
    return await axios.delete(`${baseURL}/missions/${missionId}`);
}
