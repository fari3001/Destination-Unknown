import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from '@material-ui/core'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Rating from '@material-ui/core';

import useStyles from './styles.js'
import { PlaceSharp } from '@mui/icons-material';

export default function PlaceDetails({place}) {
  const classes = useStyles();

  return (
    <Card elevation={6}>
        <CardMedia 
            style={{ height: 350 }}
            image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
            title={place}
        />
        <CardContent>
            <Typography gutterBottom varaint="h5">{place.name}</Typography>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Price</Typography>
                <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Ranking</Typography>
                <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
            </Box>
            {place?.awards?.map((award) => (
                <Box my={1} display="flex" justifyContent="space-between">
                    <img src={award.images.small} alt={award.display_name}/>
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                </Box>
            ))}
            {place?.cuisine?.map(( el ) => (
                <Chip key={el.key} size="small" label={el.name} className={classes.chip} />
                // <Typography variant="subtitle1">HEllo</Typography>
            ))}
            {place?.address && (
                <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                    <LocationOnIcon />
                    {place.address}
                </Typography>
            )}
            {place?.phone && (
                <Typography gutterBottom variant="subtitle2" color="textSecondary" className={classes.spacing}>
                    <PhoneIcon />
                    {place.phone}
                </Typography>
            )}
            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Destination Unknown
                </Button>   
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                </Button>   
            </CardActions>
        </CardContent>
    </Card>
    )
}
