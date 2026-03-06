import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AppLayout from "./components/layout/AppLayout.tsx";
// import ProtectedRoute from "./components/layout/ProtectedRoutes.tsx";

import Landing from "./pages/Landing.tsx";
// import Auth from "./pages/Auth.tsx";
import Home from "./pages/secure/Home.tsx";
// import Services from "./pages/Services.tsx";
// import About from "./pages/About.tsx";
import Error from "./pages/Error.tsx";

// import Login from "./components/features/Login.tsx";
// import Signup from "./components/features/Signup.tsx";
import Dashboard from "./components/features/Dashboard.tsx";
import Transactions from "./components/features/Transactions.tsx";
import Budget from "./components/features/Budget.tsx";
// import Income from "./components/features/Income.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budgets" element={<Budget />} />
          </Route>

          {/* Protected Routes */}
          {/* <Route element={<ProtectedRoute />}>
            <Route path="home" element={<Home />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="income" element={<Income />} />
            </Route>
          </Route> */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
