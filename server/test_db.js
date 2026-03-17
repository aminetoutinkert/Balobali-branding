import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const test = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check 'products' collection count
    const count = await mongoose.connection.db.collection('products').countDocuments();
    console.log('Count in "products":', count);
    
    // Check 'proucts' collection count
    const countTypo = await mongoose.connection.db.collection('proucts').countDocuments();
    console.log('Count in "proucts":', countTypo);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

test();
