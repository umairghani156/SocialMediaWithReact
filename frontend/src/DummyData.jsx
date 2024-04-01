import Pic_1 from "./assets/person/1.jpeg"
import Pic_2 from "./assets/person/2.jpeg"
import Pic_3 from "./assets/person/3.jpeg"
import Pic_4 from "./assets/person/4.jpeg"
import Pic_5 from "./assets/person/6.jpeg"

import Post_1 from "./assets/players/player1.jpg"
import Post_2 from "./assets/players/player2.jpg"
import Post_3 from "./assets/players/player3.jpg"
import Post_4 from "./assets/post/4.jpeg"
import Post_5 from "./assets/post/5.jpeg"


export const Users = [
    {
        id: 1,
        profilePicture: Post_1,
        username: "Faiz"
    },
    {
        id: 2,
        profilePicture: Post_2,
        username: "Asim"
    },
    {
        id: 3,
        profilePicture: Post_3,
        username: "Salah"
    },
    {
        id: 4,
        profilePicture: Pic_2,
        username: "Mehboob"
    },
];

export const Posts = [
    {
        id: 1,
        desc: 'Love for All, Hatred for none',
        photo: Post_1,
        date: "5 mins ago",
        userId: 1,
        like: 32,
        comment: 9,
    },
    {
        id: 2,
        photo: Post_2,
        date: "45 mins ago",
        userId: 2,
        like: 76,
        comment: 9,
    },
    {
        id: 3,
        desc: 'Love for All, Hatred for none',
        photo: Post_3,
        date: "10 mins ago",
        userId: 3,
        like: 45,
        comment: 67,
    },
    {
        id: 4,
        desc: 'Love for All, Hatred for none',
        photo: Post_4,
        date: "56 mins ago",
        userId: 4,
        like: 55,
        comment: 89,
    },
    {
        id: 5,
        desc: 'Love for All, Hatred for none',
        photo: Post_5,
        date: "15 mins ago",
        userId: 5,
        like: 34,
        comment: 10,
    }
]
