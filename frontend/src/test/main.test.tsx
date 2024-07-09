import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Button from '@mui/material/Button';
//
// const onSignInCallback = (_user: User | void): void => {
//     window.history.replaceState(
//         {},
//         document.title,
//         window.location.pathname
//     );
// };
//
// const oidcConfig = {
//     authority: "http://localhost:8180/realms/student-keycloak",
//     client_id: "student-keycloak",
//     redirect_uri: "http://localhost:8080/",
//     response_type: "code",
//     scope: "openid profile email",
//     post_logout_redirect_uri: "http://localhost:8080/",
//     filterProtocolClaims: true,
//     loadUserInfo: true,
//     onSignInCallback: onSignInCallback,
// };

describe('App component', () => {
    it('renders within an AuthProvider', () => {
        render(
   <Button  variant="contained" color="primary">
       Hello</Button>
        );
        expect(screen.getByText('Welcome')).toBeInTheDocument();
    });
});
