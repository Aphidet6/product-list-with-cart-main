import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CarbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg";
import EmptyCartImg from "../assets/images/illustration-empty-cart.svg";
import OrderConfirmed from "./OrderConfirmed";

type Product = {
  id: number;
  image?: any;
  name: string;
  category?: string;
  price: number;
};

type CartProps = {
  cart: { [key: number]: number };
  setCart: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  products: Product[];
};

const COLORS = {
  red: "hsl(14, 86%, 42%)",
  rose50: "hsl(20, 50%, 98%)",
  textDark: "hsl(14, 65%, 9%)",
};

export default function Cart({ cart, setCart, products }: CartProps) {
  const [open, setOpen] = useState(false);

  const entries = Object.entries(cart).map(([k, v]) => ({ id: Number(k), qty: v }));
  const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);

  const productFor = (id: number) => products.find((p) => p.id === id);

  const totalPrice = entries.reduce((sum, e) => {
    const p = productFor(e.id);
    return sum + (p ? p.price * e.qty : 0);
  }, 0);


  const remove = (id: number) =>
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

  const clear = () => setCart({});

  // Empty state: show card with illustration
  if (entries.length === 0) {
    return (
      <Card
        sx={{
          minWidth: 360,
          borderRadius: 2,
          backgroundColor: '#fff',
          boxShadow: "none",
          p: 2,
          mx: 2
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: COLORS.red, mb: 2 }}
          >
            Your Cart ({totalQty})
          </Typography>

          <Box
            component="img"
            src={EmptyCartImg}
            alt="Empty cart"
            sx={{
              width: 120,
              height: "auto",
              mx: "auto",
              mb: 2,
              display: "block",
            }}
          />

          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
            Your added items will appear here
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Populated cart UI
  return (
    <>
      <Box sx={{ p: 2, minWidth: 360, bgcolor: "#fff", borderRadius: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, color: COLORS.red }}>
          Your Cart ({totalQty})
        </Typography>

        <List>
          {entries.map((e) => {
            const p = productFor(e.id);
            if (!p) return null;
            const lineTotal = p.price * e.qty;
            return (
              <ListItem
                key={e.id}
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", py: 1 }}
                secondaryAction={
                  <IconButton onClick={() => remove(e.id)} size="small" sx={{ border: "1px solid hsl(14, 86%, 42%)", "&:hover": { borderColor: COLORS.textDark, color: COLORS.textDark } }}>
                    <CloseIcon sx={{fontSize: "10px", color: COLORS.red }} />
                  </IconButton>
                }
                
              >
                <Box sx={{ width: "100%" }}>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 600, fontSize: 16 }}>{p.name}</Typography>}
                    secondary={
                      <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, flexWrap: "wrap" }}>
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                          <Typography sx={{ mx: 0.5, color: COLORS.red }}>x{e.qty}</Typography>
                        </Box>

                        <Typography sx={{ color: "text.secondary", mr: 1 }}>
                          @${p.price.toFixed(2)}
                        </Typography>

                        <Typography sx={{ fontWeight: 700 }}>
                          ${lineTotal.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Divider sx={{ mt: 1, width: "112%"}} />
                </Box>
              </ListItem>
            );
          })}
          
        </List>
        

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography>Order Total</Typography>
          <Typography sx={{ fontWeight: 700, fontSize: 20 }}>${totalPrice.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, bgcolor: COLORS.rose50, py: 1, borderRadius: 1 }}>
          <Box component="img" src={CarbonNeutralIcon} alt="carbon" sx={{ width: 18, height: 18, mr: 1 }} />
          <Typography>
            This is a <strong>carbon‑neutral</strong> delivery
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{ borderRadius: 50, px: 4, bgcolor: COLORS.red, "&:hover": { bgcolor: "hsl(5, 71%, 35%)" } }}
            onClick={() => setOpen(true)}
          >
            Confirm Order
          </Button>

          <Button variant="text" onClick={clear} sx={{ display: "block", mt: 1 }}>
            Clear
          </Button>
        </Box>
      </Box>

      <OrderConfirmed
        open={open}
        cart={cart}
        products={products}
        onClose={() => setOpen(false)}
        onStartNewOrder={() => {
          clear();
          setOpen(false);
        }}
      />
    </>
  );
}
