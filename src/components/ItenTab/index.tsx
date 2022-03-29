import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Appointments } from "../../types";
import "./styles.css";

interface Props {
    appointmentId: number
}
const ItenTab = ({appointmentId}: Props): JSX.Element => {
    const [appointmentInfo, setAppointmentInfo] = useState<Appointments>({} as Appointments);


    useEffect(() => {
        if(!appointmentId) return;

        api.get(`appointments/${appointmentId}`).then(({data}) => {
            setAppointmentInfo(data);
        }).catch()
    }, [appointmentId]);

    return (
        <>
            <div className="container-header">
                <h5>Appointment Details</h5>
                <div>
                    <span>{appointmentInfo?.startTime}</span>
                    <span>{appointmentInfo?.endTime}</span>
                </div>
            </div>
            <div className="container-description">
                <p>
                    {appointmentInfo?.description}
                </p>
            </div>
            <div className="container-notes">
                <h3><span>{appointmentInfo?.specialty}</span> says:</h3>
                <p>{appointmentInfo?.notes}</p>
            </div>
        </>
    );
};

export default ItenTab;