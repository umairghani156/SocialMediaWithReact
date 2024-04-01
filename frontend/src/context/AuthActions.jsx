export const LoginStart = (userCredentials)=>({
    type: "LOGIN_START"
});
export const LoginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const LoginFailure = (error)=>({
    type: "LOGIN_FAILURE",
    payload: error
});
export const IsShowLeftBar = (isShow)=>({
    type: "SHOW_LEFTBAR",
    payload: isShow
});
export const userFriends = (friends)=>({
    type: "SHOW_FRIENDS",
    payload: friends
});
export const checkPost = (post)=>({
    type: "SHOW_POST",
    payload: post
});


export const Follow = (userId) =>({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) =>({
    type: "UNFOLLOW",
    payload: userId,
})