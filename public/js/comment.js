const submitComment = async (event) => {
    event.preventDefault
    const comment_content = document.getElementById(`commentSubmit`).value
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1]
    if(comment_content){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
    })  
    response.ok?
        document.location.reload() :
        console.log(response.statusText)
}}
