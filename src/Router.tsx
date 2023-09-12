import { Route, Routes } from "react-router-dom";
// import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RouterLayout } from "./pages/RouterLayout";
import { HomePage } from "./pages/HomePage";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
