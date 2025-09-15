require("dotenv").config();
const mongoose = require("mongoose");
const { Client } = require("@elastic/elasticsearch");
const Product = require("./src/models/productModel"); // sửa đúng path

const client = new Client({ node: "http://localhost:9200" });

mongoose.connect(process.env.MONGO_DB_URL).then(async () => {
  console.log("✅ Connected to MongoDB");

  try {
    const products = await Product.find();

    if (!products.length) {
      console.log("⚠️ No products found in MongoDB");
      process.exit();
    }

    // Chuyển products thành mảng bulk body
    const body = products.flatMap((doc) => [
      { index: { _index: "products", _id: doc._id.toString() } },
      {
        name: doc.name,
        price: doc.price,
        description: doc.description,
        category: doc.category,
      },
    ]);

    const bulkResponse = await client.bulk({ refresh: true, body: body });

    if (!bulkResponse) {
    console.error("Bulk response is undefined. Check your request body.");
    return;
    }

    if (bulkResponse.errors) {
    console.error("Some documents failed to index:", bulkResponse);
    } else {
    console.log("✅ Sync success, all documents indexed.");
    }

  } catch (err) {
    console.error("Sync error:", err);
  } finally {
    mongoose.disconnect();
  }
});
