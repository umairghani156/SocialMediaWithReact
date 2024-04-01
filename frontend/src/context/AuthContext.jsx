import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"
// {
//     _id: "66008db23279aced2c8a854b",
//     username: "umair ",
//     email: "umair@gmail.com",
//     profilePicture: "",
//     coverPicture: "",
//     followers: [],
//     followings: [],
//     isAdmin: false
// }
const localStorageUserInfo = JSON.parse(localStorage.getItem("user"));
console.log("local", localStorageUserInfo);
const INITIAL_STATE = {
    user:localStorageUserInfo || null,
    isFetching: false,
    error: false,
    isShow: true,
    friends: true,
    post: true,
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                isShow: state.isShow,
                friends: state.friends,
                post: state.post,
                dispatch,
            }}>
            {children}
        </AuthContext.Provider>
    )
}