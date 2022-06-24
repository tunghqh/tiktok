import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import style from "./Search.module.scss";
import * as searchServices from "~/services/searchService";

import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import AccountItem from "~/components/AccountItem";
import { SearchIcon } from "~/components/Icons";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import useDebounce from "~/hooks/useDebounce";

const cx = classNames.bind(style);
function Search() {
  const [searchVale, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const debouncedValue = useDebounce(searchVale, 500);

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debouncedValue);
      setSearchResult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchVale = e.target.value;
    if (!searchVale.startsWith(" ")) {
      setSearchValue(searchVale);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
      <div>
        <HeadlessTippy
          visible={showResult && searchResult.length > 0}
          interactive={true}
          render={(attrs) => (
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx("search-title")}>Account</h4>
                {searchResult.map((result) => (
                  <AccountItem key={result.id} data={result} />
                ))}
              </PopperWrapper>
            </div>
          )}
          onClickOutside={handleHideResult}
        >
      <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchVale}
            placeholder="Tìm kiếm tài khoản và video..."
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
        {!!searchVale && !loading && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}
        <button className={cx("search-btn")} onMouseDown={handleSubmit}>
          <SearchIcon />
        </button>
      </div>
        </HeadlessTippy>
      </div>
  );
}

export default Search;
