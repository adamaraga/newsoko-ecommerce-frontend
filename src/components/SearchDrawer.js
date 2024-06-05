import searchIcon from "../assets/images/svg/search.svg";
import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

const SearchDrawer = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (name) {
      navigate(`shop/${name}`);
      setName("");
      setModalIsOpen(false);
    }
  };

  return (
    <div className="searchDrawer">
      <img
        onClick={() => setModalIsOpen(true)}
        src={searchIcon}
        className="topbar__top__left__searchSmall"
        alt=""
        style={{ cursor: "pointer" }}
      />

      <Modal
        className="modalMain"
        overlayClassName="modal-overlayCenter"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Cart Modal"
      >
        <div
          className="topbar__top__form"
          style={{ display: "block", width: "90vw", maxWidth: 400 }}
        >
          <input
            placeholder="Search..."
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <button onClick={handleSearch}>
            <img src={searchIcon} alt="" />
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SearchDrawer;
