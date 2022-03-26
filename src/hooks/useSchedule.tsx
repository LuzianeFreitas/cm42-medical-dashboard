import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { Patients, Appointments } from '../types';

interface ScheduleProviderProps {
    children: ReactNode;
}

interface ScheduleContextData {
    patients: Patients[];
    patientInfo: Patients;
    appointments: Appointments[];
    getPatientInfo: (patientId: number) => void;
}

const ScheduleContext = createContext<ScheduleContextData>({} as ScheduleContextData);

export function ScheduleProvider({ children }: ScheduleProviderProps): JSX.Element {
    const [patients, setPatients] = useState<Patients[]>([]);
    const [patientInfo, setPatientInfo] = useState<Patients>({} as Patients);
    const [appointments, setAppointments] = useState<Appointments[]>([]);

    useEffect(() => {
        api.get('patients').then(response => {
            setPatients(response.data);
        });

        api.get('appointments').then(response => {
            console.log(response.data);
            setAppointments(response.data);
        });
    }, []);

    const getPatientInfo = async (patientId: number) => {
        const response = await api.get(`patients/${patientId}`);        
        
        let age = getAgePatient(response.data.birthday);

        let appointmentsPatient= getAppointmentPatient(response.data.id);

        const patient = {
            ...response.data,
            age: age,
            appointments: appointmentsPatient
        }

        setPatientInfo(patient);
    }

    const getAgePatient = (patientBirthday: string) => {
        let arrayDate = patientBirthday.split('T');
        let dateBirthday = arrayDate[0];
        arrayDate = dateBirthday.split('-');

        const currentYear = new  Date().getFullYear();

        const age = currentYear - parseInt(arrayDate[0]);

        return age;
    }

    const getAppointmentPatient = (patientId: number) => {
        let allAppointments = [...appointments];
        
        allAppointments = allAppointments.filter(appointments => (appointments.patientId == patientId));
        
        let auxAppointments: Array<Appointments> = allAppointments;

        // console.log(auxAppointments);
        

        // auxAppointments.sort((a: Appointments, b: Appointments) => {
        //     let arrayDateA = a.startTime.split('T');
        //     let dateA = arrayDateA[0];
        //     arrayDateA = dateA.split('-');
        //     let dateFormatA = arrayDateA[2] +"-"+arrayDateA[1]+"-"+arrayDateA[0];

        //     let arrayDateB = b.startTime.split('T');
        //     let dateB = arrayDateB[0];
        //     arrayDateB = dateB.split('-');
        //     let dateFormatB = arrayDateB[2] +"-"+arrayDateB[1]+"-"+arrayDateB[0];
        //     console.log(dateFormatA,dateFormatB);
            
        //     if (dateFormatA < dateFormatB){
        //         return 1;
        //     } else {
        //         return -1;
        //     } 
        // });

        // console.log(auxAppointments);
        
        return auxAppointments;
    }

    return (
        <ScheduleContext.Provider
            value={{ patients, patientInfo, appointments, getPatientInfo }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}

export function useSchedule(): ScheduleContextData {
    const context = useContext(ScheduleContext);
  
    return context;
  }