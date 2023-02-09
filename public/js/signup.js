const signupForm = document.getElementById(`signupForm`)

const submitForm = async (event) => {
    event.preventDefault()
    const name = document.getElementById(`newUserName`).value.trim()
    const email = document.getElementById(`newUserEmail`).value.trim()
    const password = document.getElementById(`newUserPassword`).value.trim()

    if( name && email && password) {
        const newUser = await fetch(`/api/user`, {
            method: `POST`,
            body: JSON.stringify({name, email, password}),
            headers: { 'Content-Type': 'application/json' }
        })
    newUser.ok?
        document.location.replace(`/dashboard`) :
        console.log(newUser.statusText)
    }
}
 signupForm.addEventListener(`submit`, submitForm)
