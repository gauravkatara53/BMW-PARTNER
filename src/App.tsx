import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Screen/Home Pages/Before Logged/index";
import HomeLogged from "./Screen/Home Pages/After Logged/index";
// import ProtectedRoute from "./components/Common/ProtectedRoute";
import SignIn from "./Screen/Auth/SignIn/Signin";
import SignUp from "./Screen/Auth/SignUp/SignUp";
import { useAuth } from "./components/Common/AuthContext";
import PartnerProfilePage from "./Screen/Profile/Profile";
import WarehouseProfile from "./Screen/Warehouse/WarehousePage";
import PricingPage from "./Screen/Pricing/Pricing";
import SupportPage from "./Screen/Support-page/support-page";
import HowItWorks from "./Screen/HowItWork/HowItWorks";
import BankAccountPage from "./Screen/BankAccount/bankaccount";

export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
        <Routes>
          {isAuthenticated ? (
            <Route path="/" element={<HomeLogged />} />
          ) : (
            <Route path="/" element={<Home />} />
          )}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<PartnerProfilePage />} />

          {/* warehouse profile page  */}
          <Route
            path="/warehouse-profile/:warehouseId"
            element={<WarehouseProfile />}
          />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/bank-account" element={<BankAccountPage />} />
        </Routes>
      </Router>
    </>
  );
}
