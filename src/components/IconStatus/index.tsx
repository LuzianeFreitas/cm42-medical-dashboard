import { Status } from "../../types";

interface Props {
    status: string;
}

const IconStatus = ({status}: Props) => {
    
    const modelIcon = {
        borderRadius: '5px',
        padding: '5px'
    }

    const absent = {
        background: 'var(--absent)',
    }

    const completed = {
        background: 'var(--completed)',
    }

    const cancelled = {
        background: 'var(--cancelled)',
    }

    const pending = {
        background: 'var(--pending)',
    }
    
    if(status === Status[0]) {
        return (
            <span style={{...pending,...modelIcon}}>{status}</span>
        );
    }

    if(status === Status[1]) {
        return (
            <span style={{...completed,...modelIcon}}>{status}</span>
        );
    }

    if(status === Status[2]) {
        return (
            <span style={{...cancelled,...modelIcon}}>{status}</span>
        );
    }

    if(status === Status[3]) {
        return (
            <span style={{...absent,...modelIcon}}>{status}</span>
        );
    }

    return (
        <span style={{...modelIcon}}>
            {status}
        </span>
    );
};

export default IconStatus;