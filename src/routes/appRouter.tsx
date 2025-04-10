import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/ui/Header/Header";
import { TareaScreen } from "../components/Screens/TareaScreen";
import { SprintsScreen } from "../components/Screens/SprintsScreen";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/TareaScreen" />} />
        <Route path="/TareaScreen" element={<TareaScreen />} />
        <Route path="/sprint/:id" element={<SprintsScreen />} />
      </Routes>
    </>
  );
};
