import React, { useState, useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./schedule.style.css"
import { convertToISO, formatTime, getMissionColor, formatMissionType, formatDate, formatMissionDate } from '../Mission/Mission.jsx';
import { getMissions, createMission, deleteMission, updateMission } from '../../API/missions.api.js';
import { getSoldiers, getSoldierById } from "../../API/soldiers.api.js";
import { TableContainer, TableHeader, TableRow, TableCell, TableHead, TableBody } from './Schedule.style.js';


const Calendar = () => {
    const calendarRef = useRef()
    const [soldiersData, setSoldiersData] = useState([]);

    useEffect(() => {
        getSoldiers().then((data) => {
            setSoldiersData(data.data);
        });
    }, []);
    console.log(soldiersData);
    const reviewEvent = async (e) => {
        // getSoldiers().then((soldiersData) => {
        //         missionInfo +=`<TableContainer>
        // <TableHead>
        //   <TableRow>
        //     <TableHeader>Name</TableHeader>
        //     <TableHeader>Personal Number</TableHeader>
        //     <TableHeader>Pakal</TableHeader>
        //   </TableRow><TableBody>`;
        //     e.data.soldiersOnMission.forEach((personalNumber) => {
        //     missionInfo +=`<TableRow>`
        //         for(let i = 0; i < soldiersData.data.length; i++) {
        //             if (soldiersData.data[i].personalNumber.toString() === personalNumber.toString()) {
        //                 missionInfo += `<TableCell>${soldiersData.data[i].fullName}</TableCell> <TableCell>${soldiersData.data[i].personalNumber}</TableCell> <TableCell>${soldiersData.data[i].pakal}</TableCell>`;
        //             }
        //         }
        let missionInfo = (
            <>
                <h1>{formatMissionType(e.data.missionType)}</h1>
                <p className="mission-info">Date: {formatDate(e.data.start.toString())}</p>
                <p className="mission-info">Hours: {formatTime(e.data.start.toString())} - {formatTime(e.data.end.toString())}</p>
                <p className="mission-info">Participants:</p>
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Name</TableHeader>
                            <TableHeader>Personal Number</TableHeader>
                            <TableHeader>Pakal</TableHeader>
                        </TableRow>
                    </TableHead>
                    {/*<TableBody>*/}
                    {/*        {e.data.soldiersOnMission.map((personalNumber) => {*/}
                    {/*            soldiersData.forEach((soldier) => {*/}
                    {/*                if(soldier.personalNumber === personalNumber) {*/}
                    {/*                // const soldier = soldiersData.find(soldier => soldier.personalNumber === personalNumber);*/}
                    {/*                    <TableRow>*/}
                    {/*                        <TableCell>{soldier.fullName}</TableCell>*/}
                    {/*                        <TableCell>{soldier.personalNumber}</TableCell>*/}
                    {/*                        <TableCell>{soldier.pakal}</TableCell>*/}
                    {/*                    </TableRow>*/}
                    {/*                }*/}
                    {/*        })}*/}
                    {/*</TableBody>*/}
                    <TableBody>
                        {e.data.soldiersOnMission.map((personalNumber) => {
                            if (!soldiersData) {
                                return <div>Loading soldiers data...</div>;
                            }
                            return soldiersData.map((soldier) => {
                                if(soldier.personalNumber === personalNumber) {
                                    return (
                                        <TableRow key={soldier._id}>
                                            <TableCell>{soldier.fullName}</TableCell>
                                            <TableCell>{soldier.personalNumber}</TableCell>
                                            <TableCell>{soldier.pakal}</TableCell>
                                        </TableRow>
                                    );
                                }
                                // return null;
                            });
                        })}
                    </TableBody>
                </TableContainer>
            </>
        );
        let missionInfoString = ReactDOMServer.renderToString(missionInfo);
        DayPilot.Modal.alert(missionInfoString);
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
        timeRangeSelectedHandling: "Enabled",
        onTimeRangeSelected: async args => {
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
                ]},
                {name:"Soldier Count", id:"soldierCount", type: "number"}];
            const modal = await DayPilot.Modal.form(form);
            dp.clearSelection();
            if (!modal.result) { return; }
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
            items: [
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
            ]
        }),
    });

    useEffect(() => {
        getMissions().then((missionsData) => {
            const events = missionsData.data.map((mission) => ({
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

