import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { hasLoginAccess } from 'utils';

export const PrivateRoute = ({
  component: Component,
  layout: Layout,
  layoutProps,
  isAuthenticated,
  ...rest
}: any): any => {
  const isLoggedIn = hasLoginAccess('isAdminLoggedIn');
  return (
    <Route
      {...rest}
      render={(props: any): any => {
        if (!isLoggedIn) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
        }
        return (
          <Layout {...layoutProps}>
            <Component {...props} {...rest} />
          </Layout>
        );
      }}
    />
  );
};
