import { useRouter } from "./utils/use-router";
import { useApiConfig } from "./hooks/use-api-config";
import { useEndpointExplorer } from "./hooks/use-endpoint-explorer";
import { Layout } from "./components/Layout";
import { ApiKeyBanner } from "./components/ApiKeyBanner";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { ErrorsPage } from "./pages/ErrorsPage";
import { ConstantsPage } from "./pages/ConstantsPage";
import { RightPanelContent } from "./pages/ResourcePage";
import { ResourcePageContent } from "./pages/ResourcePageContent";
import { getResource } from "./data/resources";

export default function App() {
  const { path, navigate } = useRouter();
  const { apiKey, baseUrl, handleSaveConfig } = useApiConfig();
  const explorer = useEndpointExplorer(path);

  const pathSegment = path.replace(/^\//, "").split("/")[0];
  const isSpecialPage = ["", "authentication", "errors", "constants"].includes(
    pathSegment,
  );
  const resource =
    !isSpecialPage && pathSegment ? getResource(pathSegment) : null;

  const rightPanel = explorer.activeEndpoint ? (
    <RightPanelContent
      endpoint={explorer.activeEndpoint}
      apiKey={apiKey}
      baseUrl={baseUrl}
      showExplorer={explorer.showExplorer}
      setShowExplorer={explorer.setShowExplorer}
      pathValues={explorer.pathValues}
      queryValues={explorer.queryValues}
      bodyValues={explorer.bodyValues}
      onPathChange={explorer.onPathChange}
      onQueryChange={explorer.onQueryChange}
      onBodyChange={explorer.onBodyChange}
    />
  ) : undefined;

  const renderPage = () => {
    if (!pathSegment || pathSegment === "") return <HomePage />;
    if (pathSegment === "authentication") return <AuthPage />;
    if (pathSegment === "errors") return <ErrorsPage />;
    if (pathSegment === "constants") return <ConstantsPage />;
    if (resource) {
      return (
        <ResourcePageContent
          key={resource.id}
          resource={resource}
          onEndpointFocus={explorer.handleEndpointFocus}
        />
      );
    }
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
  };

  return (
    <>
      <Layout currentPath={path} rightPanel={rightPanel} navigate={navigate}>
        {renderPage()}
      </Layout>
      <ApiKeyBanner
        apiKey={apiKey}
        baseUrl={baseUrl}
        onSave={handleSaveConfig}
      />
    </>
  );
}
