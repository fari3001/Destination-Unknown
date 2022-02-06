import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Rating from '@material-ui/core';
import useStyles from './styles'

const Map = ({ setCoordinates, setBounds, coordinates, places }) =>  {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)')

    
  return (
      <div className={classes.mapContainer}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCDMIUQUZLfX3IK9Ka7FIYJ-pYv0I0Y4HY' }}
            defau ltCenter={coordinates}
            center={coordinates}
            defaultZoom={12}
            margin={[50,50,50,50]}
            options={''}
            onChange={(e) => {
              setCoordinates({ lat: e.center.lat, lng: e.center.lng })
              setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
            }}
            onChildClick={''}
          >
            {places?.map((place, i) => (
              <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
              >
                {
                  !isDesktop ? (
                    <LocationOnOutlinedIcon color="primary" fontSize="large" />
                  ) : (
                    <Paper elevation={3} className={classes.paper}  onClick={() => window.open(place.website, '_blank')}>
                      <Typography className={classes.typography} variant="subtitle2" gutterBottom>
                        {place.name}
                      </Typography>
                      <img 
                      className={classes.pointer} 
                      src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                      alt={place.name}
                      
                      />
                    </Paper>
                  )
                }


              </div>
            ))}
          </GoogleMapReact>
      </div>
  )
}

export default Map
