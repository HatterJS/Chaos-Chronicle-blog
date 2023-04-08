import { useDispatch, useSelector } from "react-redux";
import { switchPage } from "../../redux/slices/articles";

import "./index.css";

function PageSwitcher() {
  //dispatch for redux
  const dispatch = useDispatch();
  //pagination from redux
  const { totalPages, page } = useSelector(
    (state) => state.articles.articles.pagination
  );
  //handle switch page
  function handleSwitchPage(index) {
    dispatch(switchPage(index + 1));
    // window.scrollTo(0, 0);
  }
  return (
    <div className="pageSwitcher">
      {totalPages > 1 &&
        [...Array(totalPages)].map((__, index) => (
          <input
            type="radio"
            name="pageChoice"
            className="cancelButton"
            label={index + 1}
            key={index}
            checked={page === index + 1 ? true : false}
            onChange={() => handleSwitchPage(index)}
          />
        ))}
    </div>
  );
}

export default PageSwitcher;
