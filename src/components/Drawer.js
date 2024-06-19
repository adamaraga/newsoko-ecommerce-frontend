import { useState } from "react";
import maskIcon from "../assets/images/svg/Mask.svg";
import Modal from "react-modal";
import { Link, useLocation } from "react-router-dom";
import HoverMenu from "./HoverMenu";

const Drawer = ({ links }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="drawer">
      <img
        src={maskIcon}
        onClick={() => setModalIsOpen(true)}
        className="topbar__top__left__searchSmall"
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
        <div className="drawer__modal">
          <div
            className="drawer__modal__close"
            onClick={() => setModalIsOpen(false)}
          >
            x
          </div>
          <ul className="drawer__modal__list">
            {links.map((link, i) => {
              return (
                <div key={i}>
                  {link.dropDown ? (
                    <HoverMenu
                      links={link}
                      drawer={true}
                      setModalIsOpen={setModalIsOpen}
                    />
                  ) : (
                    <Link to={link.link}>
                      <li
                        onClick={() => setModalIsOpen(false)}
                        className={
                          pathname === link.link
                            ? "drawer__modal__list__item active"
                            : pathname === "/" && link.name === "home"
                            ? "drawer__modal__list__item active"
                            : "drawer__modal__list__item"
                        }
                      >
                        {link.name}
                      </li>
                    </Link>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default Drawer;
