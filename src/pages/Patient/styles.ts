import styled from 'styled-components';

export const Container = styled.div`
    color: var(--black);
    padding: 1.5rem;
    width: 100%;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 3rem;
`;

export const InfoPatient = styled.section`
    background: var(--white);
    width: 100%;

    border-radius: 5px;
    padding: 1rem;
    box-shadow: -1px -1px 5px 0px rgba(0,0,0,0.1);

    height: auto;

    margin-right: 0.5rem;
`;

export const Title = styled.h2`
    margin-top: 1rem;
    margin-bottom: 0.2rem;
`;

export const Informacao = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 14px;
`;