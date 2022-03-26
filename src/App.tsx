import { BrowserRouter } from 'react-router-dom';
import RoutesMedical from './Routes';
import SideBar from './components/SideBar';
import { ScheduleProvider } from './hooks/useSchedule';
import GlobalStyles from './styles/global';
import {Container} from './styles/app';


const App = (): JSX.Element => {

  return (
    <BrowserRouter>
      <ScheduleProvider>
        <GlobalStyles/>
        <Container>
          <SideBar/>
          <>
            <RoutesMedical/>
          </>
        </Container>
      </ScheduleProvider>
    </BrowserRouter>
  );
}

export default App;
