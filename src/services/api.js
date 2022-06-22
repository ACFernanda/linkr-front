import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5002",
});

export const signUp = async (formData) => {
  return api.post("/sign-up", formData);
}

export const signIn = async (formData) => {
  return api.post("/sign-in", formData);
}

export const publishComment = async (postId, formData, token) => {
  return api.post(`/messages/${postId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getComments = async (postId, token) => {
  return api.get(`/messages/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const publishPost = async (formData, token) => {
  await api.post("/posts", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllPosts = async (token) => {
  return api.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getPostsByHashtag = async (word, token) => {
  return api.get(`/hashtag/${word}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUsersByName = async (userFilter, token) => {
  const lowerUserFilter = userFilter.toLowerCase();
  const route = `/users?name=${lowerUserFilter}`;
  return api.get(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTrandings = async (token) => {
  return api.get(`/hashtag`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserPosts = async (userId, token) => {
  const route = `/users/${userId}`;
  return api.get(route, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likePost = async (formData, token) => {
  await api.post("/likes", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const dislikePost = async (formData, token) => {
  await api.patch("/likes", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const followUser = async (formData, token) => {
  await api.post("/follows", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const unfollowUser = async (formData, token) => {
  await api.patch("/follows", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
