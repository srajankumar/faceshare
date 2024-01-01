// useGetUserID.js
export const useGetUserID = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("userID");
  } else {
    // Handle the case when window is not available (server-side rendering)
    return null;
  }
};
