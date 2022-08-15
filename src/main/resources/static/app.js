const url = 'http://localhost:8079/api/admin'

const table = document.querySelector('#tbody-all')
const currentUserTable = document.querySelector('#tbody-user')
const headerInfoEl = document.querySelector('span')

let result = ''
let resCurrent = ''
let resUserTable = ''

const headerInfo = (currentUser) => {
    resCurrent += `<strong>${currentUser.email}</strong><span> with roles: </span>`
    currentUser.roles.forEach(role => {
        resCurrent += `<span>${role.name.replaceAll('ROLE_', '')} </span>`
    })
    headerInfoEl.innerHTML = resCurrent
}

const usersTable = (allUsers) => {
    allUsers.forEach(user => {
        result += `
                <tr>
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
            e.preventDefault()
            document.getElementById('edit_id').value = `${user.id}`
            document.getElementById('edit_name').value = `${user.name}`
            document.getElementById('edit_surname').value = `${user.surname}`
            document.getElementById('edit_age').value = `${user.age}`
            document.getElementById('edit_email').value = `${user.email}`
            document.getElementById('edit_password').value = `${user.password}`
            // document.getElementById('edit_roles_select').value = `${user.roles}`
            document.getElementById('editSuccess').onclick = () => {
                let user = {
                    id : document.getElementById('edit_id').value,
                    name : document.getElementById('edit_name').value,
                    surname : document.getElementById('edit_surname').value,
                    age : document.getElementById('edit_age').value,
                    email : document.getElementById('edit_email').value,
                    password : document.getElementById('edit_password').value,
                    roles : [{
                        id : 2,
                        name : 'ROLE_USER'
                    }]
                }
                console.log(user)
                patchRequest('/api/admin/user', user)
                    .then(user => console.log(user))
            }
        })
        const btnDelete = document.getElementById(`deleteBtn${user.id}`)
        btnDelete.addEventListener('click', (e) => {
            e.preventDefault()
            document.getElementById('delete_id').value = `${user.id}`
            document.getElementById('delete_name').value = `${user.name}`
            document.getElementById('delete_surname').value = `${user.surname}`
            document.getElementById('delete_age').value = `${user.age}`
            document.getElementById('delete_email').value = `${user.email}`
            document.getElementById('delete_roles').value = `${user.roles}`
            document.getElementById('deleteBtn').onclick = () => {

                deleteRequest(`/api/admin/${user.id}`)
            }
        })
    })
}
async function patchRequest (url, user) {
    let path = window.location.origin + url
    await fetch(path, {
        method : "PATCH",
        headers : {"Content-type" : "application/json; charset=UTF-8"},
        body : JSON.stringify(user)
    })
}

async function deleteRequest (url) {
    console.log('Deleting')
    let path = window.location.origin + url
    await fetch(path, {
        method : "DELETE",
        headers : {"Content-type" : "application/json; charset=UTF-8"}
    })
}

// ---------------------------------------------------------------------

document.getElementById('addNewUserBtn').onclick = () => {

    let newUser = {
        id : 0,
        name : document.getElementById('new_name').value,
        surname : document.getElementById('new_surname').value,
        age : document.getElementById('new_age').value,
        email : document.getElementById('new_email').value,
        password : document.getElementById('new_password').value,
        roles : [{id : 2, name : "ROLE_USER"}]
    }
    patchRequest("/api/admin/user", newUser).then(user => console.log(user))
}


// ---------------------------------------------------------------------



// ---------------------------------------------------------------------

const userTable = (currentUser) => {
        resUserTable += `
                <tr>
                    <td>${currentUser.id}</td>
                    <td>${currentUser.name}</td>
                    <td>${currentUser.surname}</td>
                    <td>${currentUser.age}</td>
                    <td>${currentUser.email}</td>
                    <td>
    `
        currentUser.roles.forEach(role => {
            resUserTable += `
                    <a>${role.name.replaceAll('ROLE_', '')}</a>
            `
        })
        resUserTable += `</td>
                          </tr>`
    currentUserTable.innerHTML = resUserTable
}

fetch(url)
    .then(response => response.json())
    .then(data => usersTable(data))

fetch(url+'/currentUser')
    .then(response => response.json())
    .then(data => headerInfo(data))

fetch(url+'/currentUser')
    .then(response => response.json())
    .then(data => userTable(data))




