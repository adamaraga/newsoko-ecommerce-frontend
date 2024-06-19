import { useRef, useState } from "react";
import { ControlledMenu, MenuItem, useHover } from "@szhsin/react-menu";
import arrowdownIcon from "../assets/images/svg/arrowdown.svg";
import { Link } from "react-router-dom";

const HoverMenu = ({ links, drawer, setModalIsOpen }) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen);
  return (
    <>
      {/* <Link to={links.link}> */}
      <li
        className={
          drawer ? "drawer__modal__list__item" : "topbar__bottom__links__item"
        }
        ref={ref}
        {...anchorProps}
      >
        {links.name} <img src={arrowdownIcon} alt="" />
      </li>
      {/* </Link> */}

      <ControlledMenu
        {...hoverProps}
        state={isOpen ? "open" : "closed"}
        anchorRef={ref}
        onClose={() => setOpen(false)}
      >
        {links.subLinks.map((link, i) => {
          return (
            <Link key={i} to={link.link}>
              <MenuItem onClick={() => drawer && setModalIsOpen(false)}>
                {link.name}
              </MenuItem>
            </Link>
          );
        })}
      </ControlledMenu>
    </>
  );
};

export default HoverMenu;
