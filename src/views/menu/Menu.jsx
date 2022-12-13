import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActionArea, CardActions } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMenu } from './store/Menu.action';
import { fetchTopping } from '../topping/store/Topping.action';
import { Dialog } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import { InputLabel } from "@mui/material";
import { MenuItem, MenuList, Tab } from "@mui/material";
import { addCartItem } from '../cart/store/CartSlice';
import Cart from '../cart/addToCart'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from '@mui/material/Drawer';
import{ ListItemAvatar }from '@mui/material';

export default function Menu() {
  const dispatch = useDispatch();
  const menus = useSelector((state) => state.Menu.menu);
  const [num, setNum] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cart, setCart] = useState([]);
  const [selectedValue, setSelectedValue] = useState([])

  const toppings = useSelector((state) => state.Topping.topping);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch(fetchTopping());
  }, []);

  useEffect(() => {
    console.log(toppings)
  }, [toppings]);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  useEffect(() => {
    console.log(menus)
  }, [menus]);

  const AddCart = (data) => {
    setCart((oldcart) => {
      return [...oldcart, data]
    })
    dispatch(addCartItem(data));
  }
  const handleOrder = (Name, Itemprice, toppings) => {
    var price = 0;
    toppings.map((item) => {
      price = price + item.price;
    })
    price = price + Itemprice;
    console.log(price + Itemprice);
    console.log(quantity);
    setNum((n) => ++n);
    var data = {
      "name": Name,
      "price": price*quantity,
      "quantity": quantity
    };
    
    AddCart(data);
  }
  console.log("cart array", cart);
  const QuantityHandler = (event) => {
    setQuantity(event.target.valueAsNumber);
  }
  const handleChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSelectedValue(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

 
  const handleClose = () => {
    setOpen(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  const handleOpen = () => {
    setOpen(true);
  }
  return (
    <>
       
       <div style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VwY2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')",

      height:'220vh',

      fontSize:'50px',

      backgroundSize: 'cover',

      backgroundRepeat: 'no-repeat','background-position': 'center center'}}>
      <div className='paper'>

            <Card sx={{ display: 'flex', width:'80%' }} >

            <CardContent sx={{ flex: '1 0 auto' }}>

                  <Typography component="div" variant="h5">

                    Good Food,Great Time

                  </Typography>

                  <Typography variant="body2" color="text.secondary" style={{color: 'black'}}>

                    our chef's at wiwi make delicious food selections every week-you pick,we cook and deliver

                  </Typography>

                </CardContent>

            </Card>

            </div>
      <div style={{ display: 'grid', margin: '0px 100px', 'grid-template-columns': 'auto auto' }}>
        
          {menus?.map(data =>
         
              <Card  style={{ margin: '50px 50px', maxWidth: 400 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 400, height: 200 }}
                  image={data.item_image}
                  alt="Live from space album cover" />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      {data.item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" >
                      {data.item_description}
                    </Typography>
                  </CardContent>
                  <Typography>${data.base_price.$numberDecimal}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width: '300px' }}>
                    <Button onClick={handleOpen} style={{width: '500px', backgroundColor: 'Black'}}>Toppings</Button>
                    <Dialog onClose={handleClose} open={open}>
                      <List sx={{ pt: 0 }}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} style={{width: '300px'}}>
                          <InputLabel>Select the Toppings</InputLabel>
                          <Select multiple value={selectedValue} onChange={handleChange} input={<OutlinedInput label="Tag" />}
                          >
                            {toppings?.map((m, i) => (
                              <MenuItem
                                key={i} value={{"image": m.image, "name": m.name, "price": parseFloat(m.price.$numberDecimal) }}
                              >
                                <ListItemAvatar>

                                  <Avatar src={m.image}></Avatar>

                                </ListItemAvatar>
                                <ListItemText primary={m.name} /><ListItemText primary={m.price.$numberDecimal} /></MenuItem>))}
                          </Select>
                        </FormControl>
                        <Tab /><Button variant="contained" color="success" onClick={handleClose} style={{position: 'relative', top: '15px'}}>Done</Button>
                      </List></Dialog>
                      &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => handleOrder(data.item, data.base_price.$numberDecimal, selectedValue) } style={{width: '300px', backgroundColor: 'Black'}}>Add</Button>
                    &nbsp;&nbsp;&nbsp;
                    <TextField type="number" size="small" sx={{ width: 300 }} onChange={QuantityHandler}/>
                  </Box>
                <CardContent>
                </CardContent>
              </Card>
          )}
        </div>
      </div>
    </>
  );
}