import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWFlNzFiZThhM2I4ZThlNzQ3ZWU1ZDBiY2ZlNWQwMSIsIm5iZiI6MTcyNjM0MTU0Ny43ODAwNSwic3ViIjoiNjZlNWM4NjdkZDIyNGQxYTM5OTBmOTNmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.2T7OriJ6Mamc6l4-pwwjXke83nNojVWILYRJvqukGlU'
      },
});

export default instance;