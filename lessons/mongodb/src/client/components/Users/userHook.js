import { useEffect, useReducer } from "react";

export default () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "USER_DATA": {
        return {
          ...state,
          isLoading: false,
          failed: false,
          users: action.payload,
        };
      }
      case "USER_ERROR": {
        return {
          ...state,
          isLoading: false,
          failed: true,
        };
      }
      case "SHOW_USER": {
        return {
          ...state,
          showDialog: true,
          selectedUser: state.users.results.find(
            (u) => u._id === action.payload
          ),
        };
      }
      case "RESET": {
        return {
          ...state,
          showDialog: false,
          selectedUser: null,
        };
      }
      default:
        throw new Error();
    }
  };

  const initialState = {
    isLoading: true,
    failed: false,
    users: null,
    showDialog: null,
    selectedUser: null,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch("/api/user?results=20");
        const users = await response.json();
        dispatch({ type: "USER_DATA", payload: users });
      } catch (err) {
        dispatch({ type: "USER_ERROR" });
      }
    };
    fetchData();
  }, []);

  const onClickHandler = (e) =>
    dispatch({
      type: "SHOW_USER",
      payload: e.currentTarget.dataset.target,
    });
  const onDialogClose = () => dispatch({ type: "RESET" });

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    onClickHandler,
    onDialogClose,
    state,
  };
};
