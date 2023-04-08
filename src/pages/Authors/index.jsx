import React from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/PageTitle";
import AuthorsItem from "../../components/AuthorsItem";
import AuthorItemLoader from "../../components/AuthorItemLoader";

import { fetchAuthors } from "../../redux/slices/authors";
import "./index.css";

function Authors() {
  //dispatch for redux
  const dispatch = useDispatch();
  //authors
  const { authors, status } = useSelector((state) => state.authors);

  React.useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  return (
    <div className="authors">
      <PageTitle title={"Активні користувачі"} />
      <div className="authors__content">
        {status === "loaded"
          ? authors.map((item) => (
              <AuthorsItem
                key={item._id}
                userId={item._id}
                avatarUrl={item.avatarUrl}
                fullName={item.fullName}
                status={item.status}
                rating={item.rating}
                userArticles={item.userArticles}
                userComments={item.userComments}
              />
            ))
          : [...Array(6)].map((item, index) => (
              <AuthorItemLoader key={index} />
            ))}
      </div>
    </div>
  );
}

export default Authors;
