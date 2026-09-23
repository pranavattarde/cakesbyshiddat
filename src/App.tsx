import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { SiteContentProvider } from "./contexts/SiteContentContext";
import { AdminAuthProvider } from "./pages/AdminPanel/AdminAuthContext";

function App() {
  return (
    <SiteContentProvider>
      <AdminAuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AdminAuthProvider>
    </SiteContentProvider>
  );
}

export default App;
