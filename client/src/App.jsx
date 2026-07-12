import { Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import SignUpContainer from "./pages/signUp/SignUpContainer";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer/>} />
      <Route path="/signup" element={<SignUpContainer/>} />
    </Routes>
  );
}

export default App;
