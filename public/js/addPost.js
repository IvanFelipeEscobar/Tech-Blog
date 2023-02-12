const createPost = async (event) => {
    event.preventDefault()

    const post_title = document.getElementById(`postTitle`).value
    const post_content = document.getElementById(`newPost`).value
if(post_content){
    const postData = await fetch(`/api/posts`, {
        method: `POST`,
        body: JSON.stringify({post_title, post_content}),
        headers: { 'Content-Type': 'application/json'}
    })
    postData.ok ?
    document.location.replace(`/dashboard`) :
    console.log(postData.statusText)}
}

document.getElementById(`postSubmit`).addEventListener(`click`, createPost)