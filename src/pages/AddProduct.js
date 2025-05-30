import { useContext, useEffect, useState } from "react";
import {
  ErrorMessage,
  Input,
  Label,
  Select,
} from "../components/styledComponent/formInputs";
import { Context } from "../context/MainContext";
import { addProduct } from "../api/adminApi";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { links } from "./Shop";

const AddProduct = () => {
  const { user } = useContext(Context);
  const [inputError, setInputError] = useState({});
  const [img, setimg] = useState("");
  const [imgs, setimgs] = useState([]);
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
  const [categories, setCategories] = useState([]);
  const [uploadedFile, setuploadedFile] = useState(null);
  const [uploadedFiles, setuploadedFiles] = useState([]);

  // const categories = [
  //   "Evinrude Outboard Motor",
  //   "Evinrude Outboard Parts",
  //   "Honda Outboard Motor",
  //   "Honda Outboard Parts",
  //   "Johnson",
  //   "Marine Electronics",
  //   "Mecury Outboard Engine",
  //   "Mecury Outboard Parts",
  //   "Nissan",
  //   "Others",
  //   "Suzuki Outboard Motor",
  //   "Suzuki Outboard Parts",
  //   "Tools",
  //   "Trim n Tilt Repars",
  //   "Uncategorised",
  //   "Wholesale Lots",
  //   "Yamaha Outboard Motor",
  //   "Yamaha Outboard Parts",
  // ];

  const validate = () => {
    let nameError = "";
    let discriptionError = "";
    let priceError = "";
    let categoryError = "";
    let stockError = "";
    let uploadedFileError = "";

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
    if (!uploadedFile) {
      uploadedFileError = "cover image is required";
    }

    if (
      nameError ||
      discriptionError ||
      priceError ||
      categoryError ||
      stockError ||
      uploadedFileError
    ) {
      setInputError((curr) => {
        return {
          discription: discriptionError,
          name: nameError,
          price: priceError,
          category: categoryError,
          stock: stockError,
          uploadedFile: uploadedFileError,
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

      // let data = {
      //   name,
      //   discription,
      //   price,
      //   oldPrice,
      //   category,
      //   stock,
      //   weight,
      //   bestSeller,
      //   wholeSale,
      //   img,
      //   uploadedFile,
      //   uploadedFiles,
      // };
      let formData = new FormData();
      formData.append("name", name);
      formData.append("discription", discription);
      formData.append("price", price);
      formData.append("oldPrice", oldPrice);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("weight", weight);
      formData.append("bestSeller", bestSeller);
      formData.append("wholeSale", wholeSale);
      // formData.append("img", img);
      formData.append("uploadedFile", uploadedFile);

      for (let i = 0; i < uploadedFiles?.length; i++) {
        formData.append("uploadedFiles", uploadedFiles?.[i]);
      }

      try {
        await addProduct(formData, user?.accessToken);

        setLoading(false);
        toast.success("Product Added successfully");
        setname("");
        setimg("");
        setimgs([]);
        setuploadedFile(null);
        setuploadedFiles([]);
        setdiscription("");
        setprice("");
        setoldPrice("");
        setstock("");
        setcategory("");
        setweight("");
        setbestSeller(false);
        setwholeSale(false);
        window.location.reload();
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

    if (file?.size > 229715) {
      toast.warning("File too big, max size 200kb");
    } else {
      const base64 = await convertToBase64(file);
      setimg(base64);
      // setfileName(file?.name);
      setuploadedFile(file);
    }
  };

  const handleFilesUpload = async (e) => {
    let newImgs = [...imgs];
    let newUF = [...uploadedFiles];
    for (let i = 0; i < e.target.files?.length; i++) {
      // console.log("first", e.target.files[i]);
      const file = e.target.files[i];
      if (file?.size > 229715) {
        toast.warning("File too big, max size 200kb");
      } else {
        const base64 = await convertToBase64(file);
        newImgs.push(base64);
        // setfileName(file?.name);
        newUF.push(file);
      }
    }
    setuploadedFiles(newUF);
    setimgs(newImgs);
  };

  // console.log("first", uploadedFile);
  useEffect(() => {
    if (links.length > 0) {
      const newCat = links.map((link) => {
        const words = link.url?.split("-");

        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }

        const category = words.join(" ");

        return category;
      });

      setCategories(newCat);
    }
  }, []);

  return (
    <div className="addProduct">
      <h2>Add Product</h2>

      <div className="addProduct__form">
        <div className="addProduct__form__item">
          <Label htmlFor="street">
            Cover Image <span>*</span>
          </Label>
          {/* <br /> */}
          <div>
            {img && (
              <img src={img} alt="" style={{ width: 100, marginBottom: 10 }} />
            )}
          </div>
          <input
            id="cover"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => handleFileUpload(e)}
            accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
          />
          <label className="fileLabel" htmlFor="cover">
            <span>Max file size: 200kb</span>
          </label>
          <ErrorMessage style={{ top: 0 }} show={inputError?.uploadedFile}>
            {inputError?.uploadedFile}
          </ErrorMessage>
        </div>
        <div className="addProduct__form__item">
          <Label htmlFor="street">Other Images</Label>
          <button
            onClick={() => {
              setimgs([]);
              setuploadedFiles([]);
            }}
            style={{ marginLeft: 20, cursor: "pointer" }}
          >
            Clear all
          </button>
          <br />
          <div
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {imgs?.map((item, i) => {
              return (
                <img
                  key={i}
                  src={item}
                  alt=""
                  style={{ width: 100, marginBottom: 10 }}
                />
              );
            })}
          </div>
          <input
            id="images"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => handleFilesUpload(e)}
            accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
            multiple
          />
          <label className="fileLabel" htmlFor="images">
            <span> Multiple image uploads are supported.</span>
            <span>Max file size per image: 200kb</span>
          </label>
        </div>

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
