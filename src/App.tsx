import './App.css'
import { useState } from "react";
import Cart from './components/Cart'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProductCard from './components/ProductCard';
import data from "./data.json";

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: 'none',
  border: 'none',
  backgroundColor: "hsl(20, 50%, 98%)",
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: "hsl(20, 50%, 98%)" }}>
      <Stack
      direction={{ xs: "column", sm: "row", md: "row" }}
      spacing={2}
      sx={{ padding: '20px', width: '100%', maxWidth: 1200 }}
      justifyContent="center"
      >
      <Item sx={{ width: { xs: '100%', sm: '75%' }, justifyContent: 'center' }}>
        <ProductCard cart={cart} setCart={setCart} products={products} />
      </Item>
      <Item sx={{ width: { xs: '100%', sm: '25%' }, justifyContent: 'center' }}>
        <Cart cart={cart} setCart={setCart} products={products} />
      </Item>
      </Stack>
    </div>
  );
}