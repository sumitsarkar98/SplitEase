import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./components/layouts/AppLayout.tsx";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="budget" element={<Budget />} />
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
