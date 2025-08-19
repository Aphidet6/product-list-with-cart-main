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
      <h1 className="text-3xl font-bold underline">Desserts</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
          padding: "20px",
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
            <Card key={item.id} sx={{ borderRadius: "16px", overflow: "hidden" }}>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={resolvedDesktop ?? (desktopPath as string) ?? ""}
                  alt={item.name}
                />

                {quantity === 0 ? (
                  <Button
                    variant="outlined"
                    startIcon={<AddShoppingCartIcon />}
                    color="warning"
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "50px",
                      width: "80%",
                      backgroundColor: "hsl(20, 50%, 98%)",
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
                      borderRadius: "50px",
                      width: "80%",
                      backgroundColor: "#c2410c",
                      color: "white",
                      px: 2,
                    }}
                  >
                    <IconButton onClick={() => handleDecrease(item.id)} sx={{ color: "white" }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ color: "white", mx: 1 }}>{quantity}</Typography>
                    <IconButton onClick={() => handleIncrease(item.id)} sx={{ color: "white" }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ pt: 2 }}>
                  {item.category}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" color="error">
                  ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}