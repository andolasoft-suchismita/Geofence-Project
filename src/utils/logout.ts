import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const handleLogout = () => {
  localStorage.clear();
  history.push('/signin'); // Redirect to sign-in page
};
