import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WorkerProfile from "./pages/WorkerProfile.jsx";
import EmployerProfile from "./pages/EmployerProfile.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PostJob from "./pages/PostJob.jsx";
import Applications from "./pages/Applications.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AccountTypeChooser from "./pages/AccountTypeChooser.jsx";
import ExploreJobs from "./pages/ExploreJobs.jsx";
import JobPostDetails from "./pages/JobPostDetails.jsx";
import UpdateCv from "./pages/UpdateCv.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import MainLayout from "./pages/MainLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/worker/profile/:id?",
            element: <WorkerProfile />,
          },
          {
            path: "/employer/profile/:id?",
            element: <EmployerProfile />,
          },
          {
            path: "/admin/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "/employer/post-job",
            element: <PostJob />,
          },
          {
            path: "/applications",
            element: <Applications />,
          },
          {
            path: "/explore-jobs",
            element: <ExploreJobs />,
          },
          {
            path: "/job-post-details/:id",
            element: <JobPostDetails />,
          },
          {
            path: "/worker/update-cv",
            element: <UpdateCv />,
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
    element: <Register />,
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
