import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import SideBar from '.'

jest.mock('react-router-dom', () => {
    return {
        Link: ({ children }: { children: ReactNode }) => children,
    }
})


describe('SideBar component', () => {
    it('should be able to render corret', () => {
        const { getByText } = render(
            <SideBar/>
        )

        expect(getByText('Medical Test')).toBeInTheDocument;
        expect(getByText('Select a Patient')).toBeInTheDocument;
        
    });
});