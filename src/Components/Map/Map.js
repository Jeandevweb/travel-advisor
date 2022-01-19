import React, {useState} from 'react';
import './mapStyles'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating } from '@mui/material'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import useStyles from './mapStyles';
import styles from './styles'

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked}) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
    


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50, 50,50,50]}
                options={{disableDefaultUI: true, zoomControl: true, styles: styles}}
                onChange={(e) => {
                    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
                }}
                onChildClick={(child)=>{
                    setChildClicked(child)
                }}
            >
                {places?.map((place, i)=>(
                    <div
                        className={classes.markerContainer}
                        lat={Number(place.latitude)}
                        lng={Number(place.longitude)}
                        key={i}
                    >
                        {
                            !isDesktop ? (
                                <FmdGoodIcon color="primary" fontSize='large'/>
                            ) : (
                                <Paper elevation={3} className={classes.paper}>
                                    <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                                        {place.name}
                                    </Typography>
                                    <img 
                                    src={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'} 
                                    alt={place.name}
                                    className={classes.pointer} />
                                    <Rating size="small" value={Number(place.rating)} readOnly/>
                                </Paper>
                            )
                        }
                    </div>
                ))}
            </GoogleMapReact>
        </div>
    );
};

export default Map;