import { Link } from 'react-router-dom';

import { Container, LinkPatient } from './styles';

import { useSchedule } from '../../hooks/useSchedule';
import { ChangeEvent, useState } from 'react';

const SideBar = (): JSX.Element => {
    const { patients } = useSchedule();
    
    const [selectedPatientId, setSelectedPatientId] = useState("");    

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPatientId(event.target.value);

        return;
    }

    const linkHome = {
        textDecoration: 'none',
        color: '#1c1c1c',
    }

    return (
        <Container>
            <Link to="/" style={linkHome}>
                <h3>Medical Test</h3>
            </Link>

            <LinkPatient to={`/patient/${selectedPatientId}`}>
                <select name="selectPatient" id="selectPatient" onChange={handleChange} defaultValue="default">
                        <option value="default" aria-disabled disabled>Select a Patient</option>
                    {
                        patients.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                        )) 
                    }
                </select>
            </LinkPatient>            
            
        </Container>
    );
};

export default SideBar;