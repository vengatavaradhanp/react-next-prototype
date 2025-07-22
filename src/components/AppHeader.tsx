import React, { useState } from 'react'
import {
    AppBar,
    Box,
    CssBaseline,
    IconButton,
    InputBase,
    Toolbar,
    useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const drawerWidth = 260;

export default function AppHeader() {
    const [open, setOpen] = useState(true);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };


    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    ...(open && {
                        marginLeft: drawerWidth,
                        width: `calc(100% - ${drawerWidth}px)`,
                        transition: theme.transitions.create(['width', 'margin'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    }),
                    borderBottom: '1px solid #e4e5e7',
                    boxShadow: 'none',
                }}
            >
                <Toolbar style={{ backgroundColor: '#fff', color: '#000' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{
                        position: 'relative',
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.common.black, 0.00),
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.common.black, 0.1),
                        },
                        marginRight: theme.spacing(2),
                        marginLeft: 0,
                        width: '100%',
                        [theme.breakpoints.up('sm')]: {
                            marginLeft: theme.spacing(1),
                            width: 'auto',
                        },
                        border: `1px solid ${alpha(theme.palette.common.black, 0.12)}`,
                        // margin: theme.spacing(2, 2),
                    }}>
                        <Box sx={{
                            padding: theme.spacing(0, 2),
                            height: '100%',
                            position: 'absolute',
                            pointerEvents: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <SearchIcon />
                        </Box>
                        <InputBase
                            placeholder="Search…"
                            sx={{
                                color: 'inherit',
                                '& .MuiInputBase-input': {
                                    padding: theme.spacing(1, 1, 1, 0),
                                    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                    transition: theme.transitions.create('width'),
                                    width: '100%',
                                    [theme.breakpoints.up('md')]: {
                                        width: '30ch',
                                    },
                                },
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
