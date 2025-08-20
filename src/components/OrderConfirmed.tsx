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

const COLORS = {
  red: "hsl(14, 86%, 42%)",
  rose50: "hsl(20, 50%, 98%)",
  textDark: "hsl(14, 65%, 9%)",
  successLight: "hsl(150, 60%, 95%)",
  successDark: "hsl(150, 60%, 35%)",
};

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
        p: 0,
      }}
      onClick={onClose}
    >
      <Paper
        elevation={6}
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: { xs: "100%", sm: 560 },
          maxWidth: { xs: "100%", sm: 560 },
          height: { xs: "100%", sm: "auto" },
          mt: { xs: 20, sm: 0 },
          borderRadius: { xs: 5, sm: 12 },
          p: { xs: 3, sm: 4 },
          bgcolor: "#fff",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" },  alignItems: { xs: "start", sm: "center" }, gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: COLORS.successLight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${COLORS.successLight}`,
            }}
          >
            <CheckCircleIcon sx={{ color: COLORS.successDark, fontSize: 28 }} />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 20 }, color: COLORS.textDark }}>
              Order Confirmed
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              We hope you enjoy your food!
            </Typography>
          </Box>
        </Box>

        {/* Order list card (pale background) */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: COLORS.rose50,
            borderRadius: 2,
            p: { xs: 1.5, sm: 2 },
            mb: 2,
          }}
        >
          <List disablePadding>
            {entries.map((e) => {
              const p = productFor(e.id);
              if (!p) return null;
              const thumb = resolveThumb(p);
              const lineTotal = (p.price * e.qty).toFixed(2);

              return (
                <React.Fragment key={e.id}>
                  <ListItem sx={{ py: 1.25, px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={thumb}
                        sx={{ width: { xs: 56, sm: 56 }, height: { xs: 56, sm: 56 }, mr: 1 }}
                      />
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 14, sm: 15 } }}>
                          {p.name}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, color: COLORS.red }}>
                            {e.qty}x
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13 }}>
                            @ ${p.price.toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />

                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 14, sm: 15 } }}>
                      ${lineTotal}
                    </Typography>
                  </ListItem>

                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </Paper>

        {/* Order total */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>Order Total</Typography>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: 18, sm: 20 } }}>${orderTotal.toFixed(2)}</Typography>
        </Box>

        {/* Action area */}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => onStartNewOrder?.()}
            sx={{
              borderRadius: 50,
              py: 1.6,
              textTransform: "none",
              fontWeight: 700,
              fontSize: { xs: 15, sm: 14 },
              bgcolor: COLORS.red,
              "&:hover": { bgcolor: COLORS.red },
            }}
          >
            Start New Order
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}