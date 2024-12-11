import React, { useState } from "react";
import {
  upsertUser,
  fetchUser,
  deleteUser,
  fetchPosts,
  fetchPostById,
  deletePost,
  removeComment,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  upsertPost,
  upsertComment,
  searchUser,
} from "../services/firestoreService";

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  tab: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    marginRight: "10px",
  },
  activeTab: {
    padding: "10px 20px",
    cursor: "pointer",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  content: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  label: {
    width: "150px",
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  buttonGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  output: {
    marginTop: "20px",
    padding: "10px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: "4px",
  },
};

const FirebaseTester = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [inputData, setInputData] = useState({});
  const [output, setOutput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const executeFunction = async (fn, args = []) => {
    try {
      const result = await fn(...args);
      setOutput(result || "Success!");
      console.log("Function executed successfully:", result);
    } catch (error) {
      setOutput(error.message);
      console.error("Error executing function:", error);
    }
  };

  const UsersTab = () => {
    const handleButtonClick = (callback, args) => {
      const inputValues = {
        userId: document.getElementById("userId")?.value || "",
        username: document.getElementById("username")?.value || "",
        fullName: document.getElementById("fullName")?.value || "",
        bio: document.getElementById("bio")?.value || "",
        profilePicUrl: document.getElementById("profilePicUrl")?.value || "",
      };
      callback(...args(inputValues));
    };

    return (
      <div>
        <h3>Test User Functions</h3>
        <div style={styles.inputGroup}>
          {["userId", "username", "fullName", "bio", "profilePicUrl"].map(
            (field) => (
              <div key={field} style={styles.inputRow}>
                <label style={styles.label}>
                  {field.replace(/([A-Z])/g, " $1")}:
                </label>
                <input id={field} style={styles.input} />
              </div>
            )
          )}
        </div>
        <div style={styles.buttonGroup}>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(upsertUser, (inputValues) => [
                inputValues.userId,
                {
                  username: inputValues.username,
                  fullName: inputValues.fullName,
                  bio: inputValues.bio,
                  profilePicUrl: inputValues.profilePicUrl,
                  joiningDate: new Date(),
                  posts: [],
                  likedPosts: [],
                  savedPosts: [],
                  repliedPosts: [],
                  reposts: [],
                },
              ])
            }
          >
            Create/Update User
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(fetchUser, (inputValues) => [
                inputValues.userId,
              ])
            }
          >
            Fetch User by ID
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(deleteUser, (inputValues) => [
                inputValues.userId,
              ])
            }
          >
            Delete User by ID
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(searchUser, (inputValues) => [
                inputValues.username,
              ])
            }
          >
            Search User by Username
          </button>
        </div>
      </div>
    );
  };

  const PostsTab = () => {
    const handleButtonClick = (callback, args) => {
      const inputValues = {
        postId: document.getElementById("postId")?.value || "",
        contentText: document.getElementById("contentText")?.value || "",
        contentImageUrl:
          document.getElementById("contentImageUrl")?.value || "",
        userId: document.getElementById("userId")?.value || "",
        commentId: document.getElementById("commentId")?.value || "",
        commentText: document.getElementById("commentText")?.value || "",
        commenterUserId:
          document.getElementById("commenterUserId")?.value || "", // Added for commenter ID
        commenterUsername:
          document.getElementById("commenterUsername")?.value || "",
        commenterProfilePicUrl:
          document.getElementById("commenterProfilePicUrl")?.value || "",
      };
      callback(...args(inputValues));
    };

    return (
      <div>
        <h3>Test Post Functions</h3>
        <div style={styles.inputGroup}>
          {[
            "postId",
            "contentText",
            "contentImageUrl",
            "userId", // Post creator ID
            "commentId",
            "commentText",
            "commenterUserId", // Commenter ID
            "commenterUsername",
            "commenterProfilePicUrl",
          ].map((field) => (
            <div key={field} style={styles.inputRow}>
              <label style={styles.label}>
                {field.replace(/([A-Z])/g, " $1")}:
              </label>
              <input id={field} style={styles.input} />
            </div>
          ))}
        </div>
        <div style={styles.buttonGroup}>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(upsertPost, (inputValues) => [
                inputValues.postId,
                {
                  userId: inputValues.userId, // Post creator ID
                  content: {
                    text: inputValues.contentText,
                    imageUrlLinks: [inputValues.contentImageUrl],
                  },
                  timestamp: new Date(),
                  comments: [],
                },
              ])
            }
          >
            Create/Update Post
          </button>
          <button
            style={styles.button}
            onClick={() => executeFunction(fetchPosts)}
          >
            Fetch All Posts
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(fetchPostById, (inputValues) => [
                inputValues.postId,
              ])
            }
          >
            Fetch Post by ID
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(deletePost, (inputValues) => [
                inputValues.postId,
              ])
            }
          >
            Delete Post
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(upsertComment, (inputValues) => [
                inputValues.postId,
                {
                  commentId: inputValues.commentId,
                  userId: inputValues.commenterUserId, // Use commenterUserId for the comment
                  commenterUsername: inputValues.commenterUsername,
                  commenterProfilePicUrl: inputValues.commenterProfilePicUrl,
                  content: {
                    text: inputValues.commentText,
                    imageUrlLinks: [],
                  },
                  timestamp: new Date(),
                },
              ])
            }
          >
            Add/Edit Comment
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(removeComment, (inputValues) => [
                inputValues.postId,
                { commentId: inputValues.commentId },
              ])
            }
          >
            Remove Comment
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(likePost, (inputValues) => [
                inputValues.postId,
                inputValues.userId, // User liking the post
              ])
            }
          >
            Like Post
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(unlikePost, (inputValues) => [
                inputValues.postId,
                inputValues.userId, // User unliking the post
              ])
            }
          >
            Unlike Post
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(savePost, (inputValues) => [
                inputValues.postId,
                inputValues.userId, // User saving the post
              ])
            }
          >
            Save Post
          </button>
          <button
            style={styles.button}
            onClick={() =>
              handleButtonClick(unsavePost, (inputValues) => [
                inputValues.postId,
                inputValues.userId, // User unsaving the post
              ])
            }
          >
            Unsave Post
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Firebase Tester</h1>
      <div style={styles.tabs}>
        <div
          style={activeTab === "Users" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Users")}
        >
          Users
        </div>
        <div
          style={activeTab === "Posts" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("Posts")}
        >
          Posts
        </div>
      </div>
      <div style={styles.content}>
        {activeTab === "Users" ? <UsersTab /> : <PostsTab />}
      </div>
    </div>
  );
};

export default FirebaseTester;
