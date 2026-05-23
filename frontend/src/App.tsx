import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./components/layouts/AppLayout.tsx";
import ProtectedRoute from "./components/layouts/ProtectedLayout.tsx";

import Landing from "./pages/Landing.tsx";
import Home from "./pages/secure/Home.tsx";
import Error from "./pages/Error.tsx";

import Dashboard from "./components/features/Dashboard.tsx";
import Transactions from "./components/features/Transactions.tsx";
import Budget from "./components/features/Budget.tsx";
import Split from "./components/features/Split.tsx";
import Login from "./components/features/Login.tsx";
import Register from "./components/features/Register.tsx";

import { Toaster } from "react-hot-toast";
import About from "./pages/About.tsx";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Route */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />}>
                <Route index element={<Navigate to="dashboard" replace />} />

                <Route path="dashboard" element={<Dashboard />} />

                <Route path="transactions" element={<Transactions />} />

                <Route path="budget" element={<Budget />} />

                <Route path="split" element={<Split />} />
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Route>
        </Routes>

        <Toaster position="bottom-center" />

        <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
