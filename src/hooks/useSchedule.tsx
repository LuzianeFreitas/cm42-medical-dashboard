import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { Patients, Appointments } from '../types';

interface ScheduleProviderProps {
    children: ReactNode;
}

interface ScheduleContextData {
    patients: Patients[];
    appointments: Appointments[];
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
            setAppointments(response.data);            
        });
        
    }, []);

    return (
        <ScheduleContext.Provider
            value={{ patients, appointments }}
        >
            {children}
        </ScheduleContext.Provider>
    );
}

export function useSchedule(): ScheduleContextData {
    const context = useContext(ScheduleContext);
  
    return context;
  }