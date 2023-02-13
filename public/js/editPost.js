const editPost = async (event) => {
    event.preventDefault();

    const post_title = document.getElementById(`postTitle`).value.trim()
    const post_content = document.getElementById(`newPost`).value.trim()

    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1]
      
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id,
          post_title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      response.ok?
        document.location.replace('/dashboard'):
      
        alert(response.statusText);
      

}

document.getElementById(`editPost`).addEventListener('submit', editPost);