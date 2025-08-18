import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';import data from "../data.json"; // import ข้อมูล JSON

// Resolve image URLs from src/assets/images using Vite's glob (eager + url)
const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

export default function ProductList() {
  return (
    <>
    <h1 className="text-3xl font-bold underline">
    Desserts
    </h1>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        padding: "20px",
      }}
    >
      {data.map((item: any) => {
        // get the desktop image path from JSON and resolve to the real URL
        const desktopPath = item?.image && typeof item.image !== "string" ? item.image.desktop : item.image;
        const filename = typeof desktopPath === "string" ? desktopPath.split("/").pop() : undefined;
        const resolvedDesktop = filename ? Object.entries(images).find(([key]) => key.endsWith(filename))?.[1] : undefined;

        return (
          <Card
            key={item.id}
            sx={{ borderRadius: "16px", overflow: "hidden" }}
          >
            {/* รูปภาพ */}
            <CardMedia
              component="img"
              height="200"
              image={resolvedDesktop ?? desktopPath ?? ""}
              alt={item.name}
            />

            {/* ปุ่ม Add to Cart */}
            <Button
              variant="outlined"
              startIcon={<AddShoppingCartIcon />}
              color="warning"
              sx={{
                margin: "-20px auto 0",
                display: "flex",
                borderRadius: "50px",
                width: "80%",
                backgroundColor: "hsl(20, 50%, 98%)",
              }}
            >
              Add to Cart
            </Button>

            {/* ข้อมูลสินค้า */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
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
