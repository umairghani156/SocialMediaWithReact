const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN_START":
            return{
               
                user: null,
                isFetching: true,
                isShow: false,
                error: false
            };
        case "LOGIN_SUCCESS":
                return{
                    
                    user: action.payload,
                    isFetching: false,
                    isShow: false,
                    error: false
            };
        case "LOGIN_FAILURE":
                return{
                   
                    user: null,
                    isFetching: false,
                    isShow: false,
                    error: action.payload,
            };
        case "SHOW_LEFTBAR":
            return{
                ...state,
                isShow: action.payload,
                
            };
        case "SHOW_FRIENDS":
                return{
                    ...state,
                    friends: action.payload,
                    
        };
        case "SHOW_POST":
                return{
                    ...state,
                    post: action.payload,
                    
        }
        case "FOLLOW":
                return{
                ...state,
                user: {
                    ...state.user,
                    followings:[...state.user.followings, action.payload],
                },
            };
        case "UNFOLLOW":
                return{
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(
                        (following)=> following !== action.payload
                    ),
                },
            };
        default:
            return state;
    }
};

export default AuthReducer;