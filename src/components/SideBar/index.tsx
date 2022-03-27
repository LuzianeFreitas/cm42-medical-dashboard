import { Link } from 'react-router-dom';

import { Container, PatientInfo } from './styles';

import { useSchedule } from '../../hooks/useSchedule';
import { useState } from 'react';

const SideBar = (): JSX.Element => {
    const { patients } = useSchedule();
    
    const [selectedPatientId, setSelectedPatientId] = useState<number>(1);


    return (
        <Container>
            <Link to="/">
                <h3>Medical Test</h3>
            </Link>

            <PatientInfo to={selectedPatientId != undefined ? `/patient/${selectedPatientId}`: '/'}>
                <select name="selectPatient" id="selectPatient" onChange={event => setSelectedPatientId(parseInt(event.target.value))}>
                    {
                        patients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                        )) 
                    }
                </select>
            </PatientInfo>
        </Container>
    );
};

export default SideBar;