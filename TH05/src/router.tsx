// src/router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/common/Layout';
import ClubListPage from './pages/ClubListPage';
import RegistrationPage from './pages/RegistrationPage';
import MemberPage from './pages/MemberPage';
import ReportPage from './pages/ReportPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ClubListPage /> },
      { path: 'registrations', element: <RegistrationPage /> },
      { path: 'members', element: <MemberPage /> },
      { path: 'reports', element: <ReportPage /> },
    ],
  },
]);

export default router;