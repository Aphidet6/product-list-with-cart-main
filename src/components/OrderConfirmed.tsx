import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Product = {
  id: number;
  name?: string;
  price: number;
  image?: any;
};

type Props = {
  open: boolean;
  cart: Record<number, number>;
  products: Product[];
  onClose?: () => void;
  onStartNewOrder?: () => void;
};

const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export default function OrderConfirmed({ open, cart, products, onClose, onStartNewOrder }: Props) {
  if (!open) return null;

  const entries = Object.entries(cart).map(([k, v]) => ({ id: Number(k), qty: v }));
  const productFor = (id: number) => products.find((p) => p.id === id);
  const orderTotal = entries.reduce((sum, e) => {
    const p = productFor(e.id);
    return sum + (p ? p.price * e.qty : 0);
  }, 0);

  const resolveThumb = (p?: Product) => {
    const desktop = p?.image && typeof p.image !== "string" ? p.image.thumbnail ?? p.image.desktop : p?.image;
    if (!desktop || typeof desktop !== "string") return undefined;
    const filename = desktop.split("/").pop();
    return filename ? Object.entries(images).find(([k]) => k.endsWith(filename))?.[1] : undefined;
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15,15,15,0.45)",
        p: 2,
      }}
      onClick={onClose}
    >
      <Paper
        elevation={6}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "92%", sm: 560 },
          borderRadius: 3,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              backgroundColor: "success.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckCircleIcon sx={{ color: "success.dark", fontSize: 28, opacity: 0.4 }} />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Order Confirmed
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We hope you enjoy your food!
            </Typography>
          </Box>
        </Box>

        <List disablePadding>
          {entries.map((e) => {
            const p = productFor(e.id);
            if (!p) return null;
            const thumb = resolveThumb(p);
            const lineTotal = (p.price * e.qty).toFixed(2);
            return (
              <React.Fragment key={e.id}>
                <ListItem sx={{ py: 1.5, px: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={thumb}
                      sx={{ width: 56, height: 56, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 600 }}>{p.name}</Typography>}
                    secondary={
                      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          {e.qty}x
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @ ${p.price.toFixed(2)}
                        </Typography>
                      </Box>
                    }
                  />
                  <Typography sx={{ fontWeight: 700 }}>${lineTotal}</Typography>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })}
        </List>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
          <Typography>Order Total</Typography>
          <Typography sx={{ fontWeight: 700 }}>${orderTotal.toFixed(2)}</Typography>
        </Box>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onStartNewOrder?.();
            }}
            sx={{ borderRadius: 50, px: 6, mt: 1 }}
          >
            Start New Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}