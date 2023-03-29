$(document).ready(function() {
    let user = GetActiveUser(),
        users = GetUsersTable()

    if (user == null) {
        // window.open('./login.html', "_slef")
        window.location = "./login.html"
        return
    }

    if (!user.isAdmin) {
        alert("Access denied")
        window.open("./index.html", "_self")
        return
    }

    $('#info').text(user.email) 

    let users_table = $("#users_table")

    $.each(users, function(i, elem) {
        let tr = document.createElement("tr"),
        mail = document.createElement('td'),
        btn = document.createElement('button'),
        isAdmin = document.createElement('td'),
        name = document.createElement('td')

        name.innerHTML = elem.name
        mail.innerHTML = elem.email

        if (elem.isAdmin) {
            isAdmin.innerHTML = true
        }else {
            isAdmin.innerHTML = false
        }

        btn.classList.add('btn')
        if (!elem.isBanned) {
            btn.innerHTML = "Ban"
            btn.classList.add('ban')
            btn.classList.add('user_action')
        }else {
            btn.innerHTML = "Unban"
            btn.classList.add('unban')
            btn.classList.add('user_action')
        }

        tr.appendChild(name)
        tr.appendChild(mail)
        tr.appendChild(isAdmin)
        tr.appendChild(btn)

        users_table.append(tr)
    })

    $('.user_action').click(function() {
        if ($(this).hasClass('ban')) {
            let index = $('.user_action').index(this)
            users = JSON.parse(localStorage.getItem("users"))
            users[index].isBanned = true
            localStorage.setItem("users", JSON.stringify(users))

            $(this).addClass('unban')
            $(this).removeClass('ban')

            location.reload()
        }else {
            let index = $('.user_action').index(this)
            users = JSON.parse(localStorage.getItem("users"))
            users[index].isBanned = false

            localStorage.setItem("users", JSON.stringify(users))

            $(this).addClass('ban')
            $(this).removeClass('unban')

            location.reload()
        }
    })
})