import { useState } from "react";
import { Patients, Status } from '../../types';
import ItenTab from "../ItenTab";
import IconStatus from "../IconStatus";
import { formatDate, formatTime } from "../../utils/format";

import "./styles.css";

interface Props {
    type: Patients
}

const Tabs = ({type}: Props): JSX.Element => {
    const [activeTab, setActiveTab] = useState<string>("history");

    const [appointmentId, setAppointmentId] = useState<number|null>(null);
    
    const handleRecentTab = () => {
        setActiveTab("recent");
        return;
    }

    const handleNotes = (appointmentId: number) => {
        setAppointmentId(appointmentId);
        return;        
    }

    return (
        <div className="Tabs">
            <ul className="nav">
                <li className={activeTab === "history" ? "active" : ""} onClick={handleRecentTab}>History</li>
            </ul>
            <div className="outlet">
                <div className="sectionRecents">
                    {type?.appointments?.map((appointment) => (
                        <div className="section-appointment" key={appointment.id} onClick={() => handleNotes(appointment.id)}>
                            <span className="section-appoitment-time">
                                <span>ver</span>
                                <div>
                                    <span>{formatDate(appointment.startTime)}</span>
                                    <span>{formatTime(appointment.startTime,appointment.endTime)}</span>
                                </div>
                            </span>
                            <span className="type-appointment">{appointment.type}</span>
                            <span className="status-appointment">
                                <IconStatus status={appointment.status.toString()}/>
                            </span>
                        </div> 
                    ))}

                    <ItenTab appointmentId={Number(appointmentId)}/>
                </div>
            </div>
        </div>
    );
};

export default Tabs;