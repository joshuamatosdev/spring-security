import {useEffect, useState} from 'react';

import CssBaseline from '@mui/material/CssBaseline';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Paper, Stack} from '@mui/material';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useAuth} from 'react-oidc-context';
import {fetchHelloWorldString} from './FetchHelloWorldString.ts';
import UserCard, {User} from './UserCard.tsx';


export default function App() {
    const [adminHelloWorldString, setAdminHelloWorldString] = useState("");
    const [userHelloWorldString, setUserHelloWorldString] = useState("");
    const [superAdminHelloWorldString, setSuperAdminHelloWorldString] = useState("");
    const [allHelloWorldString, setAllHelloWorldString] = useState("");
    const auth = useAuth();

    const refreshPage = () => {
        auth.removeUser().then(() => auth.signoutRedirect());
    }

    const user: User = {
        id: 1,
        avatar: 'https://i.pravatar.cc/300',
        name: 'John Doe',
        title: 'Software Engineer',
        email: 'test@test.com',
        phoneNumber: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        role: 'Admin'
    };


    useEffect(() => {
        if (auth.isAuthenticated) {
            const token = auth.user?.access_token;
            fetchHelloWorldString('http://localhost:8080/api/super', token, setSuperAdminHelloWorldString, 'super admin');
            fetchHelloWorldString('http://localhost:8080/api/admin', token, setAdminHelloWorldString, 'admin');
            fetchHelloWorldString('http://localhost:8080/api/user', token, setUserHelloWorldString, 'user');
            fetchHelloWorldString('http://localhost:8080/api/authenticated', token, setAllHelloWorldString, 'authenticated');
        }
    }, [auth.isAuthenticated, auth.user?.access_token]);


    return (
        <>
            <CssBaseline/>
            <Grid container display="flex" flexDirection="row" height={{xs: '100%', sm: '100dvh'}} width='100vw'>
                <Grid
                    item
                    xs={12}
                    lg={4}
                    sx={{
                        display: {xs: 'none', sm: 'flex'},
                        flexDirection: 'column',
                        flexGrow: 1,
                        backgroundColor: '#e1eaf4',
                        borderRight: {sm: 'none', md: '1px solid'},
                        borderColor: {sm: 'none', md: 'divider'},
                        alignItems: 'start',
                        pt: 4,
                        px: 10,
                        gap: 4,
                    }}
                >
                    <Stack
                        sx={{alignItems: "center", width: "100%", gap: 2,}}>
                        {auth.isAuthenticated ?
                            <Button variant="outlined"
                                    sx={{
                                        width: "100%", backgroundColor: "#3498db", color: "#fff",
                                        "&:hover": {backgroundColor: "#2980b9"}
                                    }}
                                    onClick={() => void refreshPage()}>
                                Log out
                            </Button>
                            :
                            <Button onClick={() => auth.signinRedirect()}
                                    sx={{
                                        width: "100%", backgroundColor: "#3498db", color: "#fff",
                                        "&:hover": {backgroundColor: "#2980b9"}
                                    }}>
                                Log in
                            </Button>
                        }
                        <Typography variant="h6" color="#000" alignSelf="start">
                            Status:
                        </Typography>
                        <Paper elevation={5} sx={{
                            display: "flex", flexDirection: "column", width: "100%", padding: 2,
                            gap: 2, borderRadius: 2, alignItems: "center",
                        }}>
                            
                            {auth.isAuthenticated && <Typography variant="body1" color="#000">
                                Hello {auth.user?.profile.email}
                            </Typography>}
                            
                            <Typography variant="body1" color="#000">
                                {allHelloWorldString ? allHelloWorldString : "...not authenticated"}
                            </Typography>
                            <Typography variant="body1" color="#000">
                                {superAdminHelloWorldString ? superAdminHelloWorldString : "...unable to access super admin"}
                            </Typography>
                            <Typography variant="body1" color="#000">
                                {adminHelloWorldString ? adminHelloWorldString : "...unable to access admin"}
                            </Typography>
                            <Typography variant="body1" color="#000">
                                {userHelloWorldString ? userHelloWorldString : "...unable to access user"}
                            </Typography>
                        </Paper>
                        <Stack sx={{flexDirection: 'row', width: '100%', gap: 2, padding: 2,}}>
                            <Button><PeopleAltIcon sx={{fontSize: '20px', mr: 1}}/>User</Button>
                            <Button><AdminPanelSettingsIcon sx={{fontSize: '20px', mr: 1}}/>Admin</Button>
                            <Button><AutoAwesomeRoundedIcon sx={{fontSize: '20px', mr: 1}}/>Super Admin</Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={12}
                    lg={8}
                    sx={{
                        display: 'flex', flexDirection: 'column', maxWidth: '100%', width: '100%',
                        backgroundImage: '#d8d7d7', alignItems: 'start', px: 10, pt: 4, gap: 4, flexGrow: 1,
                    }}
                >
                    <Stack sx={{width: '100%', gap: 3}}>
                        <UserCard user={user}/>
                        <UserCard user={user}/>
                        <UserCard user={user}/>
                        <UserCard user={user}/>
                        <UserCard user={user}/>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}