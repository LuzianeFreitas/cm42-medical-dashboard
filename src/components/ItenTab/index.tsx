import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Appointments } from "../../types";
import { formatDate } from "../../utils/format";
import "./styles.css";

interface Props {
    appointmentId: number
}
const ItenTab = ({appointmentId}: Props): JSX.Element => {
    const [appointmentInfo, setAppointmentInfo] = useState<Appointments>({} as Appointments);
    const [loading,setLoading] =useState(true);


    useEffect(() => {
        if(!appointmentId) return;

        api.get(`appointments/${appointmentId}`).then(({data}) => {
            setAppointmentInfo(data);
            setLoading(false);
        }).catch()
    }, [appointmentId]);

    if(loading) {
        return (
            <>
                click on appointment to see more details.
            </>
        );
    }

    return (
        <>
            <div className="container-header">
                <h5>Appointment Details</h5>
                <div>
                    <span>{formatDate(appointmentInfo.startTime)}</span>
                </div>
            </div>
            <div className="container-description">
                <p>
                    {appointmentInfo.description}
                </p>
            </div>
            <div className="container-notes">
                <h3><span>{appointmentInfo.specialty}</span> says:</h3>
                <p>{appointmentInfo.notes}</p>
            </div>
        </>
    );
};

export default ItenTab;