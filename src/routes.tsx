// routes.tsx
import { RouteObject } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";
import { PrivateRoute } from "./auth/PrivateRoute";
import { AuthRoute } from "./auth/AuthRoute";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface SuspenseWrapperProps {
  children: ReactNode;
}

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => (
  <Suspense fallback={<LoadingSpinner fullPage />}>{children}</Suspense>
);

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const Communities = lazy(() => import("./pages/Communities"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const MentalGPT = lazy(() => import("./pages/MentalGPT"));

export const routes: RouteObject[] = [
  // Auth pages
  {
    path: "/login",
    element: (
      <AuthRoute>
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <SuspenseWrapper>
          <Signup />
        </SuspenseWrapper>
      </AuthRoute>
    ),
  },

  // Public pages
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <Index />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/communities",
    element: (
      <SuspenseWrapper>
        <Communities />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/MentalGPT",
    element: (
      <SuspenseWrapper>
        <MentalGPT />
      </SuspenseWrapper>
    ),
  },

  // 404
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <NotFound />
      </SuspenseWrapper>
    ),
  },
];
