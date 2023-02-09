const userLogin = async (event) => {
    event.preventDefault()
    const email = document.getElementById(`newUserEmail`).value.trim()
    const password = document.getElementById(`newUserPassword`).value.trim()
    if(email && password){
        const response = await fetch(`/api/user/login`, {
            method: `POST`,
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
        })
        response.ok ?
        document.location.replace(`/dashboard`) :
       console.log(response.statusText)

    }
}
document.getElementById(`loginSubmit`).addEventListener(`submit`, userLogin)

