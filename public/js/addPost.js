const createPost = async (event) => {
    event.preventDefault()

    const title = document.getElementById(`postTitle`).value
    const post_content = document.getElementById(`newPost`).value

    const postData = await fetch(`api/post`, {
        method: `POST`,
        body: JSON.stringify({title, post_content}),
        headers: { 'Content-Type': 'application/json'}
    })
    postData.ok ?
    document.location.replace(`/dashboard`) :
    console.log(postData.statusText)
}

document.getElementById(`postSubmit`).addEventListener(`submit`, createPost)