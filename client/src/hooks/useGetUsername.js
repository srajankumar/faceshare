// useGetUserID.js
export const useGetUsername = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("username");
  } else {
    // Handle the case when window is not available (server-side rendering)
    return null;
  }
};
