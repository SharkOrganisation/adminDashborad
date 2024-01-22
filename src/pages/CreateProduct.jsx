import React from "react";

function CreateProduct() {
  return (
    <div className="create-product-container">
      <form action="/action_page.php">
        <div className="input-container">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Product name.."
          />
        </div>
        <div className="input-container">
          <label htmlFor="fname">Product Images</label>
          <input type="file" id="images" name="images"  />
          <button className="upload-btn">upload</button>
        </div>
        <div className="input-container">
          <label htmlFor="fname">Price $</label>
          <input type="number" id="price" name="price" placeholder="00.00 $" />
        </div>
        <div className="input-container">
          <label htmlFor="category">Category</label>
          <select id="category" name="category">
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
            $
          ></textarea>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default CreateProduct;
