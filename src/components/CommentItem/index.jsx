import React from "react";
import axios from "../../axios.js";
import { useDispatch, useSelector } from "react-redux";

import AuthorSign from "../AuthorSign";

import { formingDate } from "../../formingDate";
import { deleteSVG, likedSVG, likeSVG } from "../SvgSprite";
import "./index.css";
import { removeComment } from "../../redux/slices/comments.js";

function CommentItem({ id, text, author, createdAt, usersLiked }) {
  //dispatch for redux
  const dispatch = useDispatch();
  //current user id from redux
  const { _id: currentUser } =
    useSelector((state) => state.authorization.userData) || "notAuthorized";
  //users who liked
  const [likes, setLikes] = React.useState(usersLiked);
  //on click like btn
  function likeComment() {
    axios
      .get(`/likecomment/${id}`)
      .then((res) => setLikes(res.data))
      .catch((err) => {
        alert("Не вдалось лайкнути коментар");
      });
  }
  async function deleteComment() {
    axios
      .delete(`/comment/${id}`)
      .then(dispatch(removeComment(id)))
      .catch((err) => console.log(err));
  }
  return (
    <div className="commentItem unselectable">
      <AuthorSign author={author} />
      <div className="commentItem__block">
        <div className="commentItem__time">{formingDate(createdAt)}</div>
        <p>{text}</p>
        <div className="commentItem__likes" onClick={likeComment}>
          {likes.includes(currentUser) ? likedSVG : likeSVG} {likes.length}
        </div>
      </div>
      {currentUser === author._id && (
        <div className="commentItem__delete" onClick={deleteComment}>
          {deleteSVG}
        </div>
      )}
    </div>
  );
}

export default CommentItem;
