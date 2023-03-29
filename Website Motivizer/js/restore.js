let email = document.getElementById('email')

email.addEventListener("keydown", function() {
    let users = GetUsersTable()
    if (users != null) {
        let usr = users.find(u => u.email === email.value)
        console.log(users, usr, email.value)
        if (usr != null) {
            document.getElementById("pwd").style.display = "block"   
            document.getElementById("password").style.display = "block"   
            document.getElementById("resetBtn").setAttribute('onclick', 'ResetPassword()')
        }  
    }
});

function ResetPassword() {
    let users = GetUsersTable(),
        pwd = document.getElementById("password").value

    if (!Validate('password', pwd)) {
        alert("Incorrect password")
        return
    }

    let i = users.indexOf(users.find(u => u.email === email.value))

    users[i].password = pwd
    Store('users', users)

    window.open("./login.html", '_self')
}