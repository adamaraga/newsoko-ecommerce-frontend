import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ProductItemCard from "../components/ProductItemCard";
import { Context } from "../context/MainContext";
import { productsFetchSuccess } from "../context/Action";
import { toast } from "react-toastify";
import {
  fetchProducts,
  fetchProductsBySearch,
  fetchProductsBycategory,
} from "../api/usersApi";
import ReactPaginate from "react-paginate";
import Loading from "../components/Loading";

export const links = [
  {
    name: "accessories Hose",
    url: "accessories-Hose",
  },
  {
    name: "accessories Pump",
    url: "accessories-pump",
  },
  {
    name: "accessories Anchors",
    url: "accessories-anchors",
  },
  {
    name: "accessories Lift Vest",
    url: "accessories-lift-vest",
  },
  {
    name: "accessories Steering",
    url: "accessories-steering",
  },
  {
    name: "accessories Baits & Tackles",
    url: "accessories-baits-&-tackles",
  },
  {
    name: "accessories Fishing Rods",
    url: "accessories-fishing-rods",
  },
  {
    name: "Boats 4 sale ",
    url: "boats-4-sale",
  },
  {
    name: "Books/Publications Manuals",
    url: "books-publications-manuals",
  },
  {
    name: "Books/Publications Used books",
    url: "books-publications-used-books",
  },
  {
    name: "evinrude Outboard Motor",
    url: "evinrude-outboard-motor",
  },
  {
    name: "evinrude Outboard Parts",
    url: "evinrude-outboard-parts",
  },
  {
    name: "honda Outboard Motor",
    url: "honda-outboard-motor",
  },
  {
    name: "honda Outboard Parts",
    url: "honda-outboard-parts",
  },
  {
    name: "Jetski",
    url: "jetski",
  },
  {
    name: "johnson",
    url: "johnson",
  },
  {
    name: "marine electronics",
    url: "marine-electronics",
  },
  {
    name: "mecury Outboard engine",
    url: "mecury-outboard-engine",
  },
  {
    name: "mecury Outboard Parts",
    url: "mecury-outboard-parts",
  },
  {
    name: "mecury Complete Engine",
    url: "mecury-complete-engine",
  },
  {
    name: "mecury New parts",
    url: "mecury-new-parts",
  },
  {
    name: "mecury Used Parts",
    url: "mecury-used-parts",
  },
  {
    name: "nissan",
    url: "nissan",
  },
  {
    name: "OMC Complete Engine",
    url: "omc-complete-engine",
  },
  {
    name: "OMC New parts",
    url: "omc-new-parts",
  },
  {
    name: "OMC Used Parts",
    url: "omc-used-parts",
  },
  {
    name: "others",
    url: "others",
  },
  {
    name: "Propellers",
    url: "propellers",
  },
  {
    name: "suzuki Outboard Motor",
    url: "suzuki-outboard-motor",
  },
  {
    name: "suzuki Outboard Parts",
    url: "suzuki-outboard-parts",
  },
  {
    name: "suzuki Complete Engine",
    url: "suzuki-complete-engine",
  },
  {
    name: "suzuki New parts",
    url: "suzuki-new-parts",
  },
  {
    name: "suzuki Used Parts",
    url: "suzuki-used-parts",
  },
  {
    name: "tools",
    url: "tools",
  },
  {
    name: "Trim n Tilt Repars",
    url: "trim-n-tilt-repars",
  },
  {
    name: "Uncategorised",
    url: "uncategorised",
  },
  {
    name: "Volvo Penta Complete Engine",
    url: "volvo-penta-complete-engine",
  },
  {
    name: "Volvo Penta New parts",
    url: "volvo-penta-new-parts",
  },
  {
    name: "Volvo Penta Used Parts",
    url: "volvo-penta-used-parts",
  },
  {
    name: "Wholesale Lots",
    url: "wholesale-lots",
  },
  {
    name: "Yamaha Outboard Motor",
    url: "yamaha-outboard-motor",
  },
  {
    name: "Yamaha Outboard Parts",
    url: "yamaha-outboard-parts",
  },
  {
    name: "Yamaha Complete Engine",
    url: "yamaha-complete-engine",
  },
  {
    name: "Yamaha New parts",
    url: "yamaha-new-parts",
  },
  {
    name: "Yamaha Used Parts",
    url: "yamaha-used-parts",
  },
];

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { dispatch, products } = useContext(Context);

  const { name, cat } = useParams();
  const { pathname } = useLocation();

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  const updateName = () => {
    // let category = "";
    // switch (cat) {
    //   case "yamaha-outboard-parts":
    //     category = "Yamaha Outboard Parts";
    //     break;
    //   case "evinrude-outboard-motor":
    //     category = "Evinrude Outboard Motor";
    //     break;
    //   case "evinrude-outboard-parts":
    //     category = "Evinrude Outboard Parts";
    //     break;
    //   case "honda-outboard-motor":
    //     category = "Honda Outboard Motor";
    //     break;
    //   case "honda-outboard-parts":
    //     category = "Honda Outboard Parts";
    //     break;
    //   case "johnson":
    //     category = "Johnson";
    //     break;
    //   case "marine-electronics":
    //     category = "Marine Electronics";
    //     break;
    //   case "mecury-outboard-engine":
    //     category = "Mecury Outboard Engine";
    //     break;
    //   case "mecury-outboard-parts":
    //     category = "Mecury Outboard Parts";
    //     break;
    //   case "nissan":
    //     category = "Nissan";
    //     break;
    //   case "others":
    //     category = "Others";
    //     break;
    //   case "suzuki-outboard-motor":
    //     category = "Suzuki Outboard Motor";
    //     break;
    //   case "suzuki-outboard-parts":
    //     category = "Suzuki Outboard Parts";
    //     break;
    //   case "tools":
    //     category = "Tools";
    //     break;
    //   case "trim-tilt-repars":
    //     category = "Trim n Tilt Repars";
    //     break;
    //   case "uncategorised":
    //     category = "Uncategorised";
    //     break;
    //   case "wholesale-lots":
    //     category = "Wholesale Lots";
    //     break;
    //   case "yamaha-outboard-motor":
    //     category = "Yamaha Outboard Motor";
    //     break;
    //   default:
    //     category = "";
    //     break;
    // }

    // const newString = cat.replace(/-/g, " ");

    if (cat) {
      const words = cat?.split("-");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }

      const category = words.join(" ");

      return category;
    }
  };

  useEffect(() => {
    const handleMessageCount = async () => {
      setLoading(true);

      const category = updateName();

      try {
        const fetch = name
          ? fetchProductsBySearch(name, pageNo)
          : category
          ? fetchProductsBycategory(pageNo, category)
          : fetchProducts(pageNo);
        const res = await fetch;
        dispatch(productsFetchSuccess(res.data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        toast.error(message);
      }
    };

    handleMessageCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, name, cat, pageNo, pathname]);

  useEffect(() => {
    if (products) {
      setPageCount(products.totalPages);
    }
  }, [products]);

  useEffect(() => {
    setPageNo(1);
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageNo, cat]);

  return (
    <div className="shop">
      <div className="shop__left">
        <h2 className="shop__left__header">PRODUCT CATEGORIES</h2>

        <ul className="shop__left__cats">
          {links.map((link, i) => {
            return (
              <li key={i} className="shop__left__cats__item">
                <Link to={"/products/" + link.url}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="shop__right">
        <h2 className="shop__left__header">
          {name ? name : cat ? updateName() : "SHOP"}
        </h2>

        {loading ? (
          <Loading />
        ) : products?.products?.length > 0 ? (
          <div className="shop__right__products">
            {products?.products?.map((product, i) => {
              return <ProductItemCard key={i} product={product} />;
            })}
          </div>
        ) : (
          <h6 style={{ textAlign: "center", fontSize: 20 }}>
            No product found
          </h6>
        )}

        {pageCount > 1 && (
          <div style={{ marginTop: 40 }}>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              pageCount={pageCount}
              breakLabel="..."
              //   renderOnZeroPageCount={null}
              onPageChange={handlePageClick}
              // pageRangeDisplayed={itemsPerPage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
