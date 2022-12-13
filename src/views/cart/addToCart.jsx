import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useEffect } from 'react';

export default function AddtoCart() {
  const cartItem = useSelector((state) => state.Cart.cartItems);
  const [state, setState] = React.useState({
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    console.log(cartItem)
  }, [cartItem]);
  
  return (
    <div>
      {[ 'right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={toggleDrawer(anchor, true)}
            >
                {/* <Typography>Your Cart</Typography><br></br><br/> */}
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <List sx={{
              pt: 0, width: 800,
              height: 128,
            }}>
              {Object.entries(cartItem).map(([item, details]) => (
                <ListItem button key={item}>
                  <ListItemText primary={item} />
                  <ListItemText primary={"$" + details.price} />
                  <ListItemText primary={details.quantity} />
                  <Button  color="error">Delete</Button>
                </ListItem>
              ))}
              {/* <Typography sx={{ ml: 1, color: 'orangered' }}>TotalPrice: ${TotalPrice}</Typography>
              <Typography sx={{ ml: 20 }}><Button onClick={handleCartClose} color="error">Close</Button>
                <Button onClick={() => { handleOrderCart(cart, TotalPrice) }} color="success">Order</Button></Typography> */}
            </List>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}