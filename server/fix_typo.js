import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fix = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const names = collections.map(c => c.name);
    
    if (names.includes('proucts') && names.includes('products')) {
      const count = await db.collection('products').countDocuments();
      if (count === 0) {
        console.log('Renaming "proucts" to "products"...');
        // Drop empty 'products' first if it exists
        await db.collection('products').drop();
        await db.collection('proucts').rename('products');
        console.log('Successfully renamed!');
      } else {
        console.log('"products" collection is not empty, skipping rename.');
      }
    } else if (names.includes('proucts')) {
        console.log('Renaming "proucts" to "products"...');
        await db.collection('proucts').rename('products');
        console.log('Successfully renamed!');
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fix();
