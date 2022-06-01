import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { MetaData } from "../commons/MetaData";
// import SideBar from "./SideBar";
import {
  updateProduct,
  getProductDetails,
  clearErrors,
} from "../../actions/productsAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";

const UpdateProduct = ({ match, history }) => {
  const [productModel, setModel] = useState("");
  const [productName, setName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [productDescription, setDescription] = useState("");
  const [category, setCategory] = useState("Select a product category");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [productType, setProductType] = useState("Select a product type");
  const [inventory, setInventory] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [ImagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.manageProducts);
  const { error, product } = useSelector((state) => state.productDetails);

  const productId = match.params.id;

  const genders = ["Select a gender", "men", "women", "kids"];

  const types = [
    "Select a type",
    "stitched",
    "unstitched",
    "accessories",
    "foot wear",
  ];

  const categories = [
    "Select a category",
    "Kurta",
    "Kurta Shalwar",
    "Prince Coats",
    "Waistcoats",
    "Sherwani",
    "Bottoms",
    "Denim",
    "Night suit",
    "T-Shirt",
    "Shirt",
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
  ];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setModel(product.productModel);
      setName(product.productName);
      setMaxPrice(product.productPriceMax);
      setMinPrice(product.productPriceMin);
      setDescription(product.productDescription);
      setColor(product.productColor);
      setGender(product.productGender);
      setProductType(product.productType);
      setCategory(product.productCategory);
      setInventory(product.inventory);
      setOldImages(product.productImages);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      history.push("/admin/products");
      alert.success("Product updated successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    alert,
    error,
    history,
    isUpdated,
    updateError,
    productId,
    product,
    dispatch,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    let newInventory = [];
    const checked = document.querySelectorAll("input[type='checkbox']:checked");

    checked.forEach((check) => {
      let inventoryData = {
        size: check.value,
        productStock: document.getElementById(check.value).value,
      };
      newInventory.push(inventoryData);
    });

    const formData = new FormData();
    formData.set("productModel", productModel);
    formData.set("productName", productName);
    formData.set("productPriceMax", maxPrice);
    formData.set("productPriceMin", minPrice);
    formData.set("productDescription", productDescription);
    formData.set("productType", productType);
    formData.set("productGender", gender);
    formData.set("productCategory", category);
    formData.set("productColor", color);
    formData.set("productGender", gender);
    formData.set("productType", productType);
    formData.set("inventory", JSON.stringify(newInventory));

    images.forEach((image) => {
      formData.append("productImages", image);
    });

    dispatch(updateProduct(product._id, formData));
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="wrapper container my-5">
        <form
          onSubmit={submitHandler}
          className="shadow-lg p-5"
          encType="application/x-www-form-urlencoded"
        >
          <h1 className="mb-4">Update Product</h1>

          <div className="form-group">
            <label htmlFor="model_field">Model</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              value={productModel}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name_field">Name</label>
            <input
              type="text"
              id="name_field"
              className="form-control"
              value={productName}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="max_price_field">Max Price</label>
            <input
              type="number"
              id="max_price_field"
              className="form-control"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="min_price_field">Min Price</label>
            <input
              type="number"
              id="min_price_field"
              className="form-control"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="color_field">Color</label>
            <input
              type="text"
              id="color_field"
              className="form-control"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Inventory</label>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <input type="checkbox" value="XS" name="size" /> XS
              </div>
              <div>
                Quantity: <input type="number" id="XS" max={1000} min={1} />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <input type="checkbox" value="S" name="size" /> S
              </div>
              <div>
                Quantity: <input type="number" id="S" max={1000} min={1} />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <input type="checkbox" value="M" name="size" /> M
              </div>
              <div>
                Quantity: <input type="number" id="M" max={1000} min={1} />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <input type="checkbox" value="L" name="size" /> L
              </div>
              <div>
                Quantity: <input type="number" id="L" max={1000} min={1} />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div>
                <input type="checkbox" name="size" value="XL" /> XL
              </div>
              <div>
                Quantity: <input type="number" id="XL" max={1000} min={1} />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div>
                <input type="checkbox" value="XXL" name="size" /> XXL
              </div>
              <div>
                Quantity: <input type="number" id="XXL" max={1000} min={1} />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description_field">Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              id="description_field"
              rows="8"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="gender_field">Gender</label>
            <select
              value={gender}
              className="form-control"
              id="gender_field"
              onChange={(e) => setGender(e.target.value)}
            >
              {genders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="type_field">Product Type</label>
            <select
              value={productType}
              className="form-control"
              id="type_field"
              onChange={(e) => setProductType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category_field">Category</label>
            <select
              value={category}
              className="form-control"
              id="category_field"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-">
            {/* <label>Images</label> */}
            <div className="custom-file">
              <input
                type="file"
                name="product_images"
                className="custom-file-input"
                id="customFile"
                multiple
                onChange={onChange}
                required
              />
              <label className="custom-file-label" htmlFor="customFile">
                Choose Images
              </label>
            </div>

            {oldImages &&
              oldImages.map((img) => (
                <img
                  key={img.url}
                  src={img.url}
                  alt={img.url}
                  className="mt-3 me-2"
                  width="55"
                  height="52"
                />
              ))}

            {ImagesPreview.map((img) => (
              <img
                src={img}
                key={img}
                alt="Images Preview"
                width="55"
                height="52"
                className="mt-3 me-2"
              />
            ))}
          </div>

          <button
            id="login_button"
            type="submit"
            className="btn btn-block py-3 w-100"
            disabled={loading ? true : false}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
