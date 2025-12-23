import NotFound from "../pages/OtherPage/NotFound";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout.jsx";
import {publicRoutes,privateRoutes} from "./Routes/RoutesConfig.jsx";
import { PrivateRoute } from "./Routes/PrivateRoute.jsx";
import AuthorizedRoutes from "./AuthorizedRoutes.jsx";

const Routing = () => {
  const location = useLocation();
// console.log(routes)
  return (
    <>
      <ScrollToTop />
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
          {publicRoutes.map(({ path, component }) => (
            <Route 
              key={path} 
              path={path} 
              element={component} 
            />
          ))}
        <Route path="/" element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }>
            {/* <Route index  element={<Home />} /> */}
            {privateRoutes.map(({path,component,roles}) =>(
              <Route key={path} path={path} 
                element={
                 <AuthorizedRoutes roles={roles}> 
                  {component}
                </AuthorizedRoutes>
                }
              />
            ))}
            
        </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        {/* Catch invalid routes */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </>
  );
};

export default Routing;