import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Avatar, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

export type User = {
    id: number;
    avatar: string;
    name: string;
    title?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    role?: RoleTypes;
};

export type RoleTypes = 'Admin' | 'Super Admin' | 'User';

type UserCardProps = {
    user: User;
};

const UserCard = ({user}: UserCardProps) => {
    const {avatar, name, title, email, phoneNumber, address, role} = user;
    const isEditable = role === 'Super Admin' || role === 'Admin';
    const isDeletable = role === 'Super Admin';

    return (
        <Card sx={{width: '100%', p: 2}}>
            <CardContent sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
                alignItems: 'center', gap: 2, p: 2
            }}>
                <Avatar alt={name} src={avatar} sx={{width: 56, height: 56,}}/>
                <Typography variant="h6" component="div">{name}</Typography>
                {title && <Typography sx={{fontSize: 14}} color="text.secondary">{title}</Typography>}
                {email && <Typography sx={{fontSize: 14}} color="text.secondary">{email}</Typography>}
                {phoneNumber && <Typography sx={{fontSize: 14}} color="text.secondary">{phoneNumber}</Typography>}
                {address && <Typography sx={{fontSize: 14}} color="text.secondary">{address}</Typography>}

                {isEditable &&
                    <Tooltip title="You don't have permission to do this" followCursor={true}>
                        <span>
                         <Button variant="contained" disabled={!isDeletable}><DeleteIcon/></Button>
                        </span>
                    </Tooltip>
                }
                {isEditable && <EditIcon sx={{cursor: 'pointer'}}/>}
            </CardContent>
        </Card>
    ); 
};

export default UserCard;