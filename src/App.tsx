import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { useApiConfig } from "./hooks/use-api-config";
import { useEndpointExplorer } from "./hooks/use-endpoint-explorer";
import { useRouter } from "./utils/use-router";
import { Layout } from "./components/Layout";
import { ApiKeyBanner } from "./components/ApiKeyBanner";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { ErrorsPage } from "./pages/ErrorsPage";
import { ConstantsPage } from "./pages/ConstantsPage";
import { RightPanelContent } from "./pages/ResourcePage";
import { ResourcePageContent } from "./pages/ResourcePageContent";
import { getResource } from "./data/resources";

type ExplorerState = ReturnType<typeof useEndpointExplorer>;

function ResourceRoute({ explorer }: { explorer: ExplorerState }) {
  const { resourceId } = useParams<{ resourceId: string }>();
  const resource = resourceId ? getResource(resourceId) : undefined;
  if (!resource) return <NotFoundPage />;
  return (
    <ResourcePageContent
      key={resource.id}
      resource={resource}
      onEndpointFocus={explorer.handleEndpointFocus}
    />
  );
}

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="text-center py-20">
      <p className="text-5xl font-bold text-ink-tertiary mb-4">404</p>
      <p className="t-body-sm mb-4">Page not found.</p>
      <button
        onClick={() => navigate("/")}
        className="text-accent-ink hover:underline text-sm"
      >
        Back to home →
      </button>
    </div>
  );
}

export default function App() {
  const { path } = useRouter();
  const { apiKey, baseUrl, handleSaveConfig } = useApiConfig();
  const explorer = useEndpointExplorer(path);

  const rightPanel = explorer.activeEndpoint ? (
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
          <Route path="/" element={<HomePage />} />
          <Route path="/authentication" element={<AuthPage />} />
          <Route path="/errors" element={<ErrorsPage />} />
          <Route path="/constants" element={<ConstantsPage />} />
          <Route
            path="/:resourceId"
            element={<ResourceRoute explorer={explorer} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <ApiKeyBanner
        apiKey={apiKey}
        baseUrl={baseUrl}
        onSave={handleSaveConfig}
      />
    </>
  );
}
