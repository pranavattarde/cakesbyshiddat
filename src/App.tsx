import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { useSettings } from './hooks/useSettings';

function App() {
  const { isLoading: settingsLoading, error } = useSettings();

  if (settingsLoading) {
    return <Loader />;
  }

  if (error) return <main className="grid min-h-screen place-items-center p-6 text-center text-[#3a2d28]">We couldn’t load the website content. Please refresh and try again.</main>;

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
