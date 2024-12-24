let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discound = document.getElementById("discound")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let btn = document.getElementById("btn")


let mood = 'create'
let tmp;
// get totla

function getTotal() {
    if (price.value != '') {

        let result = (+price.value + +taxes.value + +ads.value)
            - +discound.value

        total.innerHTML = result
        total.style.backgroundColor = "green"
    } else {
        total.innerHTML = ''
        total.style.backgroundColor = "red"
    }


}


// create product

let dataPro;
if (localStorage.product != null) {

    dataPro = JSON.parse(localStorage.product)

} else {
    dataPro = [];
}

btn.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discound: discound.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value !=''  && price.value != '' && category.value != '') {
       
    if (mood === 'create') {
        if (newPro.count > 1) {

            for (let i = 0; i < newPro.count; i++) {

                dataPro.push(newPro)
            }
        } else {
            dataPro.push(newPro)

        }
    }else{
        dataPro[tmp]=newPro
        btn.innerHTML= 'create'
        mood= 'create'
        count.style.display = 'block'
    }
    clearData()
    }else{
        alert('plees inter all data')
    }



    localStorage.setItem("product", JSON.stringify(dataPro))
    console.log(dataPro);


 
    showData()
}


// clear data

function clearData() {
    title.value = '',
        price.value = '',
        taxes.value = '',
        ads.value = '',
        discound.value = '',
        count.value = '',
        total.innerHTML = '',
        category.value = ''

}

// show data


function showData() {

    getTotal()

    let table = '';

    for (let i = 0; i < dataPro.length; i++) {

        
        table +=
            `
        <tr>
                    <td> ${i} </td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discound}</td>
                     <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                     <td ><button onclick ="updatData( ${i}) " id ="update">update</button></td>
                    <td><button onclick ="deletData( ${i})" id ="delete">delete</button></th>

       </tr>

        `

    }

    document.getElementById("tbody").innerHTML = table
    let deleteAll = document.getElementById("deleteAll")
    if (dataPro.length > 0) {

        deleteAll.innerHTML =
            `<button onclick ="deleteAllData()" >delete All (${dataPro.length})</button>`

    } else {
        deleteAll.innerHTML = '';

    }

}
showData()

// delet data 

function deletData(i) {

    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

// deleteAll

function deleteAllData() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// updatData

function updatData(i) {

    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discound.value = dataPro[i].discound;
    getTotal();
    count.style.display = 'none'
    category.value = dataPro[i].category;

    btn.innerHTML = 'Update'
    mood = 'Update'
     tmp = i

     scroll({
        top:0,
        behavior:'smooth'
     })
 
}


// search 
 let searchMood = 'title'
function getSearchMood(id){

let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title'
        
    }else{
          searchMood= 'category'
    }
    search.placeholder = `search by  ${searchMood}`
    search.focus()
    search.value = '';
    showData();

}


function searchData(value){

    console.log(value);
    

    let table = '';

    if (searchMood == 'title') {

        for (let i = 0; i < dataPro.length; i++) {

            if (dataPro[i].title.includes(value.toLowerCase())) {

                console.log(i);
                

                table +=
                `
            <tr>
                        <td> ${i} </td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discound}</td>
                         <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                         <td ><button onclick ="updatData( ${i}) " id ="update">update</button></td>
                        <td><button onclick ="deletData( ${i})" id ="delete">delete</button></th>
    
           </tr>
    
                `
                
            }
            
        }
        
    }else{

        for (let i = 0; i < dataPro.length; i++) {

            if (dataPro[i].category.includes(value.toLowerCase())) {

                console.log(i);
                

                table +=
                `
            <tr>
                        <td> ${i} </td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discound}</td>
                         <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                         <td ><button onclick ="updatData( ${i}) " id ="update">update</button></td>
                        <td><button onclick ="deletData( ${i})" id ="delete">delete</button></th>
    
           </tr>
    
                `
                
            }
            
        }
        
    }
    

    document.getElementById("tbody").innerHTML = table

}

