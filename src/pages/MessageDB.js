import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { fetchMessage } from "../api/adminApi";
import { Context } from "../context/MainContext";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const MessageDB = () => {
  const { user } = useContext(Context);
  const [pageCount, setPageCount] = useState(1);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const handleFetchMessage = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const res = await fetchMessage(page, user?.accessToken);

          setMessages(res.data?.messages);
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

    handleFetchMessage();
  }, [user?.id, page, user?.accessToken]);

  console.log("messages", messages);

  return (
    <div className="messageDB">
      {loading ? (
        <Loading />
      ) : (
        <div className="messageDB__list">
          {messages?.map((message) => {
            return (
              <div key={message?._id} className="messageDB__list__item">
                <div className="messageDB__list__item__info">
                  <p>
                    <span>Name:</span> {message?.name}
                  </p>
                  <p>
                    <span>Email:</span> {message?.email}
                  </p>
                </div>
                <div className="messageDB__list__item__message">
                  <span>Message:</span> {message?.message}
                </div>
              </div>
            );
          })}
        </div>
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
  );
};

export default MessageDB;
