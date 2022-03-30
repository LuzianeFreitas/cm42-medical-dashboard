import { Container } from "./styles"; 
import History from "../../components/History";

const Home = (): JSX.Element => {
    return(
        <Container>
            <h3>
                Dashboard
            </h3>
            
            <History/>
        </Container>
    );
};

export default Home;