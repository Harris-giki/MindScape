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
const Safety = lazy(() => import("./pages/Safety"));
const Health = lazy(() => import("./pages/Health"));
const Rights = lazy(() => import("./pages/Rights"));
const CommunityDetail = lazy(() => import("./pages/CommunityDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Family = lazy(() => import("./pages/Family"));
const Stories = lazy(() => import("./pages/Stories"));
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const LostFound = lazy(() => import("./pages/LostFound"));
const ChatbotPage = lazy(() => import("./pages/ChatbotPage"));
const Profile = lazy(() => import("./pages/Profile"));
const BaitulMaal = lazy(() => import("./pages/BaitulMaal"));
const MentalGPT = lazy(() => import("./pages/MentalGPT"));
const AboutUs = lazy(() => import("./pages/about"));
const Muhafiz = lazy(() => import("./pages/Muhafiz"));

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
    path: "/ChatbotPage",
    element: (
      <SuspenseWrapper>
        <ChatbotPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/Muhafiz",
    element: (
      <SuspenseWrapper>
        <Muhafiz />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/BaitulMaal",
    element: (
      <SuspenseWrapper>
        <BaitulMaal />
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
    path: "/LostFound",
    element: (
      <SuspenseWrapper>
        <LostFound />
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
    path: "/health",
    element: (
      <SuspenseWrapper>
        <Health />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/rights",
    element: (
      <SuspenseWrapper>
        <Rights />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/family",
    element: (
      <SuspenseWrapper>
        <Family />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/safety",
    element: (
      <SuspenseWrapper>
        <Safety />
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
