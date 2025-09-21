import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Verify from "./components/pages/Verify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./lib/AppContext";
import Home from "./components/pages/Home";
import AuthRequiredRoute from "./components/middlewares/AuthRequiredRoute";
import AuthNotRequiredRoute from "./components/middlewares/AuthNotRequiredRoute";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <AuthRequiredRoute>
                    <Routes>
                      <Route path="/" element={<Home />} />
                    </Routes>
                  </AuthRequiredRoute>
                }
              />
              <Route
                path="/auth/*"
                element={
                  <AuthNotRequiredRoute>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/verify/:id" element={<Verify />} />
                    </Routes>
                  </AuthNotRequiredRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
