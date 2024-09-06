import { createRoutesFromElements, Route } from "react-router-dom";

import CategoriesPage from "@/pages/categories-page/CategoriesPage";
import AllItemsPage from "@/pages/items/all-items-page/AllItemsPage";
import NotFoundPage from "@/pages/notFound-page/NotFoundPage";
import EndpointsPage from "@/pages/endpoints-page/EndpointsPage";
import LoginPage from "@/pages/login-page/LoginPage";
import ItemPage from "@/pages/items/item-page/ItemPage";
import Layout from "@/components/layout/Layout";
import PersistentLogin from "@/components/PersistentLogin";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import SettingsPage from "@/pages/settings-page/SettingsPage";


const routes = createRoutesFromElements(
  <Route element={<PersistentLogin />}>
    <Route element={<ProtectedRoutes />}>
      <Route path="/" element={<Layout />}>
        <Route path="endpoints" element={<EndpointsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="items" element={<AllItemsPage />} />
        <Route path="items/:itemId" element={<ItemPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
    <Route path="/login" element={<LoginPage />} />
  </Route>
);

export default routes;