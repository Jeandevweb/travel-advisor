import React from 'react';
import './placeDetailStyles'
import {Box, Typography, Button, Card, CardMedia,CardContent, CardActions, Chip, Rating} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import PhoneIcon from '@mui/icons-material/Phone';


import useStyles from './placeDetailStyles';


const PlaceDetails = ({place, selected, refProp}) => {
    const classes = useStyles();

    if(selected) refProp?.current?.scrollIntoView({behavior: 'smooth', block: 'start'})

    return (
        <div>
            <Card elevation={6}>
                <CardMedia
                    style={{height:350}}
                    image={place.photo ? place.photo.images.large.url : 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'}
                    title={place.name}               
                />
                <CardContent>
                    <Typography gutterBottom variant='h5'>{place.name}</Typography>
                    <Box display="flex" justifyContent='space-between'>
                        <Rating value={Number(place.rating)} readOnly/>
                        <Typography gutterBottom variant='subtitle1'>Plus de {place.num_reviews} avis</Typography>
                    </Box>
                    <Box display="flex" justifyContent='space-between'>
                        <Typography variant='subtitle1'>Price</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>
                    </Box>
                    <Box display="flex" justifyContent='space-between'>
                        <Typography variant='subtitle1'>Ranking</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
                    </Box>
                    {place?.awards?.map((award) => (
                        <Box my={1} display="flex" justifyContent='space-between' alignItems='center'>
                            <img src={award.images.small} alt={award.display_name}/>
                            <Typography variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
                        </Box>
                    ))}
                    {place?.cuisine?.map(({name}) => (
                        <Chip key={name} size="small" label={name} className={classes.chip}/>
                    ))}
                    {place?.address && (
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
                            <LocationOnIcon/>{place.address}
                        </Typography>
                    )}
                    {place?.phone && (
                        <Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
                            <PhoneIcon/>{place.phone}
                        </Typography>
                    )}
                    <CardActions>
                        <Button size='small' color='primary' onClick={() => window.open(place.web_url, '_blank')}>
                            Trip Advisor
                        </Button>
                        <Button size='small' color='primary' onClick={() => window.open(place.website, '_blank')}>
                            Website
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
};

export default PlaceDetails;