import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/protected-route';
import { DashboardLayout } from './layouts/dashboard-layout';
import { CakeCategoriesPage } from './pages/cake-categories-page';
import { CakesPage } from './pages/cakes-page';
import { ContentManagementPage } from './pages/content-page';
import { DashboardPage } from './pages/dashboard-page';
import { LoginPage } from './pages/login-page';
import { MediaPage } from './pages/media-page';
import { OrdersPage } from './pages/orders-page';
import { ProfilePage } from './pages/profile-page';
import { ResourcePage } from './pages/resource-page';
import { SettingsPage } from './pages/settings-page';

const resourcePages = [
  ['events', 'Events', 'Manage celebrations and special occasions.'], ['gallery', 'Gallery', 'Curate your finest cake photography.'], ['testimonials', 'Testimonials', 'Share words from delighted customers.'], ['faqs', 'FAQs', 'Keep customer questions answered.'], ['messages', 'Messages', 'Review customer enquiries and requests.'],
] as const;

export function App(): React.JSX.Element {
  return <Routes><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}><Route index element={<DashboardPage />} /><Route path="cakes" element={<CakesPage />} /><Route path="cakes/categories" element={<CakeCategoriesPage />} /><Route path="orders" element={<OrdersPage />} /><Route path="content" element={<ContentManagementPage />} />{resourcePages.map(([path, title, description]) => <Route key={path} path={path} element={<ResourcePage title={title} description={description} />} />)}<Route path="media" element={<MediaPage />} /><Route path="settings" element={<SettingsPage />} /><Route path="profile" element={<ProfilePage />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
