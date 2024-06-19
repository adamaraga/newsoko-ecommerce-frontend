import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import searchIcon from "../assets/images/svg/search.svg";
import { Context } from "../context/MainContext";
import { fetchOrders, fetchOrdersBySearch } from "../api/adminApi";
import { toast } from "react-toastify";

const OrdersDB = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState([]);

  const formattingOption = {
    style: "currency",
    currency: "NGN",
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
        const res = await fetchOrdersBySearch(
          searchQuery,
          user?.accessToken,
          page
        );

        setOrders(res.data?.orders);
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
    const handleFetchUsers = async () => {
      if (user?.id && searchQuery === "") {
        setLoading(true);
        try {
          const res = await fetchOrders(page, user?.accessToken);

          setOrders(res.data?.orders);
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

    handleFetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, page, user?.accessToken]);

  return (
    <div className="OrdersDB">
      <div className="ordersDB__top__form" style={{ marginBottom: 30 }}>
        <input
          placeholder="Search by Order/Payment Id (Paypal)"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button onClick={handleSearch}>
          <img src={searchIcon} alt="" />
        </button>
      </div>
      <div className="homeDB__users__table">
        <div className="homeDB__users__table__body" style={{ minWidth: 1100 }}>
          <div className="homeDB__users__table__row head">
            <div
              style={{ width: "30px" }}
              className="homeDB__users__table__row__head"
            >
              s/n
            </div>
            <div
              style={{ width: "200px" }}
              className="homeDB__users__table__row__head"
            >
              Id
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Date
            </div>
            <div
              style={{ width: "150px" }}
              className="homeDB__users__table__row__head"
            >
              Order/Payment Id (Paypal)
            </div>
            <div
              style={{ width: "120px" }}
              className="homeDB__users__table__row__head"
            >
              Payment Status
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            >
              Order Status
            </div>
            <div
              style={{ width: "150px" }}
              className="homeDB__users__table__row__head"
            >
              Total Amount
            </div>
            <div
              style={{ width: "100px" }}
              className="homeDB__users__table__row__head"
            ></div>
          </div>

          {loading ? (
            <Loading />
          ) : (
            orders.map((order, i) => {
              return (
                <div key={order._id} className="homeDB__users__table__row">
                  <div
                    style={{ width: "30px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {(page - 1) * 10 + (i + 1)}
                  </div>
                  <div
                    style={{ width: "200px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {order?._id}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {order?.createdAt?.slice(0, 10)}
                  </div>
                  <div
                    style={{ width: "150px" }}
                    className="homeDB__users__table__row__data"
                  >
                    <div className="homeDB__users__table__row__data__disc">
                      {order?.paymentId}
                    </div>
                  </div>
                  <div
                    style={{ width: "120px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {order?.paymentStatus}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {order?.paymentStatus === "Initiated"
                      ? "Pending"
                      : "Processing"}
                  </div>
                  <div
                    style={{ width: "150px" }}
                    className="homeDB__users__table__row__data"
                  >
                    {order?.bill?.toLocaleString("en-NG", formattingOption)}
                  </div>
                  <div
                    style={{ width: "100px" }}
                    className="homeDB__users__table__row__data"
                  >
                    <Link to={"/dashboard/orders/" + order?._id}>
                      <button className="homeDB__users__table__row__data__btn">
                        More Details
                      </button>
                    </Link>
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

export default OrdersDB;
