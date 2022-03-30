import { Routes ,Route } from "react-router-dom";

import Patient from './pages/Patient';
import Home from "./pages/Home";

const RoutesMedical = (): JSX.Element => {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/patient/:id" element={<Patient/>} />
      </Routes>
  );
};

export default RoutesMedical;