import React from "react";
/*
for a single post
use post.json for json reference
use single prop
use useColorModeValue("white", "gray.dark") for color scheme

layout:

Username (small)
Big title
content: text
image Component(add later, leave a space for it)
tiny time stamp
[like button, comment button]
comment component(add later, leave it alone)

*/
const PostCard = () => {
  return (
    <div className="post-card">
      <h3>Post Title</h3>
      <p>This is a brief description of the post.</p>
      <button>Read More</button>
    </div>
  );
};

export default PostCard;
