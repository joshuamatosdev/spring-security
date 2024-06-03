import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from 'react-oidc-context';
import {User} from 'oidc-client-ts';

const onSignInCallback = (_user: User | void): void => {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    )
}

const oidcConfig = {
    authority: "http://localhost:8180/realms/student-keycloak",
    client_id: "student-keycloak",
    redirect_uri: "http://localhost:8080/",
    response_type: "code",
    scope: "openid profile email",
    post_logout_redirect_uri: "http://localhost:8080/",
    filterProtocolClaims: true,
    loadUserInfo: true,
    onSigninCallback: onSignInCallback,
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider {...oidcConfig}>
            <App/>
        </AuthProvider>
    </React.StrictMode>,
)
