import { Route, Routes } from "react-router-dom";
import {
  ClientPage,
  LoginPage,
  DashboardPage,
  HomePage,
  RouterLayout,
} from "./pages/";
import { PrivateRoute } from "./pages/PrivateRoute";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/:id" element={<ClientPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
