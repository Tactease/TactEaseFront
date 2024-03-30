import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./schedule.style.css"
import missionsData from '../../demo-data/missions.json';
import { convertToISO, formatTime, getMissionColor, formatMissionType } from '../Mission/Mission.jsx';


const Calendar = () => {
    const calendarRef = useRef()

    const reviewEvent = async (e) => {
        let missionInfo = `
        <h1>${formatMissionType(e.data.missionType)}</h1>
        <p class="mission-info">Date: ${e.data.start.toString().split('T')[0]}</p>
        <p class="mission-info">Hours: ${formatTime(e.data.start.toString())} - ${formatTime(e.data.end.toString())}</p>
        <p class="mission-info">Participants:</p>`;
        e.data.soldiersOnMission.forEach((soldier) => {
            missionInfo += `<p class="mission-info">${soldier}</p>`;
        });
        await DayPilot.Modal.alert(missionInfo);
    }

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
                // {type:"hidden", name:"Start Date", id:"startDate", value: args.start.value.toString()},
                // {type:"hidden", name:"End Date", id:"endDate", value: args.end.value.toString()},
            const modal = await DayPilot.Modal.form(form);
            dp.clearSelection();
            if (!modal.result) { return; }
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
        contextMenu: new DayPilot.Menu({
            items: [
                {
                    text: "Delete",
                    onClick: async args => {
                        const dp = calendarRef.current.control;
                        dp.events.remove(args.source);
                    },
                },
                {
                    text: "-"
                },
                {
                    text: "Edit",
                    onClick: async args => {
                        await editEvent(args.source);
                    }
                }
            ]
        }),
    });

    useEffect(() => {
        const events = missionsData.map((mission) => ({
            id: mission.missionId,
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

        const cells = document.querySelectorAll('.calendar_default_cell_inner');
        cells.forEach((cell, index) => {
            if (index % 2 === 0) {
                cell.classList.add('no-border');
            }
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

