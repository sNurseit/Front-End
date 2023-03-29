$(document).ready(function() {
    let user = GetActiveUser()
    if (user == null) {
        window.open('./login.html', "_slef")
        return
    }

    let plansList = GetPlansList()

    // Show plans list
    if (plansList != null) {
        $.each(plansList, function(i, elem) {
            let wrapper = $("#wrapper")
            if (elem.email == user.email) {
                if (i % 2 == 0) {
                    let items = document.createElement("div"),
                        item = document.createElement("div"),
                        itemTop = document.createElement("div"),
                        h3 = document.createElement("h3"),
                        btns = document.createElement("div"),
                        editBtn = document.createElement("button"),
                        deleteBtn = document.createElement('button'),
                        itemBottom = document.createElement("div"),
                        p = document.createElement("p")

                    items.className = "planner-items"
                    item.className = "planner-item"
                    itemTop.className = "planner-item-top"
                    btns.className = "btns"
                    editBtn.className = "btn edit"
                    deleteBtn.className = "btn delete"
                    itemBottom.className = "planner-item-bottom"

                    h3.innerHTML = elem.title
                    p.innerHTML = elem.body

                    editBtn.innerHTML = "Edit"
                    deleteBtn.innerHTML = "Delete"

                    itemBottom.appendChild(p)

                    btns.appendChild(editBtn)
                    btns.appendChild(deleteBtn)

                    itemTop.appendChild(h3)
                    itemTop.appendChild(btns)

                    item.appendChild(itemTop)
                    item.appendChild(itemBottom)

                    items.appendChild(item)
                    wrapper.append(items)
                }else {
                    let items = document.getElementsByClassName("planner-items"),
                        item = document.createElement("div"),
                        itemTop = document.createElement("div"),
                        h3 = document.createElement("h3"),
                        btns = document.createElement("div"),
                        editBtn = document.createElement("button"),
                        deleteBtn = document.createElement('button'),
                        itemBottom = document.createElement("div"),
                        p = document.createElement("p")

                    items.className = "planner-items"
                    item.className = "planner-item"
                    itemTop.className = "planner-item-top"
                    btns.className = "btns"
                    editBtn.className = "btn edit"
                    deleteBtn.className = "btn delete"
                    itemBottom.className = "planner-item-bottom"

                    h3.innerHTML = elem.title
                    p.innerHTML = elem.body

                    editBtn.innerHTML = "Edit"
                    deleteBtn.innerHTML = "Delete"

                    itemBottom.appendChild(p)

                    btns.appendChild(editBtn)
                    btns.appendChild(deleteBtn)

                    itemTop.appendChild(h3)
                    itemTop.appendChild(btns)

                    item.appendChild(itemTop)
                    item.appendChild(itemBottom)

                    items[items.length - 1].append(item)
                }
            }
        } )
    }

    // create new plans 
    $("#addPlan").click(function() {
        $("#form").css("display", "block")
    })

    $("#close").click(function() {
        location.reload()
    })

    $("#createPlan").click(function() {
        let head = $("#title").val(),
            bodyText = $("#bodyText").val()

        let plan = {
            email: user.email,
            title: head,
            body: bodyText   
        }

        plansList.push(plan)
        Store("plans", plansList)


        location.reload()
    })

    // edit plan
    $(".edit").click(function() {
        let i = $(".edit").index(this)
        $("#form2").css("display", "block")

        $("#edit_title").attr('value', plansList[i].title)
        $("#edit_bodyText").text(plansList[i].body)
        $("#edit_title").attr('name', i)
    })

    $("#saveEdit").click(function() {
        let head = $("#edit_title").val(),
            bodyText = $("#edit_bodyText").val(),
            i = $("#edit_title").attr("name")

        plansList[i].title = head
        plansList[i].body = bodyText

        Store("plans", plansList)
        location.reload()

        return
    })

    // delete plan
    $(".delete").click(function() {
        let index = $('.delete').index(this)

        plansList.splice($.inArray(plansList[index], plansList), 1)

        Store("plans", plansList)
        location.reload()
    })
})