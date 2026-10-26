import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { useApiConfig } from "./hooks/use-api-config";
import { useEndpointExplorer } from "./hooks/use-endpoint-explorer";
import { useRouter } from "./utils/use-router";
import { apiPage, apiPath } from "./utils/paths";
import { Layout } from "./components/Layout";
import { SiteLayout } from "./components/SiteLayout";
import { NotFound } from "./components/NotFound";
import { ApiKeyBanner } from "./components/ApiKeyBanner";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { ErrorsPage } from "./pages/ErrorsPage";
import { LandingPage } from "./pages/LandingPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { RightPanelContent } from "./pages/ResourcePage";
import { ResourcePageContent } from "./pages/ResourcePageContent";
import { getResource } from "./data/resources";

type ExplorerState = ReturnType<typeof useEndpointExplorer>;

/** Pages that lived at the root before the API reference moved to /api. */
const LEGACY_PAGES = ["authentication", "errors"];

function ResourceRoute({ explorer }: { explorer: ExplorerState }) {
  const { resourceId } = useParams<{ resourceId: string }>();
  const resource = resourceId ? getResource(resourceId) : undefined;
  if (!resource) return <NotFound />;
  return (
    <ResourcePageContent
      key={resource.id}
      resource={resource}
      onEndpointFocus={explorer.handleEndpointFocus}
    />
  );
}

/** The API reference: sidebar, pages and the request explorer, under /api. */
function ApiDocs() {
  const { path } = useRouter();
  const { apiKey, baseUrl, handleSaveConfig } = useApiConfig();
  const explorer = useEndpointExplorer(path);

  const isWebhooksPage = apiPage(path).startsWith("webhook-events");
  const rightPanel = explorer.activeEndpoint && !isWebhooksPage ? (
    <RightPanelContent
      endpoint={explorer.activeEndpoint}
      apiKey={apiKey}
      baseUrl={baseUrl}
      showExplorer={explorer.showExplorer}
      setShowExplorer={explorer.setShowExplorer}
    />
  ) : undefined;

  return (
    <>
      <Layout currentPath={path} rightPanel={rightPanel}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="authentication" element={<AuthPage />} />
          <Route path="errors" element={<ErrorsPage />} />
          <Route path=":resourceId" element={<ResourceRoute explorer={explorer} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <ApiKeyBanner apiKey={apiKey} baseUrl={baseUrl} onSave={handleSaveConfig} />
    </>
  );
}

/**
 * Links shared before the move (/orders, /authentication#api-keys) still
 * work: they're sent on to the same page under /api, anchor included.
 * Anything else is a 404.
 */
function LegacyRedirect() {
  const { pathname, search, hash } = useLocation();
  const [first] = pathname.replace(/^\//, "").split("/");

  if (first && (LEGACY_PAGES.includes(first) || getResource(first))) {
    return <Navigate to={`${apiPath(pathname)}${search}${hash}`} replace />;
  }

  return <NotFound />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/api/*" element={<ApiDocs />} />
      <Route element={<SiteLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="blogs" element={<BlogPage />} />
        <Route path="blogs/:slug" element={<BlogPostPage />} />
        <Route path="*" element={<LegacyRedirect />} />
      </Route>
    </Routes>
  );
}
