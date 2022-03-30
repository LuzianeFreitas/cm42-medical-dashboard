import {startOfWeek,format,addDays, startOfMonth, endOfMonth,endOfWeek, subMonths, addMonths} from "date-fns";
import { useState } from "react";


import "./style.css";

const Calendar = (): JSX.Element => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log(currentMonth);
    
    const showHeaderCalendar = () =>{
        const dateFormat = "MMMM yyyy";

        return (
            <div className="calendar-header row">
               <div className="col" onClick={prevMonth}>
                   anterior
               </div>
               <div className="col">
                   {format(currentMonth, dateFormat)}
               </div>
               <div className="col" onClick={nextMonth}>
                   próximo
               </div>
            </div>
        );
    }

    const showDaysCalendar = () =>{
        const dayFormat = "cccc";
        const days = [];

        let startDay = startOfWeek(currentMonth);
        
        for(let i = 0; i < 7; i++) {
            days.push(
            <div className="col" key={i}>
                        {format(addDays(startDay,i),dayFormat)}
                    </div>
            );
        }

        console.log(days);
        
        return (
            <div className="row">
                {days}
            </div>
        );
    }

    const showHoursDay = () => {

    }

    const showCellsCalendar = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd); 
        
        const cellFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while(day <= endDate) {
            for(let i = 0; i < 7; i++) {
                formattedDate = format(day,cellFormat);
                const auxDay = day;
                days.push(
                    <div className="col">
                        {formattedDate}
                    </div>
                );
                day = addDays(day,1);
            }
            rows.push(
                <div className="row">
                    {days}
                </div>
            );

            days = [];
        }

        return <div>{rows}</div>;
    }

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth,1));
    }

    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth,1))
    }

    return(
        <div>
            {showHeaderCalendar()}
            {showDaysCalendar()}
            {showHoursDay()}
            {showCellsCalendar()}
        </div>
    );
};

export default Calendar;