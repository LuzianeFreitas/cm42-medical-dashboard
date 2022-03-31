import {isSameWeek, isSaturday, isSunday, getDay, isBefore, isAfter, getHours, getMinutes} from "date-fns";
import { useSchedule } from "../../hooks/useSchedule";
import { formatDateCalendar, formatHourCalendar } from "../../utils/format";


import "./style.css";

const Calendar = (): JSX.Element => {
    const { appointments } = useSchedule();
    const currentDate = new Date;
    

    const renderCalendar = () => {
        let hour = 9;
        let min = 0;
        let calendarRow = [];
        let calendarCol = [];
        let weeklyAppointments = compareWeeks();
        
        calendarRow.push(getHeaderCalendarDays());

        for(let hourIndex = 0; hourIndex < 19; hourIndex++) {
            calendarCol.push(
                <div className="col hour-calendar">
                    {formatHourCalendar(hour,min)}
                </div>
            );

            for(let dayIndex = 0; dayIndex < 5 ; dayIndex++) {
                let appointment = "";

                weeklyAppointments.forEach(element => {
                    let dateFormatted = formatDateCalendar(element.startTime);
                    let dateStart = new Date(dateFormatted);

                    let currentDateWeekly = new Date(dateFormatted);
                    currentDateWeekly.setHours(hour);
                    currentDateWeekly.setMinutes(min);
                    
                    let date = getDay(dateStart);

                    if(date == dayIndex+1) {
                        let hourAppointmentStart = getHours(dateStart);
                        let minutesAppointmentStart = getMinutes(dateStart);

                        if(hourAppointmentStart == hour && minutesAppointmentStart == min)
                            appointment = element.description
                        
                        if(element.endTime) {
                            let dateEndFormatted = formatDateCalendar(element.endTime)
                            let dateEnd = new Date(dateEndFormatted);
                            let hourAppointmentEnd = getHours(dateEnd);
                            let minuteAppointmentEnd = getMinutes(dateEnd);
                            let intervalStart = isAfter(currentDateWeekly, dateStart);
                            let intervalEnd = isBefore(currentDateWeekly, dateEnd);

                            if(hourAppointmentEnd == hour && minuteAppointmentEnd == min)
                                appointment = element.description

                            if(intervalStart && intervalEnd) 
                                appointment = element.description
                        }
                    }
                })

                calendarCol.push(
                    <div className={`col cell-calendar ${appointment.length > 0 ? 'active-card' : ''}`}>
                        {appointment}
                    </div>
                );
            }
            calendarRow.push(
                <div className="row">
                    {calendarCol}
                </div>
            );
            
            if(min == 0) {
                min = 30;
            } else {
                min = 0;
                hour++;
            }
            calendarCol = [];
        }

        return (<div className="container-body-calendar">{calendarRow}</div>);    
    }

    const getHeaderCalendarDays = () => {
        let daysWeek = [ '','Mon','Tue','Wed','Thu','Fri'];
        let headerWeek = [];

        for(let dayIndex = 0; dayIndex < 6 ; dayIndex++) {
            headerWeek.push(
                <div className="col" key={dayIndex}>
                    {daysWeek[dayIndex]}
                </div>
            );     
        }

        return (
            <div className="row header-calendar">
               {headerWeek}
            </div>
        );
    }

    const compareWeeks = () => {
        return appointments?.filter(appointment => {
            let dateAppointment = new Date(appointment.startTime);

            const currentWeek = isSameWeek(dateAppointment,currentDate,{weekStartsOn: 1});
            let isSaturdayDay = isSaturday(dateAppointment);
            let isSundayDay = isSunday(dateAppointment);

            if(currentWeek && !isSaturdayDay && !isSundayDay) return true;

            return false;
        })
    }

    return(
        <div className="container-calendar">
            <h4>Calendar</h4>
            {renderCalendar()}
        </div>
    );
};

export default Calendar;