import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

// Resolve image URLs from src/assets/images using Vite's glob (eager + url)
const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

type Product = {
  id: number;
  image?: any;
  name: string;
  category?: string;
  price: number;
};

type Props = {
  cart: Record<number, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  products: Product[];
};

const COLORS = {
  red: "hsl(14, 86%, 42%)", // primary red
  rose50: "hsl(20, 50%, 98%)", // background
  textDark: "hsl(14, 65%, 9%)",
};

export default function ProductCard({ cart, setCart, products }: Props) {
  const handleAdd = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleIncrease = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleDecrease = (id: number) => {
    setCart((prev) => {
      if ((prev[id] || 0) > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
    });
  };

  return (
    <>
      <Typography
        component="h1"
        sx={{ fontSize: 24, fontWeight: 700, color: COLORS.textDark, px: 2, py: 1 }}
      >
        Desserts
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 3,
          p: 2,
        }}
      >
        {products.map((item: any) => {
          const desktopPath =
            item?.image && typeof item.image !== "string"
              ? item.image.desktop
              : item.image;
          const filename =
            typeof desktopPath === "string"
              ? desktopPath.split("/").pop()
              : undefined;
          const resolvedDesktop = filename
            ? Object.entries(images).find(([key]) => key.endsWith(filename))?.[1]
            : undefined;

          const quantity = cart[item.id] || 0;

          return (
            <Card
              key={item.id}
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: "visible",
                backgroundColor: "transparent",
                boxShadow: "none",
                p: 0,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={resolvedDesktop ?? (desktopPath as string) ?? ""}
                  alt={item.name}
                  sx={{
                    border: quantity > 0 ? `3px solid ${COLORS.red}` : "1px solid transparent",
                    borderRadius: 2,
                    transition: "border-color 160ms ease",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />

                {quantity === 0 ? (
                  <Button
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon sx={{color: COLORS.red}}/>}
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: 50,
                      width: "60%",
                      bgcolor: COLORS.rose50,
                      borderColor: COLORS.red,
                      color: COLORS.textDark,
                      textTransform: "none",
                      fontWeight: 700,
                      "&:hover": { color: COLORS.red },
                    }}
                    onClick={() => handleAdd(item.id)}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 50,
                      width: "60%",
                      backgroundColor: COLORS.red,
                      color: "white",
                      px: 2,
                      py: 0.75,
                    }}
                  >
                    <IconButton
                      onClick={() => handleDecrease(item.id)}
                      sx={{
                        color: "white",
                        border: "1px solid white", borderRadius: "50px",
                        p: 0.5,
                        "&:hover": {
                          bgcolor: "white",
                          color: COLORS.red,
                        },
                      }}
                    >
                      <RemoveIcon sx={{ fontSize: 10 }} />
                    </IconButton>
                    <Typography sx={{ color: "white", mx: 1, fontWeight: 700 }}>{quantity}</Typography>
                    <IconButton onClick={() => handleIncrease(item.id)}
                      sx={{
                        color: "white",
                        border: "1px solid white", borderRadius: "50px",
                        p: 0.5,
                        "&:hover": {
                          bgcolor: "white",
                          color: COLORS.red,

                        },
                      }}>
                      <AddIcon sx={{ fontSize: 10 }} />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, pt: 3 }}>
                  {item.category}
                </Typography>
                <Typography sx={{ fontSize: 16, fontWeight: 600, color: COLORS.textDark, mt: 0.5 }}>
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" color="error" sx={{ mt: 0.5, fontWeight: 700 }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
}