import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./schedule.style.css"
import missionsData from '../../demo-data/missions.json';
import { convertToISO, formatTime, getMissionColor, formatMissionType } from '../Mission/Mission.jsx';


const Calendar = () => {
    const calendarRef = useRef()

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
            });
        },
        onEventClick: async args => {
            await editEvent(args.e);
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
        // onBeforeEventRender: args => {
        //     args.data.areas = [
        //         {
        //             top: 3,
        //             right: 3,
        //             width: 20,
        //             height: 20,
        //             symbol: "icons/daypilot.svg#minichevron-down-2",
        //             fontColor: "#fff",
        //             toolTip: "Show context menu",
        //             action: "ContextMenu",
        //         },
        //         {
        //             top: 3,
        //             right: 25,
        //             width: 20,
        //             height: 20,
        //             symbol: "icons/daypilot.svg#x-circle",
        //             fontColor: "#fff",
        //             action: "None",
        //             toolTip: "Delete event",
        //             onClick: async args => {
        //                 const dp = calendarRef.current.control;
        //                 dp.events.remove(args.source);
        //             }
        //         }
        //     ];
        //
        //
        //     // const participants = args.data.participants;
        //     // if (participants > 0) {
        //     //     // show one icon for each participant
        //     //     for (let i = 0; i < participants; i++) {
        //     //         args.data.areas.push({
        //     //             bottom: 5,
        //     //             right: 5 + i * 30,
        //     //             width: 24,
        //     //             height: 24,
        //     //             action: "None",
        //     //             image: `https://picsum.photos/24/24?random=${i}`,
        //     //             style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
        //     //         });
        //     //     }
        //     // }
        // }
    });

    useEffect(() => {
        const events = missionsData.map((mission) => ({
            id: mission.missionId,
            text: `${formatMissionType(mission.missionType)}\n${mission.startDate.split(' ')[1]} - ${mission.endDate.split(' ')[1]}`,
            start: convertToISO(mission.startDate),
            end: convertToISO(mission.endDate),
            backColor: getMissionColor(mission.missionType),
            participants: mission.soldierCount,
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

