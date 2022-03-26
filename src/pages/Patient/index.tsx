import { useSchedule } from '../../hooks/useSchedule';
import { Appointments } from '../../types';

import { Container, Header, InfoPatient, Title, Informacao  } from "./styles";

const Patient = (): JSX.Element => {
    const { patientInfo } = useSchedule();    
    
    let arrayAppointments: Appointments[];

    arrayAppointments = patientInfo.appointments.map((teste) => teste);

    console.log(arrayAppointments);
    
    
    const formatDocument = (document: string) => {
        
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    }

    const formatHealthSystemId = (healthSystemId: string) => {

        return healthSystemId.replace(/(\d{3})(\d{3})(\d{4})/g,"\$1.\$2.\/\$3");
    }
    
    return (
        <Container>
            <h3>
                Dashboard
            </h3>

            <Header>
                <InfoPatient>
                    <h5>Patient Info</h5>
                    
                    <Title>{patientInfo.name}</Title>
                    <Informacao>
                        {patientInfo.document} 

                        <span>{patientInfo.age} y/o</span>  
                    </Informacao>
                    
                </InfoPatient>

                <InfoPatient>
                    <h5>Plan Info</h5>
                    
                    <Title>{patientInfo.insurancePlan}</Title>
                    <Informacao>
                        {patientInfo.healthSystemId} 
                    </Informacao>
                </InfoPatient>

                <InfoPatient>
                    <h5>Latest App.</h5>
                    
                    <Title>{arrayAppointments[0].specialty}</Title>
                    <Informacao>
                        {arrayAppointments[0].startTime}
                    </Informacao>
                </InfoPatient>
            </Header>

        </Container>
    );
};

export default Patient;
