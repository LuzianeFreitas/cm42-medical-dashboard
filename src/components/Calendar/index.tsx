import {isSameWeek,isSaturday,isSunday,getDay,isBefore, isAfter, startOfWeek,format,addDays, startOfMonth, endOfMonth,endOfWeek, subMonths, addMonths, isMonday, getHours, getMinutes} from "date-fns";
import { useState } from "react";
import { useSchedule } from "../../hooks/useSchedule";


import "./style.css";

const Calendar = (): JSX.Element => {
    const { appointments } = useSchedule();
    const currentDate = new Date;
    
    
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());


    console.log(currentMonth);
    
    const showHeaderCalendar = () =>{
        console.log(appointments);
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

    const renderCalendar = () => {
        let hour = 9;
        let min = 0;
        let calendarRow = [];
        let calendarCol = [];

        
        console.log(compareWeeks());

        let weeklyAppointments = compareWeeks();
        
        calendarRow.push(getHeaderCalendarDays());
        for( let hourIndex = 0; hourIndex < 19; hourIndex++) {
            calendarCol.push(
                <div className="col">
                    { hour +':'+ min}
                </div>
            )
            for(let dayIndex = 0; dayIndex < 5 ; dayIndex++) {
                let appointment = "";
                weeklyAppointments.forEach(element => {
                    let dateFormatted = element.startTime.replace('T', ' ').replace('.592Z', '');
                    
                    let dateStart = new Date(dateFormatted);
                    let currentDate = new Date(dateFormatted);
                    currentDate.setHours(hour);
                    currentDate.setMinutes(min);
                    
                    if(getDay(dateStart) == dayIndex+1) {
                        if(getHours(dateStart) == hour && getMinutes(dateStart) == min)
                            appointment = element.description
                        
                        
                        if(element.endTime) {
                            let dateEndFormatted = element.endTime.replace('T', ' ').replace('.592Z', '');
                            let dateEnd = new Date(dateEndFormatted);

                            if(getHours(dateEnd) == hour && getMinutes(dateEnd) == min)
                                appointment = element.description

                            
                            
                            if(isAfter(currentDate, dateStart) && isBefore(currentDate, dateEnd)) {
                                appointment = element.description
                            }
                        }
                    }


                })

                calendarCol.push(
                    <div className="col">
                        <div className="cell">
                        {                        
                            appointment
                        }
                        </div>
                </div>
                )
            }
            calendarRow.push(
                <div className="row">
                    {calendarCol}
                </div>
            )
            
            if(min == 0) {
                min = 30;
            } else {
                min = 0;
                hour++;
            }
            calendarCol = [];

        }

        return <div>{calendarRow}</div>
        
    }

    const getHeaderCalendarDays = () => {
        let daysWeek = [ '','Mon','Tue','Wed','Thu','Fri'];

        let headerWeek = [];

        for(let dayIndex = 0; dayIndex < 6 ; dayIndex++) {
            headerWeek.push(
                <div className="col">
                    {daysWeek[dayIndex]}
                </div>
            )     
        }

        return (
            <div className="row">
               {headerWeek}
            </div>
        );
    }

    const compareWeeks = () => {
        return appointments?.filter(appointment => {
            let dateAppointment = new Date(appointment.startTime)
            const currentWeek = isSameWeek(dateAppointment,currentDate,{weekStartsOn: 1});
            if(currentWeek && (!isSaturday(dateAppointment)) && (!isSunday(dateAppointment))) {
                return true;
            }

            return false;
        })
    }

    return(
        <div>
            {showHeaderCalendar()}
            {showDaysCalendar()}
            {showHoursDay()}
            {showCellsCalendar()}

            {renderCalendar()}
        </div>
    );
};

export default Calendar;