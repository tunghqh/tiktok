import PropTypes from 'prop-types'
import React, { forwardRef, useState } from "react";
import images from "~/assets/images";
import classNames from 'classnames';
import style from './Image.module.scss'

const Image = forwardRef(
  ({ src, alt, fallback: customFallback = images.noImage,className, ...props }, ref) => {
    const [fallback, setFallback] = useState("");
    const handleError = () => {
      setFallback(customFallback);
    };
    return (
      <img
        className={classNames(style.wrapper,className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        onError={handleError}
        {...props}
      />
    );
  }
);
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  fallback: PropTypes.string,
  className: PropTypes.string,
}
export default Image;
