import profileReducer, { addPost, deletePost } from "./profileReducer"
let state = {
    posts: [
        {id: 1, text: "Hi, this is my first social network with react", likesCount: 123},
        {id: 2, text: "Hello Hello Helloo", likesCount: 23},
        {id: 3, text: "You are signed in now and can close this page.", likesCount: 432},
        {id: 4, text: "Text text text", likesCount: 0},
    ]
}
it ('Posts length should be incremented', () => {
    let action = addPost("Here will be new post text")
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)
})

it ('After deleting posts length should be decremented', () => {
    let action = deletePost(2)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3)
})