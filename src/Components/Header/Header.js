import React, {useState} from 'react';
// import useStyles from './headerStyles.js';
// import './headerStyles.js';
import { Autocomplete } from '@react-google-maps/api';
import {AppBar, Toolbar, Typography, InputBase, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchAppBar  from './AppBar';


const Header = ({setCoordinates})  => {
    const [autocomplete, setAutocomplete] = useState(null);


    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();

        setCoordinates({lat, lng});
    }

    return (
        
        <AppBar position="static">
            <SearchAppBar >
                <Box display="flex">                
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <SearchIcon/>
                    </Autocomplete>
                </Box>
            </SearchAppBar>
        </AppBar>
          
    );
};

export default Header;