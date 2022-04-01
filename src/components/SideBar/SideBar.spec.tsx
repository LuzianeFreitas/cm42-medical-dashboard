import { render,screen, fireEvent } from '@testing-library/react'
import {createMemoryHistory} from 'history'
import { ReactNode } from 'react'
import SideBar from '.'
import { useSchedule } from '../../hooks/useSchedule';

import { Router } from "react-router";
import { createBrowserHistory } from "history";




jest.mock('react-router-dom', () => {
    return {
        Link: ({ children }: { children: ReactNode }) => children,
    }
})

const patients = [
    {
        id: 1,
        name: 'Luziane Teste 1',
        document: '78998745624',
        healthSystemId: '5689472569',
        birthday: '1998-02-17T15:00:00Z',
        insurancePlan: 'International',
      },
      {
        id: 2,
        name: 'Luziane Teste 2',
        document: '78998745624',
        healthSystemId: '5689472569',
        birthday: '1998-02-17T15:00:00Z',
        insurancePlan: 'International',
      }
]

const mockeduseScheduleHook = useSchedule as jest.Mock;
jest.mock('../../hooks/useSchedule');


describe('SideBar component', () => {
    beforeEach(() => {
        mockeduseScheduleHook.mockReturnValue({
          patients: patients
        })
    });

    it('should be able to render correct', () => {
        render(
            <SideBar/>
        )

        expect(screen.getByText('Medical Test')).toBeInTheDocument;
        expect(screen.getByText('Select a Patient')).toBeInTheDocument;

    });

    it('should be able to display a list of patients', () => {
        render(
            <SideBar/>
        )
        
        expect(screen.getByText('Luziane Teste 1')).toBeInTheDocument;
        expect(screen.getByText('Luziane Teste 2')).toBeInTheDocument;
    });
});