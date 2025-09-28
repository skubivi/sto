import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UrlRoutes } from './services/routes/url-routes.ts'
import LoginPage from './pages/login-page/login-page.tsx'
import ProtectedRoute from './components/protected-route/protected-route.tsx'
import { Provider } from 'react-redux'
import store from './services/store.ts'
import RoleRoute from './components/role-route/role-route.tsx'
import ReceptionistPage from './pages/receptionist-page/receptionist-page.tsx'
import Template from './components/template/template.tsx'
import AdminProtectedRoute from './components/admin-protected-route/admin-protected-route.tsx'
import AdminPage from './pages/admin-page/admin-page.tsx'
import AdminDocumentsPage from './pages/admin-documents-page/admin-documents-page.tsx'
import AdminAnalyticsPage from './pages/admin-analytics-page/admin-analytics-page.tsx'
import AdminFilialPage from './pages/admin-filial-page/admin-filial-page.tsx'
import AdminPersonalPage from './pages/admin-personal-page/admin-personal-page.tsx'
import SettingsPage from './pages/settings-page/settings-page.tsx'
import FullAdminProtectedRoute from './components/full-admin-protected-route/full-admin-protected-route.tsx'
import ReceptionistProtectedRoute from './components/receptionist-protected-route/receptionist-protected-route.tsx'
import ReceptionistDocumentPage from './pages/receptionist-documents-page/receptionist-documents-page.tsx'
import ReceptionistCarsPage from './pages/receptionist-cars-page/receptionist-cars-page.tsx'

const router = createBrowserRouter([
  {
    path: UrlRoutes.Base,
    element: <ProtectedRoute />,
    children: [
      {
        path: UrlRoutes.Base,
        element: <RoleRoute />,
      }
    ]
  },
  {
    path: UrlRoutes.Login,
    element: <LoginPage />
  },
  {
    path: UrlRoutes.Cabinet,
    element: <Template />,
    children: [
      {
        path: UrlRoutes.Admin,
        element: <AdminProtectedRoute />,
        children: [{
          path: UrlRoutes.Admin,
          element: <AdminPage />,
          children: [
            {
              path: UrlRoutes.AdminDocuments,
              element: <AdminDocumentsPage />
            },
            {
              path: UrlRoutes.AdminAnalytics,
              element: <AdminAnalyticsPage />
            },
            {
              path: UrlRoutes.AdminFilials,
              element: <FullAdminProtectedRoute />,
              children: [{
                path: UrlRoutes.AdminFilials,
                element: <AdminFilialPage />
              }]
            },
            {
              path: UrlRoutes.AdminPersonal,
              element: <AdminPersonalPage />
            },
            {
              path: UrlRoutes.AdminSettings,
              element: <SettingsPage />
            },
          ]
        }]
      },
      {
        path: UrlRoutes.Receptionist,
        element: <ReceptionistProtectedRoute />,
        children: [{
          path: UrlRoutes.Receptionist,
          element: <ReceptionistPage />,
          children: [
            {
              path: UrlRoutes.ReceptionistDocuments,
              element: <ReceptionistDocumentPage />
            },
            {
              path: UrlRoutes.ReceptionistCars,
              element: <ReceptionistCarsPage />
            },
            {
              path: UrlRoutes.ReceptionistSettings,
              element: <SettingsPage />
            }
          ]
        }]
      }
    ]
  },
])

const root = createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  // <Suspense fallback={<Loader sx={loaderStyles} />}>
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  // </Suspense>
);
