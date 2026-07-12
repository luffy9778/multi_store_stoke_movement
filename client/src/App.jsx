import { Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import SignUpContainer from "./pages/signUp/SignUpContainer";
import UserProductContainer from "./pages/user/UserProductContainer";
import UserStockContainer from "./pages/user/UserStockContainer";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignUpContainer />} />
      <Route path="/products" element={<UserProductContainer />} />
      <Route path="/products/:productId" element={<UserStockContainer />} />
    </Routes>
  );
}

export default App;
