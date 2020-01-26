import CardComponent from "../components/card";
import FullCardComponent from "../components/full-card";
import CardDetails from "../components/card-details";
import {Key, Mode} from "../const";
import {render, remove, replace, RenderPosition} from "../utils/render";
import CardControls from "../components/card-controls";
import FullCardControls from "../components/full-card-controls";
import UserRatingComponent from "../components/user-rating";
import CommentsSection from "../components/comments-section";
import Comment from "../components/comment";
import AddCommentEmojiComponent from "../components/add-comment-emoji";
import CommentsTitleComponent from "../components/comments-title";
import AddCommentAreaComponent from "../components/add-comment-area";

class MovieController {
  constructor(container, data, dataChangeHandler, viewChangeHandler, commentsChangeHandler) {
    this._container = container;
    this._data = data;
    this._id = data.id;
    this._mode = Mode.DEFAULT;
    this._cardComponent = null;
    this._fullCardComponent = null;
    this._cardDetailsComponent = null;
    this._cardControlsComponent = null;

    this._commentsSection = null;
    this._commentsTitleComponent = null;
    this._addCommentAreaComponent = null;
    this._addCommentEmojiComponent = null;

    this._comments = [];

    this._dataChangeHandler = dataChangeHandler;
    this._commentsChangeHandler = commentsChangeHandler;
    this._viewChangeHandler = viewChangeHandler;

    this._closeFullCard = this._closeFullCard.bind(this);
    this._keydownPressHandler = this._keydownPressHandler.bind(this);
    this._descriptionClickHandler = this._descriptionClickHandler.bind(this);
    this._controlsClickHandler = this._controlsClickHandler.bind(this);
    this._ratingChangeHandler = this._ratingChangeHandler.bind(this);
    this._resetRatingClickHandler = this._resetRatingClickHandler.bind(this);
    this._newEmojiClickHandler = this._newEmojiClickHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._addCommentClickHandler = this._addCommentClickHandler.bind(this);
  }

  get id() {
    return this._id;
  }

  render() {
    const oldCardComponent = this._cardComponent;
    const oldFullCardComponent = this._fullCardComponent;

    this._cardComponent = new CardComponent(this._data);
    this._cardComponent.descriptionClickHandler = this._descriptionClickHandler;
    this._cardControlsComponent = new CardControls(this._data);
    this._cardControlsComponent.dataChangeHandler = this._controlsClickHandler;
    render(this._cardComponent.element, this._cardControlsComponent.element, RenderPosition.BEFOREEND);

    this._fullCardComponent = new FullCardComponent(this._data);
    this._fullCardComponent.closeClickHandler = this._closeFullCard;
    this._fullCardComponent.formSubmitHandler = this._addCommentClickHandler;
    this._fullCardControlsComponent = new FullCardControls(this._data);
    this._fullCardControlsComponent.dataChangeHandler = this._controlsClickHandler;

    if (this._data.isAlreadyWatched) {
      this._userRatingComponent = new UserRatingComponent(this._data.personalRating);
      render(this._fullCardComponent.ratingElement, this._userRatingComponent.element, RenderPosition.BEFOREEND);

      this._initializeCardDetails();
      render(this._fullCardComponent.middleContainerElement, this._cardDetailsComponent.element, RenderPosition.BEFOREEND);
    }
    render(this._fullCardComponent.element.querySelector(`.form-details__top-container`), this._fullCardControlsComponent.element, RenderPosition.BEFOREEND);
    this._initializeCommentSection();

    this._fullCardComponent.recoveryListeners();
    this._cardComponent.recoveryListeners();

    if (oldCardComponent && oldFullCardComponent) {
      replace(this._cardComponent, oldCardComponent);
      replace(this._fullCardComponent, oldFullCardComponent);
    } else {
      render(this._container, this._cardComponent.element, RenderPosition.BEFOREEND);
    }
  }

  rerender(data) {
    this._data = data;
    this._cardControlsComponent.rerender(data);
    this._fullCardControlsComponent.rerender(data);
  }

  addNewComment(comment) {
    this._renderComment(comment);
    this._addCommentAreaComponent.rerender();
    this._addCommentEmojiComponent = null;
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);
    remove(this._comments[index]);
    this._comments.splice(index, 1);

    const oldCommentsTitleComponent = this._commentsTitleComponent;
    this._commentsTitleComponent = new CommentsTitleComponent(this._comments.length);

    if (oldCommentsTitleComponent) {
      replace(this._commentsTitleComponent, oldCommentsTitleComponent);
    }
  }

  setDefaultView() {
    if (this._mode === Mode.OPEN_POPUP) {
      this._closeFullCard();
      this._mode = Mode.DEFAULT;
    }
  }

  _initializeCardDetails() {
    this._cardDetailsComponent = new CardDetails(this._data);
    this._cardDetailsComponent.ratingChangeHandler = this._ratingChangeHandler;
    this._cardDetailsComponent.resetClickHandler = this._resetRatingClickHandler;
    render(this._fullCardComponent.middleContainerElement, this._cardDetailsComponent.element, RenderPosition.BEFOREEND);
  }

  _initializeCommentSection() {
    this._commentsSection = new CommentsSection();
    this._commentsTitleComponent = new CommentsTitleComponent(this._data.comments.length);
    render(this._commentsSection.element, this._commentsTitleComponent.element, RenderPosition.AFTERBEGIN);

    this._data.comments.forEach((comment) => {
      this._renderComment(comment);
    });
    this._addCommentAreaComponent = new AddCommentAreaComponent();
    this._addCommentAreaComponent.newEmojiClickHandler = this._newEmojiClickHandler;
    this._addCommentAreaComponent.recoveryListeners();
    render(this._commentsSection.element, this._addCommentAreaComponent.element, RenderPosition.BEFOREEND);
    render(this._fullCardComponent.commentContainerElement, this._commentsSection.element, RenderPosition.BEFOREEND);
  }

  _renderComment(data) {
    const commentComponent = new Comment(data);
    commentComponent.deleteClickHandler = this._deleteCommentClickHandler;
    commentComponent.recoveryListeners();
    this._comments.push(commentComponent);
    render(this._commentsSection.commentsList, commentComponent.element, RenderPosition.BEFOREEND);
  }

  _closeFullCard() {
    window.removeEventListener(`keydown`, this._keydownPressHandler);
    this._fullCardComponent.element.remove();
    document.body.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _keydownPressHandler(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESCAPE_IE) {
      this._closeFullCard();
    }
  }

  _controlsClickHandler(data) {
    let newData = Object.assign({}, this._data, data);
    if (newData.isAlreadyWatched) {
      if (this._cardDetailsComponent) {
        this._cardDetailsComponent.recoveryListeners();
        render(this._fullCardComponent.middleContainerElement, this._cardDetailsComponent.element, RenderPosition.BEFOREEND);
        newData = Object.assign(newData, {personalRating: this._cardDetailsComponent.currentScore});
      } else {
        this._initializeCardDetails();
      }
    } else if (this._cardDetailsComponent) {
      this._cardDetailsComponent.element.remove();
      this._cardDetailsComponent.removeElement();
    }
    this._dataChangeHandler(this._data.id, newData);
  }

  _ratingChangeHandler(value) {
    if (this._userRatingComponent) {
      if (this._fullCardComponent.ratingElement.contains(this._userRatingComponent.element)) {
        this._userRatingComponent.rerender(value);
      } else {
        render(this._fullCardComponent.ratingElement, this._userRatingComponent.element, RenderPosition.BEFOREEND);
      }
    } else {
      this._userRatingComponent = new UserRatingComponent(value);
      render(this._fullCardComponent.ratingElement, this._userRatingComponent.element, RenderPosition.BEFOREEND);
    }
  }

  _resetRatingClickHandler() {
    this._userRatingComponent.element.remove();
    this._userRatingComponent.removeElement();
  }

  _descriptionClickHandler() {
    this._viewChangeHandler();

    render(document.body, this._fullCardComponent.element, RenderPosition.BEFOREEND);
    document.body.classList.add(`hide-overflow`);
    window.addEventListener(`keydown`, this._keydownPressHandler);
    this._mode = Mode.OPEN_POPUP;
  }

  _newEmojiClickHandler(emoji) {
    const oldAddCommentEmojiComponent = this._addCommentEmojiComponent;
    this._addCommentEmojiComponent = new AddCommentEmojiComponent(emoji);

    if (oldAddCommentEmojiComponent) {
      replace(this._addCommentEmojiComponent, oldAddCommentEmojiComponent);
    } else {
      render(this._addCommentAreaComponent.addEmojiContainer, this._addCommentEmojiComponent.element, RenderPosition.BEFOREEND);
    }
  }

  _deleteCommentClickHandler(idComment) {
    this._commentsChangeHandler(this.id, idComment);
  }

  _addCommentClickHandler() {
    const newComment = {
      id: null,
      emoji: this._addCommentAreaComponent.currentEmoji,
      message: this._addCommentAreaComponent.userMessage,
      date: Date.now()
    };
    this._commentsChangeHandler(this.id, newComment.id, newComment);
  }
}

export default MovieController;
