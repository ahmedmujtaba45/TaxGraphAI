import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import AdminLogin from "../pages/admin-login/page";
import Dashboard from "../pages/dashboard/page";
import EntityResolution from "../pages/entity-resolution/page";
import KnowledgeGraph from "../pages/knowledge-graph/page";
import RiskScoring from "../pages/risk-scoring/page";
import AuditReports from "../pages/audit-reports/page";
import DataSources from "../pages/data-sources/page";
import Analytics from "../pages/analytics/page";
import Settings from "../pages/settings/page";
import KnowledgeBase from "../pages/knowledge-base/page";
import VideoTutorials from "../pages/video-tutorials/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/entity-resolution",
    element: <EntityResolution />,
  },
  {
    path: "/knowledge-graph",
    element: <KnowledgeGraph />,
  },
  {
    path: "/risk-scoring",
    element: <RiskScoring />,
  },
  {
    path: "/audit-reports",
    element: <AuditReports />,
  },
  {
    path: "/data-sources",
    element: <DataSources />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/knowledge-base",
    element: <KnowledgeBase />,
  },
  {
    path: "/video-tutorials",
    element: <VideoTutorials />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;