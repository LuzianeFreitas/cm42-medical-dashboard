import { useState } from "react";
import { Patients } from '../../types';
import ItenTab from "../ItenTab";

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

    // const handleUpcomingTab = () => {
    //     setActiveTab("upcoming");
    // }

    // const handleHistoryTab = () => {
    //     setActiveTab("history");
    // }

    function handleNotes(appointmentId: number){
        setAppointmentId(appointmentId);
        return;        
    }

    return (
        <div className="Tabs">
            <ul className="nav">
                <li className={activeTab === "history" ? "active" : ""} onClick={handleRecentTab}>History</li>
                {/* <li className={activeTab === "upcoming" ? "active" : ""} onClick={handleUpcomingTab}>Upcoming</li>
                <li className={activeTab === "history" ? "active" : ""} onClick={handleHistoryTab}>History</li> */}
            </ul>
            <div className="outlet">
                <div className="sectionRecents">
                    {type?.appointments?.map((appointment) => (
                        <div className="section-item" key={appointment.id}>
                            <span onClick={() => handleNotes(appointment.id)}>ver</span>
                            <span>{appointment.startTime}</span>
                            <span>{appointment.type}</span>
                            <span className="tag-status">{appointment.status}</span>
                        </div> 
                    ))}

                    <ItenTab appointmentId={Number(appointmentId)}/>
                </div>
            </div>
        </div>
    );
};

export default Tabs;