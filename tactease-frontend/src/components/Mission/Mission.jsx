import React, { useState, useEffect } from 'react';
export const convertToISO = (dateStr) => {
    const [date, time] = dateStr.split(' ');
    const [day, month, year] = date.split('/');
    let [hours, minutes] = time.split(':');
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

export const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Pad the hours and minutes with leading zeros, if necessary
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + ':' + minutes;
}

export const getMissionColor = (missionType) => {
    switch (missionType) {
        case 'MISSION':
            return '#58B7D4';
        case 'PATROL_BY_CAR':
            return '#B2A6FF';
        case 'WATCH':
            return '#7761F9';
        case 'GUARD':
            return '#87D1A0';
        default:
            return '#C000D0';
    }
};

export const formatMissionType = (missionType) => {
    switch (missionType) {
        case 'MISSION':
            return 'Mission';
        case 'PATROL_BY_CAR':
            return 'Patrol by car';
        case 'WATCH':
            return 'Watch';
        case 'GUARD':
            return 'Guard';
        default:
            return missionType;
    }
};

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    let day = date.getDate();
    let month = date.getMonth() + 1; // Months are zero based
    const year = date.getFullYear();

    // Pad the day and month with leading zeros, if necessary
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return day + '/' + month + '/' + year;
};

const Mission = (props) => {
    const { mission } = props;
return (
        <div>
            <div>{formatMissionType(mission.missionType)}</div>
            <div>{mission.startDate} - {mission.endDate}</div>
        </div>
    );

}