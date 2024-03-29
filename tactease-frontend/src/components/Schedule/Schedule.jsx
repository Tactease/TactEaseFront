import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import "./schedule.style.css"
import missionsData from '../../demo-data/missions.json';

const convertToISO = (dateStr) => {
    const [date, time] = dateStr.split(' ');
    const [day, month, year] = date.split('/');
    let [hours, minutes] = time.split(':');
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
};

const getMissionColor = (missionType) => {
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

const formatMissionType = (missionType) => {
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

const Calendar = () => {
    const calendarRef = useRef()

    const editEvent = async (e) => {
        const dp = calendarRef.current.control;
        const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
        if (!modal.result) { return; }
        e.data.text = modal.result;
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
                options: [
                    {name:"Mission", value:"MISSION"},
                    {name:"Patrol by car", value:"PATROL_BY_CAR"},
                    {name:"Watch", value:"WATCH"},
                    {name:"Guard", value:"GUARD"}
                ]},
                // {name:"Start Date", id:"startDate", value: args.start.value.toString()},
                // {name:"End Date", id:"endDate", value: args.end.value.toString()},
                {name:"Soldier Count", id:"soldierCount", type: "number"}];
            const modal = await DayPilot.Modal.form(form);
            dp.clearSelection();
            if (!modal.result) { return; }
            console.log(modal.result);
            dp.events.add({
                start: args.start,
                end: args.end,
                id: DayPilot.guid(),
                text: `${formatMissionType(modal.result.missionType)}`,
                backColor: '#58B7D4',
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
                    text: "Edit...",
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

