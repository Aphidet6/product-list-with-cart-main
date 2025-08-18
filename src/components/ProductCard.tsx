import { Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import products from "../data.json";

// Resolve image URLs from src/assets/images using Vite's glob (eager + url)
const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png}", { eager: true, as: "url" }) as Record<string, string>;


function ProductCard() {

  const allProducts = Array.isArray(products) ? products : [];

  type Product = {
  id: number;
  name: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
};

return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      
      {allProducts.map((product: Product) => {
        // resolve thumbnail path from data.json to the imported URL

        const thumbnailName = product.image && typeof product.image !== "string"
          ? product.image.thumbnail.split("/").pop()
          : null;
        const resolvedThumbnail = thumbnailName
          ? Object.entries(images).find(([key]) => key.endsWith(thumbnailName))?.[1]
          : typeof product.image === "string"
            ? product.image
            : undefined;

        return (
          <Card key={product.id} sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
            <CardMedia
              component="img"
              height="120"
              image={resolvedThumbnail ?? (typeof product.image === "string" ? product.image : "")}
              alt={product.name}
              sx={{ objectFit: "contain", maxWidth: 120, margin: "0 auto" }}
            />
            <CardContent>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">${product.price}</Typography>
              <Button 
                variant="outlined" 
                startIcon={<ShoppingCartIcon />} 
                sx={{ mt: 1, borderRadius: 5 }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </Card>
  );
}

export default ProductCard;