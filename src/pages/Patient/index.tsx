import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '../../services/api';

import { useSchedule } from '../../hooks/useSchedule';

import { Patients } from '../../types';

import Tabs from "../../components/Tabs";
import { Container, Header, InfoPatient, Title, Informacao, Detail  } from "./styles";

const Patient = (): JSX.Element => {

    const { id } = useParams();
    const { appointments } = useSchedule();
    const [patientInfo, setPatientInfo] = useState<Patients>({} as Patients);
    
    
    useEffect(() => {
        api.get(`patients/${Number(id)}`).then(({data}) => {
            
            console.log(data);
        
            const age = getAgePatient(data.birthday);

            const appointmentPatient = getPatientAppointments(Number(id));   

            console.log(appointmentPatient);

            const infoPatients = {
                ...data,
                age: age,
                appointments: appointmentPatient,
            }       
            
            console.log(infoPatients.appointments);

            setPatientInfo(infoPatients);

            // let patientFormat = {
            //     ...patientInfo,
            //     documentFormatted: formatDocument(data.document),
            //     healthSystemIdFormatted: formatHealthSystemId(data.healthSystemId)
            // }
        })            
    }, [id]);

    const getAgePatient = (date: string) => {
        let arrayDate = date.split('T');
        let dateString = arrayDate[0];
        
        arrayDate = dateString.split('-');

        const currentYear = new  Date().getFullYear();

        const age = currentYear - parseInt(arrayDate[0]);

        return age;
    }

    const getPatientAppointments = (patientId: number) => {       
        let allAppointments = [...appointments];
      
        allAppointments = allAppointments.filter(appointments => (appointments.patientId === patientId));
        
        return allAppointments;    
    }
    
    const formatDocument = (document: string) => {
        
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    }

    const formatHealthSystemId = (healthSystemId: string) => {

        return healthSystemId.replace(/(\d{3})(\d{3})(\d{4})/g,"\$1.\$2.\/\$3");
    }

    const formatDate = (date: string) => {
        let arrayDate = date.split('T');
        let dateString = arrayDate[0];
        arrayDate = dateString.split('-');

        let dateFormated = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0];

        return dateFormated
    }

    
    return (
        <Container>
            <h3>
                Dashboard
            </h3>

            <Header>
                <InfoPatient>
                    <h5>Patient Info</h5>
                    
                    <Title>{patientInfo?.name}</Title>
                    <Informacao>
                        {patientInfo?.document ? formatDocument(patientInfo?.document) : ""} 

                        <span>{patientInfo?.age} y/o</span>  
                    </Informacao>
                    
                </InfoPatient>

                <InfoPatient>
                    <h5>Plan Info</h5>
                    <Title>{patientInfo?.insurancePlan}</Title>
                    <Informacao>
                        {patientInfo?.healthSystemId ? formatHealthSystemId(patientInfo?.healthSystemId) : ""} 
                    </Informacao>
                </InfoPatient>

                <InfoPatient>
                    <h5>Latest App.</h5>
                    <Title>{patientInfo?.appointments ? patientInfo?.appointments[0].specialty : ""}</Title>
                    <Informacao>
                        {patientInfo?.appointments ? formatDate(patientInfo?.appointments[0].startTime) : ""}
                    </Informacao>
                </InfoPatient>
            </Header>

            <Detail>
                <Tabs type={patientInfo}/>
            </Detail>
        </Container>
    );
};

export default Patient;
