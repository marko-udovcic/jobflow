import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import ProtectedRoute from "./features/auth/components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import AccountTypeChooser from "./pages/AccountTypeChooser.jsx";
import LoadingSpinner from "./components/ui/LoadingSpinner.jsx";

const WorkerProfile = lazy(() => import("./pages/WorkerProfile.jsx"));
const EmployerProfile = lazy(() => import("./pages/EmployerProfile.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const PostJob = lazy(() => import("./pages/PostJob.jsx"));
const Applications = lazy(() => import("./pages/Applications.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ExploreJobs = lazy(() => import("./pages/ExploreJobs.jsx"));
const JobPostDetails = lazy(() => import("./pages/JobPostDetails.jsx"));
const UpdateCv = lazy(() => import("./pages/UpdateCv.jsx"));

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
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <WorkerProfile />
              </Suspense>
            ),
          },
          {
            path: "/employer/profile/:id?",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <EmployerProfile />
              </Suspense>
            ),
          },
          {
            path: "/admin/dashboard",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <AdminDashboard />
              </Suspense>
            ),
          },
          {
            path: "/employer/post-job",
            element: (
              <ProtectedRoute
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <PostJob />
                  </Suspense>
                }
                allowedRoles={["EMPLOYER"]}
              />
            ),
          },
          {
            path: "/applications",
            element: (
              <ProtectedRoute
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <Applications />
                  </Suspense>
                }
                allowedRoles={["EMPLOYER", "WORKER"]}
              />
            ),
          },
          {
            path: "/explore-jobs",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <ExploreJobs />
              </Suspense>
            ),
          },
          {
            path: "/job-post-details/:id",
            element: (
              <Suspense fallback={<LoadingSpinner />}>
                <JobPostDetails />
              </Suspense>
            ),
          },
          {
            path: "/worker/update-cv/:workerId?",
            element: (
              <ProtectedRoute
                element={
                  <Suspense fallback={<LoadingSpinner />}>
                    <UpdateCv />
                  </Suspense>
                }
                allowedRoles={["WORKER"]}
              />
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/:roleName",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Register />
      </Suspense>
    ),
  },
  {
    path: "/account-type",
    element: <AccountTypeChooser />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
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
