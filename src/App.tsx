import './App.css'
import { useState } from "react";
import Cart from './components/Cart'
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProductCard from './components/ProductCard';
import data from "./data.json";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function App() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const products = Array.isArray(data) ? data : [];

  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Item sx={{ width: '75%' }}>
          <ProductCard cart={cart} setCart={setCart} products={products} />
        </Item>
        <Item sx={{ width: '25%' }}>
          <Cart cart={cart} setCart={setCart} products={products} />
        </Item>
      </Stack>
    </div>
  );
}