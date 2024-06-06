import { useState } from "react";
import maskIcon from "../assets/images/svg/Mask.svg";
import Sidebar from "./Sidebar";
import Modal from "react-modal";

const DrawerDB = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="drawerDB">
      <img
        src={maskIcon}
        onClick={() => setModalIsOpen(true)}
        alt=""
        style={{ cursor: "pointer" }}
      />
      <Modal
        className="modalMain"
        overlayClassName="modal-overlayAlt"
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Cart Modal"
      >
        <Sidebar drawer={true} setModalIsOpen={setModalIsOpen} />
      </Modal>
    </div>
  );
};

export default DrawerDB;
