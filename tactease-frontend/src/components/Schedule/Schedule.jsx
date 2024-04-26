import React, { useState, useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./schedule.style.css"
import { convertToISO, formatTime, getMissionColor, formatMissionType, formatDate, formatMissionDate } from '../Mission/Mission.jsx';
import { getMissions, createMission, deleteMission, updateMission } from '../../API/missions.api.js';
import { getSoldiers, getSoldierById } from "../../API/soldiers.api.js";
import {TableContainer, TableHeader, TableRow, TableCell, TableHead, TableBody, MissionInfo, MissionInfoContainer} from './Schedule.style.js';


const Calendar = () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const calendarRef = useRef()
    const soldiersDataRef = useRef([]);
    const isLoadingRef = useRef(true);

    useEffect(() => {
        getSoldiers().then((data) => {
            soldiersDataRef.current = data.data;
            isLoadingRef.current = false;
        });
    }, []);

    const reviewEvent = async (e) => {
        let loadingInfo = '<p>Loading soldiers data...</p>';
        let missionInfo = (
            <>
                <MissionInfoContainer>
                <h1>{formatMissionType(e.data.missionType)}</h1>
                <MissionInfo>Date: {formatDate(e.data.start.toString())}</MissionInfo>
                <MissionInfo>Hours: {formatTime(e.data.start.toString())} - {formatTime(e.data.end.toString())}</MissionInfo>
                <MissionInfo>Participants:</MissionInfo>
                </MissionInfoContainer>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Personal Number</TableHeader>
                            <TableHeader>Pakal</TableHeader>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {e.data.soldiersOnMission.map((personalNumber) => {
                            const soldiersOnMission = soldiersDataRef.current.filter(soldier => soldier.personalNumber.toString() === personalNumber.toString());
                            return soldiersOnMission.map((soldier) => (
                                <TableRow key={soldier._id}>
                                    <TableCell>{soldier.fullName}</TableCell>
                                    <TableCell>{soldier.personalNumber}</TableCell>
                                    <TableCell>{soldier.pakal}</TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </TableContainer>
            </>
        );
        let missionInfoString = ReactDOMServer.renderToString(missionInfo);
        if(isLoadingRef.current) {
            DayPilot.Modal.alert(loadingInfo);
        }
        else{
            DayPilot.Modal.alert(missionInfoString);
        }
    };

    const editEvent = async (e) => {
        const dp = calendarRef.current.control;
        const form = [{
            name:"Mission Type",
            id:"missionType",
            type: "select",
            options: [
                {id: "MISSION", name: "Mission" },
                {id: "PATROL_BY_CAR" , name: "Patrol by car"},
                {id: "WATCH" , name: "Watch"},
                {id: "GUARD" , name: "Guard"}
            ],
            value: e.data.missionType // Set the current value
        },
            {
                name:"Soldier Count",
                id:"soldierCount",
                type: "number",
                value: e.data.soldierCount // Set the current value
            }];
        const modal = await DayPilot.Modal.form(form, e.data);
        if (!modal.result) { return; }
        const updateInfo = {
            missionType: modal.result.missionType,
            soldierCount: modal.result.soldierCount
        };
        console.log("update mission", e.data.id);
        updateMission(e.data.id.toString(), updateInfo).then((res => {
            console.log("mission updated", res);
        }));
            e.data.soldierCount = modal.result.soldierCount,
            e.data.missionType = modal.result.missionType,
            e.data.text = `${formatMissionType(modal.result.missionType)}\n${formatTime(e.data.start.toString())} - ${formatTime(e.data.end.toString())}`,
            e.data.backColor = getMissionColor(modal.result.missionType),
            dp.events.update(e);

    };

    const [calendarConfig, setCalendarConfig] = useState({
            viewType: "Week",
            durationBarVisible: false,
            eventHeight: 50,
            timeRangeSelectedHandling: user.pakal === "COMMANDER" ? "Enabled" : "Disabled",
            eventMoveHandling: user.pakal === "COMMANDER" ? "Update" : "Disabled",
            onTimeRangeSelected: async args => {
                const dp = calendarRef.current.control;
                const form = [{
                    name: "Mission Type",
                    id: "missionType",
                    type: "select",
                    options: [
                        {id: "MISSION", name: "Mission"},
                        {id: "PATROL_BY_CAR", name: "Patrol by car"},
                        {id: "WATCH", name: "Watch"},
                        {id: "GUARD", name: "Guard"}
                    ]
                },
                    {name: "Soldier Count", id: "soldierCount", type: "number"}];
                const modal = await DayPilot.Modal.form(form);
                dp.clearSelection();
                if (!modal.result) {
                    return;
                }
                const newMission = {
                    classId: 40,
                    missionType: modal.result.missionType,
                    soldierCount: modal.result.soldierCount,
                    startDate: formatMissionDate(args.start.value.toString()),
                    endDate: formatMissionDate(args.end.value.toString()),
                    soldiersOnMission: []
                };

                createMission(newMission).then((res => {
                    console.log("new mission created", res);
                }));
                dp.events.add({
                    start: args.start,
                    end: args.end,
                    id: DayPilot.guid(),
                    soldierCount: modal.result.soldierCount,
                    missionType: modal.result.missionType,
                    text: `${formatMissionType(modal.result.missionType)}\n${formatTime(args.start.toString())} - ${formatTime(args.end.toString())}`,
                    backColor: getMissionColor(modal.result.missionType),
                    soldiersOnMission: []
                });
            },
            onEventClick: async args => {
                await reviewEvent(args.e);
            },
            onEventMoved: args => {
                const updatedTime = {
                    startDate: formatMissionDate(args.newStart.value.toString()),
                    endDate: formatMissionDate(args.newEnd.value.toString())
                };
                updateMission(args.e.data.id.toString(), updatedTime).then((res => {
                    console.log("mission updated", res);
                }));
                console.log(args);
                const dp = calendarRef.current.control;
                const e = args.e;
                e.data.text = `${formatMissionType(e.data.missionType)}\n${formatTime(e.data.start.toString())} - ${formatTime(e.data.end.toString())}`;
                dp.events.update(e);
            },
            contextMenu: new DayPilot.Menu({
                items: user.pakal === "COMMANDER" ? [
                    {
                        text: "Edit",
                        onClick: async args => {
                            await editEvent(args.source);
                        }
                    },
                    {
                        text: "-"
                    },
                    {
                        text: "Delete",
                        onClick: async args => {
                            const dp = calendarRef.current.control;
                            console.log("delete mission", args.source.data.id);
                            await deleteMission(args.source.data.id.toString())
                                .then((res) => {
                                    dp.events.remove(args.source);
                                    console.log("mission deleted", res);
                                })
                                .catch((err) => {
                                    console.log("mission not deleted", err);
                                });
                        },
                    }
                ] : []
            }),
    });

    useEffect(() => {
        getMissions().then((missionsData) => {
            let filteredMissions = missionsData.data;
            if (user.pakal !== "COMMANDER") {
                filteredMissions = filteredMissions.filter(mission => mission.soldiersOnMission.includes(user.personalNumber));
            }
            const events = filteredMissions.map((mission) => ({
                id: mission._id,
                text: `${formatMissionType(mission.missionType)}\n${mission.startDate.split(' ')[1]} - ${mission.endDate.split(' ')[1]}`,
                missionType: mission.missionType,
                start: convertToISO(mission.startDate),
                end: convertToISO(mission.endDate),
                backColor: getMissionColor(mission.missionType),
                soldierCount: mission.soldierCount,
                soldiersOnMission: mission.soldiersOnMission
            }));

        const startDate = "2024-02-12";

        calendarRef.current.control.update({startDate, events});
        });
    }, []);


    return (
        <div className="wrap">
             <main>

                <DayPilotCalendar
                    {...calendarConfig}
                    ref={calendarRef}
                />
             </main>
         </div>
    );
}

export default Calendar;

