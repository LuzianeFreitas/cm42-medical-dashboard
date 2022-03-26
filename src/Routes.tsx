import { Routes ,Route } from "react-router-dom";

import Patient from './pages/Patient';

const RoutesMedical = (): JSX.Element => {
  return (
      <Routes>
        <Route path="/patient/:id" element={<Patient/>} />
      </Routes>
  );
};

export default RoutesMedical;