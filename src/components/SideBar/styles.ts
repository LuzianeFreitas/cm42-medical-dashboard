import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.nav`
    color: var(--black);
    background-color: var(--white);
    padding: 1.5rem;
    width: 20%;
    height: 100vh;
    box-shadow: 9px 10px 10px -10px rgba(0,0,0,0.4);

    display: flex;
    flex-direction: column;

    @media(max-width: 768px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 80px;
        width: 100%;
    }
    
`;

export const LinkPatient = styled(Link)`
    margin-top: 1rem;

    @media(max-width: 768px) {
        margin-top: 0;
    }
`;

