import { Navigate, Route, Routes } from "react-router-dom";
import LoginContainer from "./pages/login/LoginContainer";
import SignUpContainer from "./pages/signUp/SignUpContainer";
import UserProductContainer from "./pages/user/UserProductContainer";
import UserStockContainer from "./pages/user/UserStockContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdjustStockContainer from "./pages/admin/stockAdjust/AdjustStockContainer";
import DashBoard from "./pages/admin/DashBoard";
import CreateProductContainer from "./pages/admin/product/CreateProductContainer";
import CreateStoreContainer from "./pages/admin/store/CreateStoreContainer";
import TransferStockContainer from "./pages/admin/stockTransfer/TransferStockContainer";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignUpContainer />} />
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SHOPPER"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/products" element={<UserProductContainer />} />
        <Route path="/products/:productId" element={<UserStockContainer />} />
      </Route>
      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/" element={<DashBoard />} />
        <Route path="/admin/stock/adjust" element={<AdjustStockContainer />} />
        <Route path="/admin/stock/transfer" element={<TransferStockContainer />} />
        <Route
          path="/admin/product/create"
          element={<CreateProductContainer />}
        />
        <Route
          path="/admin/store/create"
          element={<CreateStoreContainer />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
