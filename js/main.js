const elForm = document.querySelector('.form');
const elName = document.querySelector('.js-name');
const elNumber = document.querySelector('.js-tel');
const elSelect = document.querySelector('.js-select');
const elList = document.querySelector('.list');
const elBtnList = document.querySelector('.js-btn-list');

// btns 
const elAllBtn = document.querySelector('.all');
const elFamilyBtn = document.querySelector('.family');
const elFriendsBtn = document.querySelector('.friends');
const elWorkBtn = document.querySelector('.work');
const elAZBtn = document.querySelector('.AZ');
const elZABtn = document.querySelector('.ZA');
// 
// const btnAll = document.querySelector('.btn-outline-success');
// strong 
const elStrongAll = document.querySelector('.all-strong');
const elStrongWork = document.querySelector('.work-strong');
const elStrongFamily = document.querySelector('.family-strong');
const elStrongFriends = document.querySelector('.friends-strong');

const letters = /^[a-zA-Z]+$/;
let plus = 1;
let arr = [];

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let valueName = elName.value.trim();
    let numberValue = elNumber.value.trim();
    let selectValue = elSelect.value;
    if(valueName.length > 50) {
        alert('Please enter a name')
        return
    }
    if(isNaN(numberValue)){
        alert('Please enter the number!')
        return
    } 
    let r = arr.some((item) => {
        return item.number == numberValue;
    });
    if(r) {
        alert('This number already added')
        return
    }
    if(numberValue.startsWith('+', 1)) {
        alert('Please starts with +')
        return
    }
    if(!letters) {
        alert('Please enter a number') 
        return
    }
    if(selectValue == 'Type') {
        alert('Choose a type')
        return
    }
    
    arr.push({name: valueName,
        number: numberValue,
        type: selectValue,
        id: arr.length ? arr.at(-1).id + 1 : 1,
    })
    render(arr, elList)
});

elBtnList.addEventListener('click', (evt) => {
    if(evt.target.matches('.js-delete-btn')) {
        let deletedTodoId = evt.target.dataset.id;
        let deletedTodoIndex = arr.findIndex((item) => item.id == deletedTodoId);
        arr.splice(deletedTodoIndex, 1);
        render([...arr], elList);
    }
})





// btn functions
function btnfunc() {
    elStrongAll.textContent = arr.length ? arr.length : 0;
    
    let family = arr.filter((item) => item.type == 'family');
    elStrongFamily.textContent = family?.length ? family?.length : 0;
    
    let work = arr.filter((item) => item.type == 'work');
    elStrongWork.textContent = work.length;
    
    let friends = arr.filter((item) => item.type == 'friends')
    elStrongFriends.textContent = friends.length;
}


elAllBtn.addEventListener('click', () => {
    render([...arr], elList)
})
elFamilyBtn.addEventListener('click', () => {
    render([...arr.filter((item) => item.type == 'family')], elList)
})
elWorkBtn.addEventListener('click', () => {
    render([...arr.filter((item) => item.type == 'work')], elList)
})
elFriendsBtn.addEventListener('click', () => {
    render([...arr.filter((item) => item.type == 'friends')], elList)
})

elAZBtn.addEventListener('click', () => {
    let sortAZ = arr.sort((a,b) => 
    a.name.toLowerCase().charCodeAt() - b.name.toLowerCase().charCodeAt(),  
    );
    render([...arr], elList);
})
elZABtn.addEventListener('click', () => {
    let sortedZA = arr.sort((a,b) => 
    b.name.toLowerCase().charCodeAt() - a.name.toLowerCase().charCodeAt(),  
    );
    render([...arr], elList);
})


function render(array, node) {
    node.innerHTML = '';
    btnfunc();
    array.forEach((item) => {
        const liElement = document.createElement('li');
        liElement.setAttribute('class', 'border p-2');
        
        
        const titleElement = document.createElement('h3');
        titleElement.setAttribute('class', '');
        titleElement.textContent = `${item.name}`;
        
        const telElement = document.createElement('span');
        telElement.setAttribute('class', 'fs-4');
        telElement.textContent = `${item.number}`;
        telElement.setAttribute('href', item.number);
        
        
        const typeELement = document.createElement('button');
        typeELement.setAttribute('class', 'btn btn-outline-success');
        typeELement.textContent = item.type;
        
        const wrapElement = document.createElement('div');
        wrapElement.setAttribute('class', 'wrap');
        
        const wrapSecondElement = document.createElement('div');
        wrapSecondElement.setAttribute('class', 'wrapSecond');
        wrapSecondElement.append(titleElement,telElement);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('border', 'btn', 'btn-danger', 'js-delete-btn')
        deleteBtn.dataset.id = item.id;
        console.log(deleteBtn);
        deleteBtn.textContent = `Delete`;
        
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('d-flex','gap-2')
        
        btnWrapper.append(typeELement, deleteBtn);
        wrapElement.append(wrapSecondElement,btnWrapper);
        liElement.append(wrapElement);
        
        node.appendChild(liElement)
        
        btnfunc();
    })
};
