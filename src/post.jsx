import React from "react";

function Post({ imagePreview, handleModalClose }) {
  const handleClick = (event) => {
    event.stopPropagation();
    handleModalClose(event);
  };
  return (
    <div className="notlist2" onClick={handleClick}>
      <div className="post-container">
        <div className="post-header">建立新貼文</div>
        <div className="post">
          <div className="picture">
            <img src={imagePreview} />
          </div>
          <div className="text">
            <textarea type="text" className="type-in" placeholder="請輸入內容"/>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Post;
