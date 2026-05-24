const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    const content = comment.status === "pending" ? "await moderation" : (comment.status === "rejected" ? "This Comment has been banned" : comment.content)
    return <li key={comment.commentId}>{ content }</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
