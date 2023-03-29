let users = GetUsersTable()
if (users == null) {
    users = []
    admin = {
        email: "admin@gmail.com",
        name: "admin",
        surname: "admin",
        password: "admin",
        birth_date: "01.01.2001",
        country: "Kazakhstan",
        phone: "87777777777",
        isAdmin: true,
        isBanned: false
    }

    users.push(admin)
    Store('users', users)
}

let currentUser = GetActiveUser()
if (currentUser != null) {
    window.open("./index.html", "_self")
}

function Login() {
    let email = document.getElementById("email").value,
        password = document.getElementById("password").value

    let usr = users.find(u => u.email === email)
    if (usr == null) {
        document.getElementById("err_msg").innerHTML = "User with this email doesn't exist"
        return
    }

    if (usr.password !== password) {
        document.getElementById("err_msg").innerHTML = "Incorrect password"
        return
    }

    if (!usr.isBanned) {
        Store('authorization', usr)
        if (usr.isAdmin) {
            window.open("./admin.html", "_self")
            return
        }else {
            window.open("./index.html", "_self")
            return
        }
    }
    else {
        document.getElementById("err_msg").innerHTML = "User is banned"
        return
    }
}

function Register() {
    let form_email = document.getElementById("email").value,
        fname = document.getElementById("name").value,
        sname = document.getElementById("surname").value,
        pwd = document.getElementById("password").value,
        conf = document.getElementById("confirm").value,
        month = document.getElementById("month").value,
        day = document.getElementById("day").value,
        year = document.getElementById('year').value,
        country = document.getElementById("country").value,
        num = document.getElementById("phone").value

        
    if (!Validate('email', form_email)) {
        document.getElementById("err_msg").innerHTML = "Incorrect email address"
        return
    }

    if (!CheckUserExistence(form_email)) {
        document.getElementById("err_msg").innerHTML = "User already exists"
        return
    }

    if (!Validate('name', fname) || !Validate('name', sname)) {
        document.getElementById("err_msg").innerHTML = "Incorrect name/surname"
        return
    }

    if (!Validate('password', pwd)) {
        document.getElementById("err_msg").innerHTML = "Password should contain at least 1 digit, 1 upper case letter, 1 lower case letter, length min 8"
        return
    }

    if (!Validate('phone', num)) {
        document.getElementById("err_msg").innerHTML = "Incorrect phone number"
        return
    }

    if (pwd != conf) {
        document.getElementById("err_msg").innerHTML = "Passwords doesn't match"
        return
    }

    if (month < 1 || month > 12 ) {
        document.getElementById("err_msg").innerHTML = "Month out of range"
        return
    }

    if (day < 1 || day > 31) {
        document.getElementById("err_msg").innerHTML = "Day out of range"
        return
    }

    if (year > new Date().getFullYear()) {
        document.getElementById("err_msg").innerHTML = "Year out of range"
        return
    }

    document.getElementById("err_msg").innerHTML = ""

    let date = month + "." + day + "." + year


    let user = {
        email: form_email,
        name: fname,
        surname: sname,
        password: pwd,
        birth_date: date,
        country: country,
        phone: num,
        isAdmin: false,
        isBanned: false
    }

    
    users.push(user)

    Store('users', users)
    window.open('./login.html', "_self")
    return
}