import { useContext, useState } from "react";
import { Input, Label, Select } from "../components/styledComponent/formInputs";
import { Context } from "../context/MainContext";
import { addProduct } from "../api/adminApi";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const AddProduct = () => {
  const { user } = useContext(Context);
  const [inputError, setInputError] = useState({});
  const [img, setimg] = useState("");
  const [name, setname] = useState("");
  const [discription, setdiscription] = useState("");
  const [price, setprice] = useState("");
  const [oldPrice, setoldPrice] = useState("");
  const [category, setcategory] = useState("");
  const [stock, setstock] = useState("");
  const [weight, setweight] = useState("");
  const [bestSeller, setbestSeller] = useState(false);
  const [wholeSale, setwholeSale] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Evinrude Outboard Motor",
    "Evinrude Outboard Parts",
    "Honda Outboard Motor",
    "Honda Outboard Parts",
    "Johnson",
    "Marine Electronics",
    "Mecury Outboard Engine",
    "Mecury Outboard Parts",
    "Nissan",
    "Others",
    "Suzuki Outboard Motor",
    "Suzuki Outboard Parts",
    "Tools",
    "Trim n Tilt Repars",
    "Uncategorised",
    "Wholesale Lots",
    "Yamaha Outboard Motor",
    "Yamaha Outboard Parts",
  ];

  const validate = () => {
    let nameError = "";
    let discriptionError = "";
    let priceError = "";
    let categoryError = "";
    let stockError = "";

    if (!name) {
      nameError = "name is required, minimum 2 characters";
    }
    if (!discription) {
      discriptionError = "discription is required, minimum 2 characters";
    }
    if (!price) {
      priceError = "price is required";
    }
    if (!category) {
      categoryError = "category is required";
    }
    if (!stock) {
      stockError = "stock is required";
    }

    if (
      nameError ||
      discriptionError ||
      priceError ||
      categoryError ||
      stockError
    ) {
      setInputError((curr) => {
        return {
          ...curr,
          discription: discriptionError,
          name: nameError,
          price: priceError,
          category: categoryError,
          stock: stockError,
        };
      });
      return false;
    }
    return true;
  };

  const handleRadioChange = (event) => {
    event.currentTarget.value === "true"
      ? setwholeSale(true)
      : setwholeSale(false);
  };

  const handleRadioChangeAlt = (event) => {
    event.currentTarget.value === "true"
      ? setbestSeller(true)
      : setbestSeller(false);
  };

  const handleSubmit = async () => {
    const checkValidate = validate();
    if (checkValidate && user?.id) {
      setInputError({});
      setLoading(true);

      let data = {
        name,
        discription,
        price,
        oldPrice,
        category,
        stock,
        weight,
        bestSeller,
        wholeSale,
        img,
      };

      try {
        await addProduct(data, user?.accessToken);

        setLoading(false);
        toast.success("Product Added successfully");
        setname("");
        setimg("");
        setdiscription("");
        setprice("");
        setoldPrice("");
        setstock("");
        setcategory("");
        setweight("");
        setbestSeller(false);
        setwholeSale(false);
      } catch (err) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setimg(base64);
  };

  return (
    <div className="addProduct">
      <h2>Add Product</h2>

      <div className="addProduct__form">
        <div className="addProduct__form__item">
          <Label htmlFor="street">Image</Label>
          <br />
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>
        <br />
        <div className="addProduct__form__item">
          <Label htmlFor="name">
            Name <span>*</span>
          </Label>
          <Input
            id="name"
            type="text"
            error={inputError.name ? true : false}
            onChange={(e) => setname(e.target.value)}
            value={name}
          />
        </div>

        <div className="addProduct__form__item">
          <Label htmlFor="description">
            Description <span>*</span>
          </Label>
          <Input
            id="description"
            type="text"
            error={inputError.discription ? true : false}
            onChange={(e) => setdiscription(e.target.value)}
            value={discription}
          />
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="price">
            Price <span>*</span>
          </Label>
          <Input
            id="price"
            type="number"
            error={inputError.price ? true : false}
            onChange={(e) => setprice(e.target.value)}
            value={price}
          />
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="oldPrice">Old Price</Label>
          <Input
            id="oldPrice"
            type="number"
            onChange={(e) => setoldPrice(e.target.value)}
            value={oldPrice}
          />
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="Category">
            Category <span>*</span>
          </Label>
          <Select
            id="Category"
            error={inputError.category ? true : false}
            onChange={(e) => setcategory(e.target.value)}
            value={category}
          >
            <option value="">--</option>
            {categories.map((cat, i) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="Stock">
            Stock <span>*</span>
          </Label>
          <Input
            id="Stock"
            type="number"
            error={inputError.stock ? true : false}
            onChange={(e) => setstock(e.target.value)}
            value={stock}
          />
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="weight">weight</Label>
          <Input
            id="weight"
            type="number"
            error={inputError.weight ? true : false}
            onChange={(e) => setweight(e.target.value)}
            value={weight}
          />
        </div>
        <br />
        <div>
          <div className="addProduct__form__item">
            <Label htmlFor="">Best Seller</Label>
            <br />
            <input
              type="radio"
              id="bestTrue"
              value="true"
              name="best"
              checked={bestSeller === true}
              onChange={handleRadioChangeAlt}
            />{" "}
            <label htmlFor="bestTrue">True</label>
            <input
              type="radio"
              id="bestFalse"
              value="false"
              name="best"
              checked={bestSeller === false}
              onChange={handleRadioChangeAlt}
            />{" "}
            <label htmlFor="bestFalse">False</label>
          </div>
          <br />
          <div className="addProduct__form__item">
            <Label htmlFor="">Whole Sale</Label>
            <br />
            <input
              type="radio"
              id="wholeTrue"
              value="true"
              name="whole"
              checked={wholeSale === true}
              onChange={handleRadioChange}
            />{" "}
            <label htmlFor="wholeTrue">True</label>
            <input
              type="radio"
              id="wholeFalse"
              value="false"
              name="whole"
              checked={wholeSale === false}
              onChange={handleRadioChange}
            />{" "}
            <label htmlFor="wholeFalse">False</label>
          </div>
        </div>
      </div>

      <div className="addProduct__btn">
        <button className="btn" onClick={handleSubmit}>
          {loading ? <Loading button={true} /> : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
