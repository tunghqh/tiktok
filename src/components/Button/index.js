import PropType from 'prop-types'
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded = false,
  defalt = false,
  disabled = false,
  className,
  leftIcon,
  rightIcon,
  small = false,
  large = false,
  children,
  onClick,
  ...passProps
}) {
  let Comp = "button";
  const props = {
    onClick,
    ...passProps,
  };

  // Remove event listener when btn is disabled
  if (disabled) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith("on") && typeof props[key] === "function") {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    defalt,
    disabled,
    small,
    large,
  });
  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}
Button.propTypes ={
  to: PropType.string,
  href: PropType.string,
  primary: PropType.bool,
  outline: PropType.bool,
  text: PropType.bool,
  rounded: PropType.bool,
  defalt: PropType.bool,
  disabled: PropType.bool,
  small: PropType.bool,
  large: PropType.bool,
  className: PropType.string,
  leftIcon: PropType.node,
  rightIcon: PropType.node,
  children: PropType.node.isRequired,
  onClick: PropType.func,
}
export default Button;
