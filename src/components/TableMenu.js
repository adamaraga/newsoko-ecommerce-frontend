import React, { useContext, useRef, useState } from "react";
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Context } from "../context/MainContext";
import { deleteProduct } from "../api/adminApi";
import Loading from "./Loading";

const TableMenu = ({ id, setRefresh }) => {
  const { user } = useContext(Context);
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (user?.id) {
      setLoading(true);
      try {
        await deleteProduct(user?.accessToken, id);

        toast.success("Product deleted successfully");
        setModalIsOpen(false);
        setLoading(false);
        setRefresh((curr) => !curr);
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

  return (
    <div className="tableMenu">
      <span className="tableMenu__icon" ref={ref} {...anchorProps}>
        :
      </span>

      <ControlledMenu
        {...hoverProps}
        state={isOpen ? "open" : "closed"}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        <Link to={"/dashboard/products/edit/" + id}>
          <MenuItem>Edit</MenuItem>
        </Link>
        <MenuItem onClick={() => setModalIsOpen(true)}>Delete</MenuItem>
      </ControlledMenu>

      <Modal
        className="modalMain"
        overlayClassName="modal-overlayCenter"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Cart Modal"
      >
        <div className="tableMenu__modal">
          <h4>Are you sure</h4>
          <p>
            You are about to delete a product, this process cannot be undone
          </p>
          <div className="tableMenu__modal__btn">
            <button
              className="tableMenu__modal__btn__item"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="tableMenu__modal__btn__item delete"
            >
              {loading ? <Loading button={true} /> : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableMenu;
