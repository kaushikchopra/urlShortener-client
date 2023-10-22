import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UrlShortener from "./components/pages/UrlShortener";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import ResetActivation from "./components/authentication/ResendActivation";
import ActivationSuccess from "./components/authentication/ActivationSuccess";
import RequireAuth from "./components/authentication/RequireAuth";
import Missing from "./components/pages/Missing";
import Layout from "./components/authentication/Layout";
import CreatedUrls from "./components/pages/CreatedUrls";
import PersistLogin from "./components/authentication/PersistLogin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="activation/:token" element={<ActivationSuccess />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="resend-activation" element={<ResetActivation />} />

          {/* Protected routes */}
          <Route element={<PersistLogin />} >
            <Route element={<RequireAuth />}>
              <Route path="/" element={<UrlShortener />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="created-urls" element={<CreatedUrls />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
