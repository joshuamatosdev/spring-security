import {CssVarsProvider} from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import {Button, Stack} from '@mui/joy';
import {useAuth} from "react-oidc-context";
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from 'react';
import {fetchHelloWorldString} from './FetchHelloWorldString.tsx';

function MainApp() {
    const [adminHelloWorldString, setAdminHelloWorldString] = useState("");
    const [userHelloWorldString, setUserHelloWorldString] = useState("");
    const [superAdminHelloWorldString, setSuperAdminHelloWorldString] = useState("");
    const [allHelloWorldString, setAllHelloWorldString] = useState("");
    const auth = useAuth();

    useEffect(() => {
        if (auth.isAuthenticated) {
            const token = auth.user?.access_token;
            fetchHelloWorldString('http://localhost:8080/api/super', token, setSuperAdminHelloWorldString, 'super admin').then(r => console.log(r));
            fetchHelloWorldString('http://localhost:8080/api/admin', token, setAdminHelloWorldString, 'admin').then(r => console.log(r));
            fetchHelloWorldString('http://localhost:8080/api/user', token, setUserHelloWorldString, 'user').then(r => console.log(r));
            fetchHelloWorldString('http://localhost:8080/api/all', token, setAllHelloWorldString, 'all').then(r => console.log(r));
        }
    }, [auth.isAuthenticated, auth.user?.access_token]);

    const refreshPage = () => {
        auth.removeUser().then(r => console.log(r));
        window.location.reload();
    }
    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
                    <Stack
                        sx={{
                            backgroundColor: "#000",
                            minHeight: '100dvh',
                            minWidth: '100vw',
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                        }}>
                        {!auth.isAuthenticated  &&   <Button onClick={() => auth.signinRedirect()} color="primary">
                                Log in
                            </Button>
                        }
                            <>
                                <Typography textColor="#FFF">
                                    Hello {auth.user?.profile.email}
                                </Typography>
                                <Typography textColor="#FFF">
                                    {allHelloWorldString ? allHelloWorldString : "...not authenticated" }
                                </Typography>
                                <Typography textColor="#FFF">
                                    {superAdminHelloWorldString ? superAdminHelloWorldString : "...unable to access super admin" }
                                </Typography>
                                <Typography textColor="#FFF">
                                    {adminHelloWorldString ? adminHelloWorldString : "...unable to access admin" }
                                </Typography>
                                <Typography textColor="#FFF">
                                    {userHelloWorldString}
                                </Typography>
                                {auth.isAuthenticated &&
                                <Button onClick={() => void refreshPage()}>
                                    Log out
                                </Button> }
                            </>
                    </Stack>
        </CssVarsProvider>
    );
}

export default function App() {
    return (
            <MainApp />
    );
}
