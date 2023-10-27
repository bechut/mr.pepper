import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { routes } from './routes';
import { Fragment } from 'react';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => (
          <Fragment key={index}>
            <Route path={'/*'} element={<Navigate to="/en/" />} />
            <Route path={'/en/' + route.path} element={route.element} />
            <Route
              key={index}
              path={'/en/' + route.path}
              element={route.element}
            />
          </Fragment>
        ))}
      </Routes>
    </BrowserRouter>
  );
};
export default Routers;
