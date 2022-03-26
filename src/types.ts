export interface Patients {
    id: number,
    name: string,
    document: string,
    healthSystemId: string,
    birthday: string,
    insurancePlan: InsurancePlan,
    age: number,
    appointments: []
};

export interface Appointments {
    id: number,
    specialty: Specialty,
    type: AppointmentType,
    description: string,
    notes: string,
    patientId: number,
    startTime: string,
    endTime: string | null
    status: Status
};

export enum InsurancePlan {
    "Regional",
    "National Basic",
    "National Premium",
    "International",
    "Diamond",
};

export enum Specialty {
    "neurology",
    "cardiology",
    "general",
};

export enum Status {
    "pending",
    "completed",
    "cancelled",
    "absent",
};

export enum AppointmentType {
    "firstVisit",
    "followUp",
    "checkUp",
    "exam",
    "surgery",
};