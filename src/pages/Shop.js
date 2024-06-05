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

const Shop = () => {
  const links = [
    {
      name: "evinrude Outboard Motor",
      url: "/products/evinrude-outboard-motor",
    },
    {
      name: "evinrude Outboard Parts",
      url: "/products/evinrude-outboard-parts",
    },
    {
      name: "honda Outboard Motor",
      url: "/products/honda-outboard-motor",
    },
    {
      name: "honda Outboard Parts",
      url: "/products/honda-outboard-parts",
    },
    {
      name: "johnson",
      url: "/products/johnson",
    },
    {
      name: "marine electronics",
      url: "/products/marine-electronics",
    },
    {
      name: "mecury Outboard engine",
      url: "/products/mecury-outboard-engine",
    },
    {
      name: "mecury Outboard Parts",
      url: "/products/mecury-outboard-parts",
    },
    {
      name: "nissan",
      url: "/products/nissan",
    },
    {
      name: "others",
      url: "/products/others",
    },
    {
      name: "suzuki Outboard Motor",
      url: "/products/suzuki-outboard-motor",
    },
    {
      name: "suzuki Outboard Parts",
      url: "/products/suzuki-outboard-parts",
    },
    {
      name: "tools",
      url: "/products/tools",
    },
    {
      name: "Trim n Tilt Repars",
      url: "/products/trim-tilt-repars",
    },
    {
      name: "Uncategorised",
      url: "/products/uncategorised",
    },
    {
      name: "Wholesale Lots",
      url: "/products/wholesale-lots",
    },
    {
      name: "Yamaha Outboard Motor",
      url: "/products/yamaha-outboard-motor",
    },
    {
      name: "Yamaha Outboard Parts",
      url: "/products/yamaha-outboard-parts",
    },
  ];

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
    let category = "";
    switch (cat) {
      case "yamaha-outboard-parts":
        category = "Yamaha Outboard Parts";
        break;
      case "evinrude-outboard-motor":
        category = "Evinrude Outboard Motor";
        break;
      case "evinrude-outboard-parts":
        category = "Evinrude Outboard Parts";
        break;
      case "honda-outboard-motor":
        category = "Honda Outboard Motor";
        break;
      case "honda-outboard-parts":
        category = "Honda Outboard Parts";
        break;
      case "johnson":
        category = "Johnson";
        break;
      case "marine-electronics":
        category = "Marine Electronics";
        break;
      case "mecury-outboard-engine":
        category = "Mecury Outboard Engine";
        break;
      case "mecury-outboard-parts":
        category = "Mecury Outboard Parts";
        break;
      case "nissan":
        category = "Nissan";
        break;
      case "others":
        category = "Others";
        break;
      case "suzuki-outboard-motor":
        category = "Suzuki Outboard Motor";
        break;
      case "suzuki-outboard-parts":
        category = "Suzuki Outboard Parts";
        break;
      case "tools":
        category = "Tools";
        break;
      case "trim-tilt-repars":
        category = "Trim n Tilt Repars";
        break;
      case "uncategorised":
        category = "Uncategorised";
        break;
      case "wholesale-lots":
        category = "Wholesale Lots";
        break;
      case "yamaha-outboard-motor":
        category = "Yamaha Outboard Motor";
        break;
      default:
        category = "";
        break;
    }

    return category;
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
  }, [pageNo]);

  return (
    <div className="shop">
      <div className="shop__left">
        <h2 className="shop__left__header">PRODUCT CATEGORIES</h2>

        <ul className="shop__left__cats">
          {links.map((link, i) => {
            return (
              <li key={i} className="shop__left__cats__item">
                <Link to={link.url}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="shop__right">
        <h2 className="shop__left__header">
          {name ? name : cat ? cat : "SHOP"}
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
