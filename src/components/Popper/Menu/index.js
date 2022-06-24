import Tippy from "@tippyjs/react/headless";
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import style from "./Menu.module.scss";
import MenuItem from "./MenuItem";
import Header from "./Header";

const cx = classNames.bind(style);
const defaultFn = () => {};
function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]);
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };
  const renderResult = (attrs) => (
    <div className={cx("content")} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx("menu-popper")}>
        {history.length > 1 && (
          <Header
            title={current.title}
            onBack={() => {
              setHistory((prev) => prev.slice(0, prev.length - 1));
            }}
          />
        )}
        <div className={cx("menu-body")}>{renderItem()}</div>
      </PopperWrapper>
    </div>
  );
  const handleResetToFirstPages = () => {
    setHistory((prev) => prev.slice(0, 1));
  };
  return (
    <div>
      <Tippy
        interactive
        delay={[0, 700]}
        offset={[16, 8]}
        hideOnClick={false}
        placement="bottom-end"
        onHide={handleResetToFirstPages}
        render={renderResult}
      >
        {children}
      </Tippy>
    </div>
  );
}
Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};
export default Menu;
