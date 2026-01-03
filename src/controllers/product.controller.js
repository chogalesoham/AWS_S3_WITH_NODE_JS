const Product = require("../models/Product");
const s3 = require("../config/s3");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => file.location);

    const product = await Product.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  const updates = req.body;

  if (req.files?.length) {
    updates.images = req.files.map(file => file.location);
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  );

  res.json(product);
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  // delete images from S3
  for (const url of product.images) {
    const Key = url.split(".com/")[1];
    await s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
    }).promise();
  }

  await product.deleteOne();
  res.json({ message: "Product deleted" });
};
