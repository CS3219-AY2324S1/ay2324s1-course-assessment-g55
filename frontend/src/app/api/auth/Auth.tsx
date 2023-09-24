import { useUser } from '@auth0/nextjs-auth0/client';

export function Auth() {
  const { error, user } = useUser();

  const isAuthenticated = () => {
    return user ? true : false;
  };

  // Gets the email from the user object
  // Returns null if user not logged in
  const getEmail = () => {
    return user ? user.email : null;
  };

  const isEmailVerified = () => {
    return user ? user.email_verified : false;
  };

  // Gets username, returns null if user not logged in. Returns Google/Github username if logged in using those
  const getUserName = () => {
    return user ? user.name : null;
  };

  // For sign ins through Google/Github, the user ID could be displayed separated by a pipe as: google-oauth-2 | [ID]
  const getUserID = () => {
    return user ? user.sub : null;
  };

  // Different session ID for every session
  const getSessionId = () => {
    return user ? user.sid : null;
  };

  // Redirects to /api/auth/login
  const redirectToLogin = () => {
    if (!error) {
      const loginTempElement = document.createElement('a');
      loginTempElement.href = '/api/auth/login';
      loginTempElement.style.display = 'none';
      document.body.appendChild(loginTempElement);
      loginTempElement.click();
    } else {
      console.log('Error!\n');
      console.log(error);
    }
  };

  // Redirects to /api/auth/logout
  const redirectToLogout = () => {
    if (!error) {
      const logoutTempElement = document.createElement('a');
      logoutTempElement.href = '/api/auth/logout';
      logoutTempElement.style.display = 'none';
      document.body.appendChild(logoutTempElement);
      logoutTempElement.click();
    } else {
      console.log('Error!\n');
      console.log(error);
    }
  };

  return {
    isAuthenticated,
    getEmail,
    isEmailVerified,
    getUserName,
    getUserID,
    getSessionId,
    redirectToLogin,
    redirectToLogout,
  };
}
