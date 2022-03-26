import { Link } from 'react-router-dom';

import { Container, PatientInfo } from './styles';

import { useSchedule } from '../../hooks/useSchedule';
import { useState } from 'react';

const SideBar = (): JSX.Element => {
    const { patients, getPatientInfo } = useSchedule();
    
    const [selectedPatientId, setSelectedPatientId] = useState<number>();
    
    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
        var value = event.target.value;
        
        if(value != undefined) {
            const id = parseInt(value);
            setSelectedPatientId(id);
            getPatientInfo(id);
        }
    };  
    

    return (
        <Container>
            <Link to="/">
                <h3>Medical Test</h3>
            </Link>

            <PatientInfo to={selectedPatientId != undefined ? `/patient/${selectedPatientId}`: '/'}>
                <select name="selectPatient" id="selectPatient" onChange={selectChange}>
                    <option value="">Patients</option>
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