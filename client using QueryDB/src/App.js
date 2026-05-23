import React, { useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  const [refresh,setRefresh] = useState(0);
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate setRefresh={setRefresh} />
      <hr />
      <h1>Posts</h1>
      <PostList refresh={refresh} />
    </div>
  );
};
export default App;
