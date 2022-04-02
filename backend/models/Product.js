const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      maxLength: [100, "Product Name can not exceed 100 characters"],
      required: [true, "Please provide a name for product"],
    },
    productPriceMax: {
      type: Number,
      maxLength: [5, "Product Price can not exceed 5 characters"],
      required: [true, "Please provide a maximum price for product"],
      default: 0.0,
    },
    productPriceMin: {
      type: Number,
      maxLength: [5, "Product Price can not exceed 5 characters"],
      required: [true, "Please provide a minimum price for product"],
      default: 0.0,
    },
    productDescription: {
      type: String,
      trim: true,
      maxLength: [1000, "Product description can not exceed 1000 characters"],
      required: [true, "Please provide a description for product"],
    },
    productGender: {
      type: String,
      required: [true, "Please provide the gender for product"],
    },
    productSizes: [
      {
        size: {
          type: String,
          maxLength: [4, "Product size can not exceed 4 characters"],
          required: [true, "Please select atleast one size for your product"],
        },
        productStock: {
          type: Number,
          required: [true, "Please provide product Stock"],
          maxLength: [5, "Product stock can not exceed 5 characters"],
          default: 0,
        },
        productColors: [
          {
            type: String,
            required: [true, "Please provide a color for your product"],
          },
        ],
      },
    ],
    productImages: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    productCategory: {
      type: String,
      required: [true, "Please select a category for this product"],
      enum: {
        values: ["stitched", "unstitched", "Accessories"],
        message: "Please select a correct category for your product",
      },
    },
    productSubCategory: {
      type: String,
      required: [true, "Please select a subcategory for your product"],
      enum: {
        values: [
          "Kurtas",
          "Kurta Shalwar",
          "Prince Coats",
          "Waistcoats",
          "Sherwani",
          "Bottoms",
          "Denim",
          "Night suits",
          "T-Shirts",
          "Shirts",
          "Gowns",
          "1 Piece",
          "2 Piece",
          "3 Piece",
          "Sweat Shirts",
          "Hoodies",
          "Pyjamas",
          "Shoulder Bags",
          "Mini Bags",
          "Backpacks",
          "Sneakers",
          "Heals",
          "Flat",
          "Slippers",
        ],
        required: [
          true,
          "Please select a correct subcategory for your product",
        ],
      },
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      max: 5,
      min: 0,
    },
    productReviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          trim: true,
          maxLength: [500, "Product review can not exceed 500 characters"],
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
