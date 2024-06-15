import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import searchIcon from "../assets/images/svg/search.svg";
import TableMenu from "../components/TableMenu";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import { fetchProducts, fetchProductsBySearch } from "../api/usersApi";
import placeholder from "../assets/images/product-placeholder.png";

const ProductsDB = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);

  const formattingOption = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
    if (searchQuery) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (searchQuery && user?.id) {
      setLoading(true);
      try {
        const res = await fetchProductsBySearch(searchQuery, page);

        setProducts(res.data?.products);
        setPageCount(res.data.totalPages);
        setLoading(false);
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

  useEffect(() => {
    const handleFetchProducts = async () => {
      if (user?.id && searchQuery === "") {
        setLoading(true);
        try {
          const res = await fetchProducts(page);

          setProducts(res.data?.products);
          setPageCount(res.data.totalPages);
          setLoading(false);
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

    handleFetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, page, user?.accessToken, refresh]);

  return (
    <div className="ordersDB">
      <div className="ordersDB__top">
        <div className="ordersDB__top__form">
          <input
            placeholder="Search by name"
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <div>
          <Link to="/dashboard/products/add">
            <button className="btn">Add Product</button>
          </Link>
        </div>
      </div>
      <div className="homeDB__users__table">
        <div className="homeDB__users__table__body" style={{ minWidth: 1300 }}>
          <div className="homeDB__users__table__row head">
            <div
              style={{ width: "30px" }}
              className="homeDB__users__table__row__head"
            >
              s/n
            </div>
            <div
              style={{ width: "220px" }}
              className="homeDB__users__table__row__head"
            >
              Id
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Image
            </div>
            <div
              style={{ width: "250px" }}
              className="homeDB__users__table__row__head"
            >
              Name
            </div>

            <div
              style={{ width: "120px" }}
              className="homeDB__users__table__row__head"
            >
              Price
            </div>
            <div
              style={{ width: "150px" }}
              className="homeDB__users__table__row__head"
            >
              Category
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Stock
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Best Seller
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Whole Sale
            </div>
            <div
              style={{ width: "50px" }}
              className="homeDB__users__table__row__head"
            ></div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            products.map((product, i) => {
              return (
                <div key={product?._id} className="homeDB__users__table__row">
                  <div
                    style={{ width: "30px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {(page - 1) * 10 + (i + 1)}
                  </div>
                  <div
                    style={{ width: "220px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?._id}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    <img
                      style={{ height: 50 }}
                      src={product?.img ? product?.img : placeholder}
                      alt=""
                    />
                  </div>
                  <div
                    style={{ width: "250px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.name}
                  </div>

                  <div
                    style={{ width: "120px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.price?.toLocaleString("en-US", formattingOption)}
                  </div>
                  <div
                    style={{ width: "150px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.category}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.stock}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.bestSeller ? "True" : "False"}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {product?.wholeSale ? "True" : "False"}
                  </div>
                  <div
                    style={{ width: "50px" }}
                    className="homeDB__users__table__row__data"
                  >
                    <TableMenu id={product?._id} setRefresh={setRefresh} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

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
  );
};

export default ProductsDB;
