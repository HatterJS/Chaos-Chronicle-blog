import AuthorSign from '../AuthorSign';
import { likeSVG } from '../SvgSprite';
import './index.css';

function CommentItem() {
  return (
    <div className="commentItem">
      <AuthorSign />
      <div className="commentItem__block">
        <div className="commentItem__time">24 березня 2022</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum non cum nam quas facilis
          fugit distinctio ipsum quibusdam vero nisi cumque sapiente, dicta a. Autem pariatur fuga
          earum nam sit.
        </p>
        <div className="commentItem__likes">{likeSVG} 13</div>
      </div>
    </div>
  );
}

export default CommentItem;
