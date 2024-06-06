import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import ReactPaginate from "react-paginate";
import searchIcon from "../assets/images/svg/search.svg";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import {
  fetchDashboardCount,
  fetchUsers,
  fetchUsersBySearch,
} from "../api/adminApi";

const HomeDB = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [count, setCount] = useState(null);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

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
        const res = await fetchUsersBySearch(
          searchQuery,
          user?.accessToken,
          page
        );

        setUsers(res.data);
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
          const res = await fetchUsers(page, user?.accessToken);

          setUsers(res.data);
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

  useEffect(() => {
    const handleFetchCount = async () => {
      if (user?.id) {
        setLoadingCount(true);
        try {
          const res = await fetchDashboardCount(user?.accessToken);

          setCount(res.data);
          setLoadingCount(false);
        } catch (err) {
          setLoadingCount(false);
          const message =
            (err.response && err.response.data && err.response.data.message) ||
            err.message ||
            err.toString();
          toast.error(message);
        }
      }
    };

    handleFetchCount();
  }, [user?.id, user?.accessToken]);

  return (
    <div className="homeDB">
      {loadingCount ? (
        <Loading />
      ) : (
        <div className="homeDB__top">
          <div className="homeDB__top__card">
            <h4>Total Produts</h4>
            <p>{count?.product}</p>
          </div>
          <div className="homeDB__top__card">
            <h4>Total Users</h4>
            <p>{count?.user}</p>
          </div>
          <div className="homeDB__top__card">
            <h4>Total Orders</h4>
            <div className="homeDB__top__card__type">
              <div className="homeDB__top__card__type__item">
                <span>Initiated</span> {count?.orderInit}
              </div>
              <div className="homeDB__top__card__type__item">
                <span>Successful</span> {count?.orderSuc}{" "}
              </div>
              <div className="homeDB__top__card__type__item">
                <span>Total</span> {count?.order}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="homeDB__users">
        <h3>Users</h3>
        <div className="ordersDB__top__form" style={{ marginBottom: 30 }}>
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
        <div className="homeDB__users__table">
          <div className="homeDB__users__table__body">
            <div className="homeDB__users__table__row head">
              <div
                style={{ width: "30px" }}
                className="homeDB__users__table__row__head"
              >
                s/n
              </div>
              <div
                style={{ width: "150px" }}
                className="homeDB__users__table__row__head"
              >
                User Id
              </div>
              <div
                style={{ width: "100px" }}
                className="homeDB__users__table__row__head"
              >
                First name
              </div>
              <div
                style={{ width: "100px" }}
                className="homeDB__users__table__row__head"
              >
                Last name
              </div>
              <div
                style={{ width: "250px" }}
                className="homeDB__users__table__row__head"
              >
                Email
              </div>
            </div>

            {loading ? (
              <Loading />
            ) : (
              users?.users?.map((user, i) => {
                return (
                  <div key={user._id} className="homeDB__users__table__row">
                    <div
                      style={{ width: "30px" }}
                      className="homeDB__users__table__row__data"
                    >
                      {(page - 1) * 10 + (i + 1)}
                    </div>
                    <div
                      style={{ width: "150px" }}
                      className="homeDB__users__table__row__data"
                    >
                      {user._id}
                    </div>
                    <div
                      style={{ width: "100px" }}
                      className="homeDB__users__table__row__data"
                    >
                      {user?.firstName}
                    </div>
                    <div
                      style={{ width: "100px" }}
                      className="homeDB__users__table__row__data"
                    >
                      {user?.lastName}
                    </div>
                    <div
                      style={{ width: "250px" }}
                      className="homeDB__users__table__row__data"
                    >
                      {user?.email}
                    </div>
                  </div>
                );
              })
            )}
          </div>
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

export default HomeDB;
