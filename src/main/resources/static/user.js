const url = 'http://localhost:8079/api/user'

fetch(url + '/currentUser')
    .then(response => response.json())
    .then(data => headerInfo(data))

fetch(url + '/currentUser')
    .then(response => response.json())
    .then(data => userTable(data))

const currentUserTable = document.querySelector('#tbody-user')
const headerInfoEl = document.querySelector('span')

let resCurrent = '';
let resUserTable = '';


const headerInfo = (currentUser) => {
    resCurrent += `<strong>${currentUser.email}</strong><span> with roles: </span>`
    currentUser.roles.forEach(role => {
        resCurrent += `<span>${role.name.replaceAll('ROLE_', '')} </span>`
    })
    headerInfoEl.innerHTML = resCurrent
}

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