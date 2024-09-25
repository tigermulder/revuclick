import { Navigate, Route, Routes as ReactRouterRoutes } from "react-router-dom";

export const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/a" element="" />
      <Route path="/b" element="" />
      <Route path="*" element={<Navigate replace to="/" />} />
    </ReactRouterRoutes>
  );
};
