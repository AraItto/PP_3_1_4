const url = 'http://localhost:8080/api/admin'

const table = document.querySelector('#tbody-all')
const headerInfoEl = document.querySelector('span')

let result = '';
let resCurrent = '';


fetch("http://localhost:8080/api")
    .then(res => {
        res.json().then(
            currentUser => {
                resCurrent += `<strong>${currentUser.email}</strong><span> with roles: </span>`
                currentUser.roles.forEach(role => {
                    resCurrent += `<span>${role.name.replaceAll('ROLE_', '')} </span>`
                })
                headerInfoEl.innerHTML = resCurrent
            }
        )
    })

const usersTable = (allUsers) => {
    allUsers.forEach(user => {
        result += `
                <tr id="row${user.id}">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.surname}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>
                    `
        user.roles.forEach(role => {
            result += `
                    <a>${role.name.replaceAll('ROLE_', '')}</a>
                `
        })
        result += `
                    </td>
                   <td>
                       <button id="editBtn${user.id}" class="btn btn-info text-white"
                       data-bs-target="#editModal" data-bs-toggle="modal">
                           Edit
                       </button>
                   </td>
                   <td>
                       <button id="deleteBtn${user.id}" class="btn btn-danger" data-bs-toggle="modal"
                           data-bs-target="#deleteModal">
                           Delete
                       </button>
                   </td>
               <tr/>`

    })
    table.innerHTML = result
    allUsers.forEach(user => {
        const btn = document.getElementById(`editBtn${user.id}`)
        btn.addEventListener('click', (e) => {
            const realUser = document.getElementById(`row${user.id}`).children
            document.getElementById('edit_id').value = realUser[0].innerHTML
            document.getElementById('edit_name').value = realUser[1].innerHTML
            document.getElementById('edit_surname').value = realUser[2].innerHTML
            document.getElementById('edit_age').value = realUser[3].innerHTML
            document.getElementById('edit_email').value = realUser[4].innerHTML
            document.getElementById('1').selected = realUser[5].innerHTML.search('ADMIN') > 0
            document.getElementById('2').selected = realUser[5].innerHTML.search('USER') > 0
            // if (user.roles.length > 1) {
            //     document.getElementById('1').selected = true
            //     document.getElementById('2').selected = true
            // }

            const editBtn = document.getElementById('editSuccess')
            editBtn.onclick = (e) => {
                e.preventDefault()
                let rolesList = [];
                if (document.getElementById('1').selected && document.getElementById('2').selected) {
                    rolesList = [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}]
                } else if (document.getElementById('1').selected) {
                    rolesList[0] = {id: 1, name: 'ROLE_ADMIN'}
                } else if (document.getElementById('2').selected) {
                    rolesList[0] = {id: 2, name: 'ROLE_USER'}
                } else {
                    rolesList[0] = {id: 2, name: 'ROLE_USER'}
                }
                let user = {
                    id: document.getElementById('edit_id').value,
                    name: document.getElementById('edit_name').value,
                    surname: document.getElementById('edit_surname').value,
                    age: document.getElementById('edit_age').value,
                    email: document.getElementById('edit_email').value,
                    password: document.getElementById('edit_password').value,
                    roles: rolesList
                }
                patchRequest(user)
            }
        })
        const btnDelete = document.getElementById(`deleteBtn${user.id}`)
        btnDelete.addEventListener('click', () => {
            // e.preventDefault()
            document.getElementById('delete_id').value = user.id
            document.getElementById('delete_name').value = user.name
            document.getElementById('delete_surname').value = user.surname
            document.getElementById('delete_age').value = user.age
            document.getElementById('delete_email').value = user.email
            document.getElementById('deleteBtn').onclick = (e) => {
                e.preventDefault()
                deleteRequest(user.id)
            }
        })
    })
}

async function patchRequest(user) {
    await fetch(url + `/${user.id}`, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(()=>
        document.getElementById(`row${user.id}`).children[1].innerHTML=`${user.name}`)
        .then(()=>
            document.getElementById(`row${user.id}`).children[2].innerHTML=`${user.surname}`)
        .then(()=>
            document.getElementById(`row${user.id}`).children[3].innerHTML=`${user.age}`)
        .then(()=>
            document.getElementById(`row${user.id}`).children[4].innerHTML=`${user.email}`)
        .then(()=>
            user.roles.forEach(role =>
            document.getElementById(`row${user.id}`).children[5].innerHTML=`${role.name.replaceAll('ROLE_','')}`))
}

async function postRequest(user) {
    await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            const newUserInTable = []
            newUserInTable.push(data)
            usersTable(newUserInTable)
        })
        .then(() => document.getElementById('newUser').reset())
        .then(() => document.getElementById('tableUsers').click())
}

async function deleteRequest(id) {
    await fetch(url + `/${id}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
        .then(() => document.getElementById(`row${id}`).remove())
}

// ---------------------------------------------------------------------

document.getElementById('addNewUserBtn').addEventListener('click', (e) => {
    e.preventDefault()
    let name = ''
    let rolesList = [];
    if (document.getElementById('1-new').selected && document.getElementById('2-new').selected) {
        rolesList = [{id: 1, name: 'ROLE_ADMIN'}, {id: 2, name: 'ROLE_USER'}]
    } else if (document.getElementById('1-new').selected) {
        rolesList[0] = {id: 1, name: 'ROLE_ADMIN'}
    } else if (document.getElementById('2-new').selected) {
        rolesList[0] = {id: 2, name: 'ROLE_USER'}
    } else {
        rolesList[0] = {id: 2, name: 'ROLE_USER'}
    }
    let newUser = {
        name: document.getElementById('new_name').value,
        surname: document.getElementById('new_surname').value,
        age: document.getElementById('new_age').value,
        email: document.getElementById('new_email').value,
        password: document.getElementById('new_password').value,
        roles: rolesList
    }
    postRequest(newUser)
})


fetch('http://localhost:8080/api/admin')
    .then(response => response.json())
    .then(data => usersTable(data))





