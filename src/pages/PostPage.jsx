// src/pages/PostPage.jsx
import {
  Box,
  Flex,
  Grid,
  VStack,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  GridItem,
} from "@chakra-ui/react";
import PostCard from "../components/PostCard";

// Sample data
const samplePost = {
  title: "Welcome to our App!",
  content: "This is a sample post.",
  author: "Admin",
  upvotes: 123,
  comments: 45,
};

const trendingPost = {
  title: "THIS IS TRENDING!",
  content: "This is a widespread trending post that is very important.",
  author: "Your God",
  upvotes: 999,
  comments: 200,
};

const userProfile = {
  name: "Ian Bajwa",
  username: "ian.bajwa",
  followers: 100,
  following: 50,
  bio: "Just a tech enthusiast!",
  profileImage: "/path/to/profile/image.jpg",
};

const PostPage = () => {
  return <div></div>;
};

export default PostPage;
