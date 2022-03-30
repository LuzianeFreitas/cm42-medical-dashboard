import { useSchedule } from "../../hooks/useSchedule";
import { formatDate, formatTime } from "../../utils/format";
import IconStatus from "../IconStatus";
import { Link } from "react-router-dom";

import "./style.css";

const History = (): JSX.Element => {
    const { patients,appointments } = useSchedule();

    const showNamePatient = (patientId: number) => {
        let allPatients = [...patients];
        let namePatient = "";

        allPatients?.filter(patient => {
            if (patient.id === patientId) {
                namePatient = patient.name.toString();
                return;
            }
        });

        return namePatient;
    }

    const linkPatientInfo = {
        textDecoration: 'none',
        color: '#1c1c1c',
    }

    return(
        <div className="container-history">
            <h4>History</h4>

            <div className="content-history">
                {
                    appointments?.map(appointment => (
                        <Link to={`/patient/${appointment.patientId}`} style={linkPatientInfo}>
                            <div className="patient-appointment" key={appointment.id}>
                                <span className="date-time-appointment">
                                    <span>
                                        {formatDate(appointment.startTime)}
                                    </span>
                                    <span className="time-appointment">
                                        {formatTime(appointment.startTime,appointment.endTime)}
                                    </span>
                                </span>
                                <span className="status-appointment">
                                    <IconStatus status={appointment.status.toString()}/>
                                </span>
                                <span className="name-patient">
                                    {showNamePatient(appointment.patientId)}
                                </span>
                                <span className="type-appointment">
                                    {appointment.type}
                                </span>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default History;