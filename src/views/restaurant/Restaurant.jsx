import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom'
import { fetchRestaurant } from './store/Restaurant.action';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/system';

export default function Restaurant() {

  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.Restaurant.restaurants);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  const navigate = useNavigate()
  const handleMenu = () => {
    navigate('/Menu')
  }

  useEffect(() => {
    dispatch(fetchRestaurant());
  }, []);


  useEffect(() => {
    console.log(restaurants)
  }, [restaurants]);

  return (
    <div style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",

      height: '220vh',

      fontSize: '50px',

      backgroundSize: 'cover',

      backgroundRepeat: 'no-repeat', 'background-position': 'center center'
    }}>
      {

        restaurants?.map((rest) => {
          return (
            <>
              <Card style={{ margin: '50px 50px', maxWidth: 900 }}>
              <CardMedia
                      component="img"
                      height="140"
                      image={rest.store_image}
                      alt="restaurant image"
                    />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <item>
                      
                      <Typography gutterBottom variant="subtitle1" component="div" >
                        <h2>{rest.store_name}</h2>
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        <h4>{rest.store_address}</h4>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <h4>{rest.store_city}-{rest.store_zip}</h4>
                      </Typography>
                      <Typography variant="body2">
                        <h4>{rest.store_state}</h4>
                      </Typography>
                      <Typography variant="body2">
                        <h4>{rest.store_phone}</h4>
                      </Typography>
                    </item>
                  </Grid>
                  <Grid item>
                    <div>
                      <Button onClick={() => {
                        handleMenu()
                      }}>Menu</Button>
                    </div>
                  </Grid>
                </Grid>
              </Card>
            </>
          )
        })
      }
    </div>
  )
}