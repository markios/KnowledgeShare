export const getUsers = () => async (dispatch) => {
  try {
    const response = await window.fetch("/api/user?results=20");
    const users = await response.json();
    users.results = users.results.map(user => ({
      ...user,
      id: Math.random() * 1e17
    }));
    dispatch({ type: "USER_DATA", payload: users });
  } catch (err) {
    dispatch({ type: "USER_ERROR" });
  }
}
