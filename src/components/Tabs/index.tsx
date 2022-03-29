import { useState } from "react";
import { Patients, Status } from '../../types';
import ItenTab from "../ItenTab";
import IconStatus from "../IconStatus";

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

    function handleNotes(appointmentId: number){
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
                            <div className="section-appoitment-time">
                                <span>ver</span>
                                <span>{appointment.startTime}</span>
                            </div>
                            <span>{appointment.type}</span>
                            <IconStatus status={appointment.status.toString()}/>
                        </div> 
                    ))}

                    <ItenTab appointmentId={Number(appointmentId)}/>
                </div>
            </div>
        </div>
    );
};

export default Tabs;