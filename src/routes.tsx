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
const CommunityDetail = lazy(() => import("./pages/CommunityDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Stories = lazy(() => import("./pages/Stories"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const MentalGPT = lazy(() => import("./pages/MentalGPT"));
const AboutUs = lazy(() => import("./pages/about"));

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
    path: "/about",
    element: (
      <SuspenseWrapper>
        <AboutUs />
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
    path: "/communities/:id",
    element: (
      <SuspenseWrapper>
        <CommunityDetail />
      </SuspenseWrapper>
    ),
  },

  {
    path: "/stories",
    element: (
      <SuspenseWrapper>
        <Stories />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/profile",
    element: (
      <SuspenseWrapper>
        <Profile />
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
