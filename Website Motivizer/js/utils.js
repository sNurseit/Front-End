function GetUsersTable() {
    let usersTable = JSON.parse(localStorage.getItem("users"))
    return usersTable
}

function Store(location, item) {
    localStorage.setItem(location, JSON.stringify(item))
}

function GetActiveUser() {
    let activeUser = JSON.parse(localStorage.getItem("authorization"))
    return activeUser
}

function GetPlansList() {
    let plansList = JSON.parse(localStorage.getItem("plans"))
    if (plansList == null) {
        plansList = []
    }
    return plansList
}

function Validate(type, obj) {
    switch (type) {
        case "email": var regexp = /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                    return regexp.test(obj)

        case "password": var regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
                    return regexp.test(obj)

        case "phone": var regexp = /^(?=.\d).{11,11}$/
                    return regexp.test(obj)

        case "name": var regexp = /[A-Za-z]/
                    return regexp.test(obj)
    }
}

let usr = GetActiveUser()
if (usr != null) {
    let a = document.getElementById('login')
    if (a != null) {
        a.removeAttribute("href")
        a.innerHTML = usr.email
        a.setAttribute("onclick", "Logout()")
    }
}

function Logout() {
    localStorage.removeItem("authorization")
    location.reload()
}

let map;

function initMap() {
    const myLatLng = { lat: 43.23526380971831, lng: 76.90979270789299 }
    
    map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 16,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
  });
}

function comingSoon() {
    alert("Will be Added Soon")
}

function CheckUserExistence(email) {
    let usersTable = JSON.parse(localStorage.getItem("users"))
    let user = usersTable.find(u => u.email === email)   
    if (user == null) {
        return true
    }

    return false
}