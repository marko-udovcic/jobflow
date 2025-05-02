import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./pages/Login.jsx"));
const AccountTypeChooser = lazy(() => import("./pages/AccountTypeChooser.jsx"));
const WorkerProfile = lazy(() => import("./pages/WorkerProfile.jsx"));
const EmployerProfile = lazy(() => import("./pages/EmployerProfile.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const PostJob = lazy(() => import("./pages/PostJob.jsx"));
const Applications = lazy(() => import("./pages/Applications.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ExploreJobs = lazy(() => import("./pages/ExploreJobs.jsx"));
const JobPostDetails = lazy(() => import("./pages/JobPostDetails.jsx"));
const UpdateCv = lazy(() => import("./pages/UpdateCv.jsx"));
const EmailVerification = lazy(() => import("./pages/EmailVerification.jsx"));

// Helper function to wrap components in Suspense
const withSuspense = (Component) => <Suspense fallback={<LoadingSpinner />}>{Component}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute
            element={<MainLayout />}
            requireAuth={true}
            allowedRoles={["WORKER", "EMPLOYER", "ADMIN"]}
          />
        ),
        children: [
          {
            path: "/worker/profile/:id?",
            element: withSuspense(<WorkerProfile />),
          },
          {
            path: "/employer/profile/:id?",
            element: withSuspense(<EmployerProfile />),
          },
          {
            path: "/admin/dashboard",
            element: withSuspense(<AdminDashboard />),
          },
          {
            path: "/employer/post-job",
            element: (
              <ProtectedRoute element={withSuspense(<PostJob />)} allowedRoles={["EMPLOYER"]} />
            ),
          },
          {
            path: "/applications",
            element: (
              <ProtectedRoute
                element={withSuspense(<Applications />)}
                allowedRoles={["EMPLOYER", "WORKER"]}
              />
            ),
          },
          {
            path: "/explore-jobs",
            element: withSuspense(<ExploreJobs />),
          },
          {
            path: "/job-post-details/:id",
            element: withSuspense(<JobPostDetails />),
          },
          {
            path: "/worker/update-cv/:workerId?",
            element: (
              <ProtectedRoute element={withSuspense(<UpdateCv />)} allowedRoles={["WORKER"]} />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/register/:roleName",
    element: withSuspense(<Register />),
  },
  {
    path: "/account-type",
    element: withSuspense(<AccountTypeChooser />),
  },
  {
    path: "/verify-email",
    element: withSuspense(<EmailVerification />),
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
);
