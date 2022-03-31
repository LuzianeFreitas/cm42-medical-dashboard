import {isSameWeek, isSaturday, isSunday, getDay, isBefore, isAfter, getHours, getMinutes} from "date-fns";
import { Link } from "react-router-dom";
import { useSchedule } from "../../hooks/useSchedule";
import { formatDateCalendar, formatHourCalendar } from "../../utils/format";



import "./style.css";

const Calendar = (): JSX.Element => {
    const { appointments, patients } = useSchedule();
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
                let appointmentDescription = "";
                let patientId = "";

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

                        if(hourAppointmentStart == hour && minutesAppointmentStart == min) {
                            appointmentDescription = element.description;
                            patientId = element.patientId.toString();
                        }
                        
                        if(element.endTime) {
                            let dateEndFormatted = formatDateCalendar(element.endTime)
                            let dateEnd = new Date(dateEndFormatted);
                            let hourAppointmentEnd = getHours(dateEnd);
                            let minuteAppointmentEnd = getMinutes(dateEnd);
                            let intervalStart = isAfter(currentDateWeekly, dateStart);
                            let intervalEnd = isBefore(currentDateWeekly, dateEnd);

                            if(hourAppointmentEnd == hour && minuteAppointmentEnd == min) {
                                appointmentDescription = element.description
                                patientId = element.patientId.toString();
                            }

                            if(intervalStart && intervalEnd){ 
                                appointmentDescription = element.description;
                                patientId = element.patientId.toString();
                            }
                        }
                    }
                })

                calendarCol.push(
                    <div 
                        className={`col cell-calendar ${appointmentDescription.length > 0 ? 'active-card' : ''}`}
                    >
                        <Link to={`/patient/${patientId}`} className="format-link">
                            <span className="name-patient">
                                [{getPatientName(patientId)}]
                            </span>
                            <span className="description">
                                {appointmentDescription}
                            </span>
                        </Link>
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

    const getPatientName = (patientId: string) => {
        let patientIdNumber = Number(patientId);
        let patientName = "";

        patients?.filter(patient => { 
            
            if(patientIdNumber === patient.id) {
                patientName = patient.name.toString();
                return;
            }
        });

        return patientName;
    }

    return(
        <div className="container-calendar">
            <h4>Calendar</h4>
            {renderCalendar()}
        </div>
    );
};

export default Calendar;