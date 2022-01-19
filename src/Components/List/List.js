import React, {useState, useEffect, createRef} from 'react';
import './styles.css';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@mui/material'; 
import {createTheme, ThemeProvider} from '@mui/material/styles'
import useStyles from './listStyles';
import PlaceDetails from '../PlaceDetails/PlaceDetails';


const theme = createTheme();

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles();
    
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
      setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);


    return (
      <ThemeProvider theme={theme}>
        <div className="container">
            <Typography variant='h4'>Restaurant, Hotels, Attractions autours de vous</Typography>
            {isLoading ? (
              <div className={classes.loading}>
                <CircularProgress size="5rem"/>
              </div>     
            ) : (
              <>
            <FormControl className="formControl">
              <InputLabel className="inputLabel">Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="restaurants" >restaurants</MenuItem>  
                <MenuItem value="hotels" >hotels</MenuItem>  
                <MenuItem value="attractions" >attractions</MenuItem>
              </Select>               
            </FormControl>
            <FormControl className="formControl">
              <InputLabel>Rating</InputLabel>
              <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0} >All</MenuItem>  
                <MenuItem value={3} >Above 3.0</MenuItem>  
                <MenuItem value={4} >Above 4.0</MenuItem>   
                <MenuItem value={4.5} >Above 4.5</MenuItem> 
              </Select>               
            </FormControl>

            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, index) => (
                  <Grid item key={index} xs={12}>
                    <PlaceDetails 
                    place={place}
                    selected={Number(childClicked === index)}
                    refProp={elRefs[index]}
                    />
                  </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
      </ThemeProvider>  
    );
};

export default List;