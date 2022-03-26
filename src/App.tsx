import { SideBar } from './components/SideBar';
import { Content } from  './components/Content';

import './styles/global.css';

function App() {
  return (
    <div  style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar/>
      <Content/>
    </div>
  );
}

export default App;
