const url = 'http://localhost:8079/api/admin'

const table = document.querySelector('#tbody-all')
const headerInfoEl = document.querySelector('span')

let result = '';
let resCurrent = '';

// const headerInfo = (currentUser) => {
//     resCurrent += `<strong>${currentUser.email}</strong><span> with roles: </span>`
//     currentUser.roles.forEach(role => {
//         resCurrent += `<span>${role.name.replaceAll('ROLE_', '')} </span>`
//     })
//     headerInfoEl.innerHTML = resCurrent
// }

fetch("http://localhost:8079/api")
    .then(res => { res.json().then(
        currentUser=>{
            resCurrent += `<strong>${currentUser.email}</strong><span> with roles: </span>`
            currentUser.roles.forEach(role => {
                resCurrent += `<span>${role.name.replaceAll('ROLE_', '')} </span>`
            })
            headerInfoEl.innerHTML = resCurrent
        }
    )})

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
            document.getElementById('edit_id').value = `${user.id}`
            document.getElementById('edit_name').value = `${user.name}`
            document.getElementById('edit_surname').value = `${user.surname}`
            document.getElementById('edit_age').value = `${user.age}`
            document.getElementById('edit_email').value = `${user.email}`
            document.getElementById('edit_password').value = `${user.password}`
            // document.getElementById('edit_roles_select').value = `${user.roles}`
            document.getElementById('editSuccess').onclick = () => {
                let id = 0
                let rolesList = [];
                for (let i = 0; i < document.getElementById('edit_roles_select').value.length; i++) {
                    if (document.getElementById('edit_roles_select').value[i] === 'ROLE_ADMIN') {
                        id = 1
                    } else {
                        id = 2
                    }
                    rolesList[i] = {id: `${id}`, role: document.getElementById('edit_roles_select').value[i]};
                }
                let user = {
                    id: document.getElementById('edit_id').value,
                    name: document.getElementById('edit_name').value,
                    surname: document.getElementById('edit_surname').value,
                    age: document.getElementById('edit_age').value,
                    email: document.getElementById('edit_email').value,
                    password: document.getElementById('edit_password').value,
                    roles: `${rolesList}`
                }
                console.log(user)
                patchRequest(user)
            }
        })
        const btnDelete = document.getElementById(`deleteBtn${user.id}`)
        btnDelete.addEventListener('click', (e) => {
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

async function patchRequest(user) {
    await fetch(url, {
        method: 'PATCH',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })
        // .then(response => response.json())
        // .then(data => {
        //     const editUserInTable = []
        //     editUserInTable.push(data)
        //     usersTable(editUserInTable)
        // })
}

async function postRequest(user) {
    await fetch(url, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(user)
    })

}

async function deleteRequest(url) {
    console.log('Deleting')
    let path = window.location.origin + url
    await fetch(path, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
}

// ---------------------------------------------------------------------

document.getElementById('addNewUserBtn').addEventListener('click', (e) => {
    e.preventDefault()
    let id = 0
    let rolesList = [];
    for (let i = 0; i < document.getElementById('roles').value.length; i++) {
        if (document.getElementById('roles').value[i] === 'ROLE_ADMIN') {
            id = 1
        } else {
            id = 2
        }
        rolesList[i] = {id: `${id}`, role: `${document.getElementById('roles').value[i]}`};
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
            .then(response => response.json())
            .then(data => {
                const newUserInTable = []
                newUserInTable.push(data)
                usersTable(newUserInTable)
            })
            .then(() => document.getElementById('table_users').click())
})

// ---------------------------------------------------------------------


// ---------------------------------------------------------------------

fetch('http://localhost:8079/api/admin')
    .then(response => response.json())
    .then(data => usersTable(data))

// fetch(url + '/currentUser')
//     .then(response => response.json())
//     .then(data => headerInfo(data))




