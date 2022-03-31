import { Link } from 'react-router-dom';

import { Container, LinkPatient } from './styles';

import { useSchedule } from '../../hooks/useSchedule';
import { useState } from 'react';

const SideBar = (): JSX.Element => {
    const { patients } = useSchedule();
    
    const [selectedPatientId, setSelectedPatientId] = useState("");    

    
    const linkHome = {
        textDecoration: 'none',
        color: '#1c1c1c',
    }

    const linkPatientInfo = {
        width: '200px',
        padding: '0.3rem',
    }

    return (
        <Container>
            <Link to="/" style={linkHome}>
                <h3>Medical Test</h3>
            </Link>

            <LinkPatient to={`/patient/${selectedPatientId}`}>

                <select style={linkPatientInfo} name="selectPatient" id="selectPatient" onChange={(event) => setSelectedPatientId(event.target.value)} defaultValue="default">
                        <option value="default" aria-disabled disabled>Select a Patient</option>
                    {
                        patients?.map(patient => (
                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                        )) 
                    }
                </select>

            </LinkPatient>            
            
        </Container>
    );
};

export default SideBar;