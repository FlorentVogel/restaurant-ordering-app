import {menuArray} from './data.js'

let menuOrder = []

document.addEventListener('click', function(e){
    if (e.target.id === "add-item-btn") {
        addToCart(e.target.dataset.addBtn)
    }
    else if(e.target.id === "remove-btn"){
        handleRemoveBtnClick(e.target.dataset.removeBtn)
    }
    else if(e.target.id === "order-btn"){
        handleOrderBtnClick()
    }
    else if(e.target.id === "new-order-btn"){
        handleNewOrderBtnClick()
    }  
})

document.addEventListener("submit", function(e){
    
    e.preventDefault()

    const clientName = new FormData(document.getElementById('payment-form')).get("client-name")
    
    document.getElementById("checkout").innerHTML = `
        <div class="order-complete">
            <p class="message">Thanks, ${clientName}! Your order is on its way!</p>
        </div>
        <button class="new-order-btn" id="new-order-btn">Start a new order</button>
    `
    
    document.getElementById('client-name').value = ""
    document.getElementById('card-number').value = ""
    document.getElementById('card-cvv').value = ""
    menuOrder = []
    document.getElementById("payment-modal").style.display = "none"

})

function handleNewOrderBtnClick(){
    document.getElementById("checkout").style.display = "none"
}

function handleOrderBtnClick(){
    document.getElementById("payment-modal").style.display = "block"
}

function addToCart(addBtnId) {
    const targetItemList = menuArray.filter(function(item){
        return item.id === parseInt(addBtnId, 10)
    })[0]
    
    menuOrder.push(
        {name: `${targetItemList.name}`,
        price: `${targetItemList.price}`,
        id: `${menuOrder.length}`}
    )
    
    if (menuOrder){
        document.getElementById("checkout").style.display = "block" 
    }
    
    document.getElementById("checkout").innerHTML = 
    `<h2 class="order-title">Your order</h2>
        <div class="order-area" id="order-area">              
        </div>
        <hr class="checkout-divider">
        <div class="order-total" id="order-total">
            <h2 class="order-item">Total price:</h2>
            <p class="order-item-price" id="total-price"></p>
        </div>
        <button class="order-btn" id="order-btn">Complete order</button>
        `

    getOrderHtml()

}

function handleRemoveBtnClick(removeBtnId){
    
    if (menuOrder.length === 1){
            menuOrder = []
            document.getElementById("checkout").style.display = "none"
    }
    else{
        menuOrder = menuOrder.filter(function(orderItem){
           return orderItem.id != removeBtnId 
        })
    }
    getOrderHtml()
    
}

function getOrderHtml(){
    let orderHtml = ""
    let totalPrice = 0
    
    menuOrder.forEach(function(itemOrder){
        orderHtml +=
        `<div class="order-line-item" id="order-line-item">
            <div class="order-item-container" id="order-item-container">
                <h2 class="order-item">${itemOrder.name}</h2>
                <button 
                    class="remove-btn" 
                    id="remove-btn" 
                    data-remove-btn="${itemOrder.id}">
                    remove</button>
            </div>
            <p class="order-item-price" id="order-item-price">\$${itemOrder.price}</p>
        </div>` 
        
         totalPrice += parseInt(itemOrder.price, 10)   
         document.getElementById("total-price").textContent = `\$${totalPrice}`
    })
    
    document.getElementById("order-area").innerHTML = orderHtml
}

function getListItems() {
    let listItems = ``
    menuArray.forEach(function(item){
        listItems += `
            <div class="list-item" id="item-${item.id}">
                <div class="item-graphic">${item.emoji}</div>
                <div class="description">
                    <div class="item-title"><h2>${item.name}<h2></div>
                    <div class="item-ingredients"><p>${item.ingredients}</p></div>
                    <div class="item-price"><p>€${item.price}</p></div>
                </div>
                <button class="add-item-btn" id="add-item-btn" data-add-btn="${item.id}">+</button>
            </div>
            <hr class="menu-divider">
        `
    })
    return listItems
}

function render() {
    document.getElementById('menu').innerHTML = getListItems()
} 

render()

