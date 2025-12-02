function addComment() {
  const input = document.getElementById("commentInput");
  const commentText = input.value.trim();

  if (commentText === "") return;

  const commentBox = document.createElement("div");
  commentBox.className = "comment";
  commentBox.innerText = commentText;

  document.getElementById("commentsList").appendChild(commentBox);
  input.value = "";
}
