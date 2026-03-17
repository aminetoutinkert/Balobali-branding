import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import products from "./products.js";
import { connectDB } from "../config/db.js";

dotenv.config(); // Load from the current working directory (.env in server root)

connectDB();

const seedDatabase = async () => {
  try {
    // 1. Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // 2. Create Admin and VIP User
    const createdUsers = await User.create([
      {
        name: "Admin Balobali",
        email: "admin@balobali.com",
        password: "password123",
        role: "admin",
        phoneNumber: "0600000000",
        address: "Marrakesh, Morocco",
        isVerified: true,
      },
      {
        name: "VIP Client",
        email: "client@luxe.com",
        password: "password123",
        phoneNumber: "0611111111",
        address: "Casablanca, Morocco",
        role: "user",
      },
    ]);

    const adminUser = createdUsers[0]._id;

    // 3. Map products to the database with images
    const sampleProducts = products.map((p) => {
      // Use p.images if it exists, otherwise use p.imagePath, otherwise unsplash
      let finalImages = [];
      if (p.images && p.images.length > 0) {
        finalImages = p.images;
      } else if (p.imagePath) {
        finalImages = [p.imagePath];
      } else {
        finalImages = [
          p.query
            ? `https://source.unsplash.com/800x1200/?luxury,${p.query},fashion`
            : "https://source.unsplash.com/800x1100/?luxury,fashion",
        ];
      }
      return {
        ...p,
        images: finalImages,
      };
    });

    await Product.insertMany(sampleProducts);

    console.log("Luxury Catalog Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error with seeder: ${error.message}`);
    process.exit(1);
  }
};

const destroyDatabase = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyDatabase();
} else {
  seedDatabase();
}
