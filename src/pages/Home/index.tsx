import { Container } from "./styles"; 
import History from "../../components/History";
import Calendar from "../../components/Calendar";

const Home = (): JSX.Element => {
    return(
        <Container>
            <h3>
                Dashboard
            </h3>
            <Calendar/>
            <History/>
        </Container>
    );
};

export default Home;