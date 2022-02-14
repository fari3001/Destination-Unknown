import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'
import { getPlacesData } from './api'
import { flexbox } from '@mui/system';

function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({})
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(' ');

  

  useEffect(() => { 
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0 ));
        setFilteredPlaces([]);
        setRating('')
        // setIsLoading(false)
      })
    }
  }, [type, bounds]);


  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{width: '100%'}} >
        <Grid item xs={12} md={4}>
          <List 
          places={filteredPlaces.length ? filteredPlaces : places}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
      </Grid>
      <Grid item xs={12} md={8} style={{ display: flexbox, justifyContent: 'center', alignItems: 'center'}}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
