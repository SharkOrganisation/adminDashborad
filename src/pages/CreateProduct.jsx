import React, { useState } from "react";
import { FIREBASE_APP } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
function CreateProduct() {
  const [productImages, setProductImages] = useState("");
  const [imageUrls, setImageUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleProductImageChange = (e) => {
    const productPics = e.target.files;
    if (productPics.length > 0) {
      setProductImages([...productImages, ...productPics]);
    }
  };

  const storeImages = async (files) => {
    setLoading(true);

    const storage = getStorage(FIREBASE_APP);
    const uploadTasks = [];

    for (const file of files) {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `productImages/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTasks.push(uploadTask);
    }

    try {
      await Promise.all(uploadTasks.map((uploadTask) => uploadTask));

      const downloadURLs = await Promise.all(
        uploadTasks.map(async (task) => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            return url;
          } catch (error) {
            console.error("Error retrieving download URL:", error);
            return null;
          }
        })
      );

      console.log("Download URLs:", downloadURLs);
      setImageUrls(downloadURLs);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/create/product",
        {
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          quantity: +quantity,
          catergory: productCategory,
          images: imageUrls,
        }
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-product-container">
      <form>
        <div className="input-container">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product name.."
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="fname">Product Images</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            onChange={handleProductImageChange}
            multiple
          />
          <button
            className="upload-btn"
            type="button"
            onClick={async () => {
              await storeImages(productImages);
            }}
            disabled={loading}
          >
            {loading ? "loading..." : "upload"}
          </button>
        </div>
        <div className="input-container">
          <label htmlFor="fname">Price $</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            placeholder="00.00 $"
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="fname">Quantity</label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            placeholder="0"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="Gym Equipments">Gym Equipments</option>
            <option value="protein">protein</option>
            <option value="clothes">clothes</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label> <br />
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            onChange={(e) => setProductDescription(e.target.value)}
          ></textarea>
        </div>
        <input onClick={onSubmit} type="button" value="Submit" />
      </form>
    </div>
  );
}

export default CreateProduct;
