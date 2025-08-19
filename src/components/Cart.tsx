import React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import CarbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg";
import EmptyCartImg from "../assets/images/illustration-empty-cart.svg";

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

export default function Cart({ cart, setCart, products }: CartProps) {
  const entries = Object.entries(cart).map(([k, v]) => ({ id: Number(k), qty: v }));
  const totalQty = entries.reduce((sum, e) => sum + e.qty, 0);

  const productFor = (id: number) => products.find((p) => p.id === id);

  const totalPrice = entries.reduce((sum, e) => {
    const p = productFor(e.id);
    return sum + (p ? p.price * e.qty : 0);
  }, 0);

  const increase = (id: number) =>
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

  const decrease = (id: number) =>
    setCart((prev) => {
      if ((prev[id] || 0) > 1) return { ...prev, [id]: prev[id] - 1 };
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

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
          maxWidth: 360,
          borderRadius: 2,
          backgroundColor: "#fffaf8",
          boxShadow: "none",
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#c2410c", mb: 2 }}
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
    <Box sx={{ p: 2, maxWidth: 360 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Your Cart ({totalQty})
      </Typography>

      <Divider sx={{ mb: 1 }} />

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
                <IconButton onClick={() => remove(e.id)} size="small" sx={{ border: "1px solid #ddd" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              <Box>
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <Typography sx={{ mx: 0.5 }}>x{e.qty}</Typography>
                      </Box>

                      <Typography sx={{ color: "text.secondary", mr: 1 }}>
                        @${p.price.toFixed(2)}
                      </Typography>

                      <Typography sx={{ fontWeight: 600 }}>
                        ${lineTotal.toFixed(2)}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 1 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Typography>Order Total</Typography>
        <Typography sx={{ fontWeight: 700 }}>${totalPrice.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
        <Box component="img" src={CarbonNeutralIcon} alt="carbon" sx={{ width: 18, height: 18, mr: 1 }} />
        <Typography>
          <strong>This is a carbon‑neutral</strong> delivery
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" color="error" sx={{ borderRadius: 50, px: 4 }}>
          Confirm Order
        </Button>

        <Button variant="text" onClick={clear} sx={{ display: "block", mt: 1 }}>
          Clear
        </Button>
      </Box>
    </Box>
  );
}
