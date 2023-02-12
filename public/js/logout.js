const logout = async () => {
    const loggedOut = await fetch(`/api/user/logout`, {
              method: `POST`,
              headers: { 'Content-Type': 'application/json' }
            })
    loggedOut.ok?
        document.location.replace(`/`) :
        console.log(loggedOut.statusText)
}
document.getElementById(`logout`).addEventListener(`click`, logout)
