import CommonComponent from './common';

import sample from '../app/pages/sample/route';

export const routes = [sample].map((route) => {
  const Elem = route.element;
  return {
    ...route,
    path: ':locale/' + route.path,
    element: (
      <CommonComponent>
        <Elem />
      </CommonComponent>
    ),
  };
});
