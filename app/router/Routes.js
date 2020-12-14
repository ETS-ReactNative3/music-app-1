import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const Routes = withRouter(({ history }) => {
  const accessToken = localStorage.getItem('token');
  let isAuthorized = false;
  if (accessToken) {
    const decoded = jwtDecode(accessToken);
    if (decoded.exp < new Date().getTime() / 1000) {
      localStorage.removeItem('token');
    } else {
      isAuthorized = true;
    }
  }

  return (
    <Switch>
      {!isAuthorized ? (
        /* Render auth page when user at `/auth` and not authorized. */
        <AuthPage />
      ) : (
        /* Otherwise redirect to root page (`/`) */
        <Redirect from="/auth" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={LogoutPage} />

      {!isAuthorized ? (
        /* Redirect to `/auth` when user is not authorized */
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <HomePage />
        </Layout>
      )}
    </Switch>
  );
});
