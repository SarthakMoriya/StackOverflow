const userReducer = (states = [], action) => {
  switch (action.type) {
    case "FETCH_ALL_USERS":
      return action.payload;
    case "GET_LATEST_USER":
      return action.payload;
    case "UPDATE_CURRENT_USER":
      return states.map((state) =>
        state._id === action.payload._id ? action.payload : state
      );
    case "UPDATE_FRIENDS":
      const currentFriends = JSON.parse(localStorage.getItem("Profile"));
      console.log(currentFriends);
      let newfriends = currentFriends.user.friends;
      //   console.log(newfriends, action.payload);
      newfriends = [...newfriends, ...action.payload];
      //   console.log(newfriends);
      const { status, token, user } = currentFriends;
      console.log(user.friends);
      console.log(newfriends)
      currentFriends.user.friends = [...newfriends];
      console.log({ ...currentFriends });
      localStorage.setItem("Profile", JSON.stringify(currentFriends));

      return states;
    case "REMOVE_FRIENDS":
      const currentFriends1 = JSON.parse(localStorage.getItem("Profile"));
      console.log(currentFriends1);
      let newfriends1 = currentFriends1.user.friends;
      console.log(newfriends1, action.payload); //payload we have friendsId
      newfriends1 = newfriends1.filter((id) => id !== action.payload);
      console.log(newfriends1);

      //   newfriends1 = [...newfriends1, ...action.payload];
        const { status:status1, token:token1, user:user1 } = currentFriends1;
        console.log(user1.friends);
        currentFriends1.user.friends = [...newfriends1];
        console.log({ ...currentFriends1 });
        localStorage.setItem("Profile", JSON.stringify(currentFriends1));

      return states;
    default:
      return states;
  }
};

export default userReducer;
