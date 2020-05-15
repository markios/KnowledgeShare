const initialState = () => ({
  isLoading: true,
  failed: false,
  users: null,
  showDialog: null,
  selectedUser: null
})

export default (state = initialState(), { type, payload } = {}) => {
  switch (type) {
    case "USER_DATA": {
      return {
        ...state,
        isLoading: false,
        failed: false,
        users: payload
      };
    }
    case "USER_ERROR": {
      return {
        ...state,
        isLoading: false,
        failed: true
      };
    }
    case "SHOW_USER": {
      return {
        ...state,
        showDialog: true,
        selectedUser: state.users.results.find(u => u.id === payload)
      };
    }
    case "RESET": {
      return {
        ...state,
        showDialog: false,
        selectedUser: null
      };
    }
    default:
      return state;
  }
};
