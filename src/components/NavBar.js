import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ControlBar from './ControlBar/ControlBar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));

 const NavBar = ({textFieldRef}) => {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: "#fff"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <img src="/logo.png" />
                    <ControlBar getText={()=> textFieldRef.current.getText()}/>
                    <Button>More</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
