import styled from 'styled-components';

export const Container = styled.div`
    color: var(--black);
    padding: 1.5rem;
    width: 100%;
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 3rem;

    @media(max-width: 768px) {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1.5rem;
    }
`;

export const InfoPatient = styled.section`
    background: var(--white);
    width: 100%;

    border-radius: 5px;
    padding: 1rem;
    box-shadow: -1px -1px 5px 0px rgba(0,0,0,0.1);

    height: auto;

    margin-right: 0.5rem;

    @media(max-width: 768px) {
        margin-right: 0;
        margin-bottom: 0.5rem;
        width: 100%;
    }
`;

export const Title = styled.h2`
    margin-top: 1rem;
    margin-bottom: 0.2rem;
    font-size: 1.5rem;

    @media(max-width: 768px) {
        font-size: 1.4rem;
    }
`;

export const Informacao = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 14px;
`;

export const Detail = styled.main`
    margin-top: 1.5rem;
`;