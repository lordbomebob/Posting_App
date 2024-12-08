import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Utility function to log operations
const logOperation = (operation, details) => {
  console.log(`Operation: ${operation}`, details);
};

// Utility function to log errors
const logError = (operation, error) => {
  console.error(`Error during ${operation}:`, error);
};

// ======== USERS COLLECTION ========

// Create or Update a User
export const upsertUser = async (userId, userData) => {
  const operation = "Upsert User";
  try {
    await setDoc(doc(db, "Users", userId), userData, { merge: true });
    logOperation(operation, { userId, userData });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Fetch a User by ID
export const fetchUser = async (userId) => {
  const operation = "Fetch User";
  try {
    const userRef = doc(db, "Users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      logOperation(operation, { userId, userData: userSnap.data() });
      return userSnap.data();
    } else {
      logOperation(operation, { userId, message: "No such user!" });
      return null;
    }
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Delete a User
export const deleteUser = async (userId) => {
  const operation = "Delete User";
  try {
    const userRef = doc(db, "Users", userId);
    await deleteDoc(userRef);
    logOperation(operation, { userId, message: "User deleted successfully!" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// ======== POSTS COLLECTION ========

// Upsert Post (Create or Update)
export const upsertPost = async (postId, postData) => {
  const operation = "Upsert Post";
  try {
    const postRef = postId
      ? doc(db, "Posts", postId) // If postId exists, use the provided ID
      : doc(collection(db, "Posts")); // Otherwise, generate a new ID

    await setDoc(postRef, postData, { merge: true }); // Merge ensures updates
    logOperation(operation, {
      postId: postId || postRef.id, // Use the provided or generated ID
      postData,
    });

    return postId || postRef.id; // Return the ID for reference
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Fetch All Posts
export const fetchPosts = async () => {
  const operation = "Fetch Posts";
  try {
    const postsRef = collection(db, "Posts");
    const querySnapshot = await getDocs(postsRef);
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    logOperation(operation, { posts });
    return posts;
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Fetch Post by ID
export const fetchPostById = async (postId) => {
  const operation = "Fetch Post by ID";
  try {
    const postRef = doc(db, "Posts", postId);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      logOperation(operation, { postId, postData: postSnap.data() });
      return postSnap.data();
    } else {
      logOperation(operation, { postId, message: "No such post!" });
      return null;
    }
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Delete a Post
export const deletePost = async (postId) => {
  const operation = "Delete Post";
  try {
    const postRef = doc(db, "Posts", postId);
    await deleteDoc(postRef);
    logOperation(operation, { postId, message: "Post deleted successfully!" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// ======== COMMENTS (Nested Operations) ========

// Upsert Comment (Create or Update)
export const upsertComment = async (postId, commentData) => {
  const operation = "Upsert Comment";
  try {
    const postRef = doc(db, "Posts", postId);

    // Fetch the post
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error(`Post with ID ${postId} does not exist.`);
    }

    const post = postSnap.data();
    const comments = post.comments || [];

    // Check if the comment already exists
    const existingCommentIndex = comments.findIndex(
      (comment) => comment.commentId === commentData.commentId
    );

    if (existingCommentIndex !== -1) {
      // Update the existing comment
      comments[existingCommentIndex] = {
        ...comments[existingCommentIndex],
        ...commentData,
      };
    } else {
      // Add a new comment
      comments.push(commentData);
    }

    // Update the post with the modified comments array
    await updateDoc(postRef, { comments });

    // Add postId to commenter's repliedPosts
    const userRef = doc(db, "Users", commentData.userId); // Commenter's ID
    await updateDoc(userRef, {
      repliedPosts: arrayUnion(postId),
    });

    logOperation(operation, { postId, commentData });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Fetch All Comments for a Post
export const fetchComments = async (postId) => {
  const operation = "Fetch Comments";
  try {
    const postRef = doc(db, "Posts", postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      throw new Error(`Post with ID ${postId} does not exist.`);
    }

    const post = postSnap.data();
    const comments = post.comments || [];

    logOperation(operation, { postId, comments });
    return comments;
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Remove a Comment
export const removeComment = async (postId, commentId) => {
  const operation = "Remove Comment";
  try {
    const postRef = doc(db, "Posts", postId);

    // Fetch the post
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) {
      throw new Error(`Post with ID ${postId} does not exist.`);
    }

    const post = postSnap.data();
    const updatedComments = post.comments.filter(
      (comment) => comment.commentId !== commentId
    );

    // Update the post with the modified comments array
    await updateDoc(postRef, { comments: updatedComments });

    logOperation(operation, { postId, commentId, message: "Comment removed." });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// ======== USER-POST INTERACTIONS ========

// Like a Post
export const likePost = async (postId, userId) => {
  const operation = "Like Post";
  try {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, {
      likes: arrayUnion(userId),
    });

    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      likedPosts: arrayUnion(postId),
    });

    logOperation(operation, { postId, userId, action: "Liked" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Unlike a Post
export const unlikePost = async (postId, userId) => {
  const operation = "Unlike Post";
  try {
    const postRef = doc(db, "Posts", postId);
    await updateDoc(postRef, {
      likes: arrayRemove(userId),
    });

    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      likedPosts: arrayRemove(postId),
    });

    logOperation(operation, { postId, userId, action: "Unliked" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Save a Post
export const savePost = async (postId, userId) => {
  const operation = "Save Post";
  try {
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      savedPosts: arrayUnion(postId),
    });

    logOperation(operation, { postId, userId, action: "Saved" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};

// Unsave a Post
export const unsavePost = async (postId, userId) => {
  const operation = "Unsave Post";
  try {
    const userRef = doc(db, "Users", userId);
    await updateDoc(userRef, {
      savedPosts: arrayRemove(postId),
    });

    logOperation(operation, { postId, userId, action: "Unsaved" });
  } catch (error) {
    logError(operation, error);
    throw error;
  }
};
