function goBack(){
  localStorage.removeItem("productCardsID");
history.go(- history.length +1);
}
function product() {
  let productCardsID = localStorage.getItem("productCardsID");
  if (!productCardsID)return ; // exit if no productCardsID is found


let discontprice = Math.floor(Math.random() * 70 + 10);
dataItem.map((item) => {

    if (item.id == productCardsID) {
      // console.log(item);

    

     
      document.getElementById("productPage").innerHTML = `
        <div class="goBack"> <button onclick="goBack()"> << go back</div>

        <div class="productImage">
          <img src="${item.image}"" alt="${item.title}">
        </div>
        <div class="product-Details">
          <h6 class="product-categroies">${item.category}</h6>
          <h2 class="productTitle">${item.title.split(" ").slice(0, 4).join(" ")}</h2>
          <span  class="product-subtitle">${item.title.split(" ").slice(4).join(" ")}</span>
          <p class="product-description">${item.description.split(" ").slice(0,50).join(" ")}</p>
          <div class="productPrice">
            <span class="price">$${item.price}</span>
            <span class="discount">${discontprice}% OFF</span>
            
            <s>  $${(item.price + (item.price * discontprice / 100)).toFixed(2)}</s>
          </div>
          <div class="btn" style="display:flex;">
          <button class="add-to-cart"  onclick="AddToCard(${item.id})"> <i class="ri-shopping-cart-fill"></i> </button>
          <button class="wishlist wishited${wishlisticon(item.id)}" onclick="wishlist(${item.id},this)"><i class=${wishlisticon(item.id)}></i></button>
        </div>
        </div>
      `;
    }
  });

}




// it for cartbag
let arrformData = [];
// Data and variables
const activeNavList = document.querySelectorAll('.header-menubar nav .onBagpage li');
let bagItemObjects;


// Function to load bag item objects from local storage
function loadBagItemObjects() {
  const storedItems = JSON.parse(localStorage.getItem('addTocart'));
  bagItemObjects = dataItem.filter((item) => storedItems.includes(item.id));
  activeNavList[0].classList.add('active');

}
// Function to display empty items
function EmptyCart(){
  document.querySelector(".bag-page").innerHTML =`
  <div class="container EmptyCart">
  <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.png" class="image-base-imgResponsive" alt="image" fetchpriority="auto" loading="eager" style="height: 165px; width: 146px;">
  <div class="message">
 <h1> Hey, it feels so light!</h1>
 
  There is nothing in your bag. Let's add some items.
 </div>
 <div> 
<button  onclick="FROMWISHLIST()">
  ADD ITEMS FROM WISHLIST
 </button>
</div>
</div>
`

}
function FROMWISHLIST(){console.log(window.location.replace("/public/index.html#wishlist"))}
// Function to display bag items
function displayBagItems() {
 
  const containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  let totalMRP = 0;
  let totalDiscount = 0;



  bagItemObjects.forEach((item) => {
    const discountPrice = Math.floor(Math.random() * 70 + 10);
    const originalPrice = item.price + (item.price * discountPrice / 100);
    totalMRP += parseFloat(originalPrice);
    totalDiscount +=  parseFloat(originalPrice- item.price);

    innerHTML += `
      <div class="bag-item-container">
        <div class="item-left-part">
          <img class="bag-item-img" src="${item.image}">
        </div>
        <div class="item-right-part">
          <div class="item-name">${item.title}</div>
          <div class="price-container">
            <span class="current-price">Rs ${item.price}</span>
            <span class="original-price">Rs ${originalPrice.toFixed(2)}</span>
            <span class="discount-percentage">(${discountPrice}% OFF)</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">10 days</span> return available
          </div>
          <div class="delivery-details">
            Delivery by
            <span class="delivery-details-days">15 Setp </span>
          </div>
        </div>
        <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
      </div>
    `;
  });

  containerElement.innerHTML = innerHTML;
  displayBagSummary(totalMRP, totalDiscount);

}

// Function to display bag summary
function displayBagSummary(totalMRP, totalDiscount) {
  const bagSummaryElement = document.querySelector('.bag-summary');
  const totalItem = bagItemObjects.length;
  const convenienceFee = 99;
  let couponPrice = 0;

  function finalPayment() {
    return totalMRP - totalDiscount + convenienceFee - couponPrice;
  }

  function renderCoupons() {
    return `<div class="Coupons">
      <h1>COUPONS</h1>
      <div class="cuponsDetails">
        <p class="cuponsText">Apply Coupons</p>
        <p class="button-4">APPLY</p>
      </div>
    </div>`;
  }

  function renderPriceSummary() {
    return `
      <div class="price-header">PRICE DETAILS (${totalItem} Items)</div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP.toFixed(2)}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount.toFixed(2)}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value convenienceFee">₹${convenienceFee}</span>
      </div>
      <div class="price-item" id="Coupon" style="display: ${couponPrice > 0 ? 'block' : 'none'};">
        <span class="price-item-tag">Coupon</span>
        <span class="price-item-value couponPrice">-₹${couponPrice.toFixed(2)}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value finalPayment">₹${finalPayment().toFixed(2)}</span>
      </div>`;
  }

  function btnPlaceOrder() {
      return `<button onclick="placeOrder(this)" class="btn-place-order">
        <div class="css-xjhrni">PLACE ORDER</div>
      </button>`;
    }
  

  // function renderBagSummary() {
  //   return ``;
  // }

  bagSummaryElement.innerHTML = `<div class="bag-details-container">
  ${renderCoupons()}
  <hr>
  ${renderPriceSummary()}
  ${btnPlaceOrder()}
</div>`

  document.querySelector(".cuponsDetails .button-4").addEventListener('click', toggleCoupon);

  function toggleCoupon() {
    couponPrice = couponPrice === 0 ? 20 : 0;
    const couponElement = document.getElementById("Coupon");
    finalPayment()
    couponElement.style.display = couponPrice > 0 ? "block" : "none";
  document.querySelector(".couponPrice").innerHTML =  `-₹${couponPrice.toFixed(2)}`
  document.querySelector(".finalPayment").innerHTML= `₹${finalPayment().toFixed(2)}`
   
  }

}


function removeFromBag(itemId) {
  // Get the stored items from local storage
  let storedItems = JSON.parse(localStorage.getItem('addTocart'));

  // Filter the stored items to remove the item with the matching itemId
  storedItems = storedItems.filter(storedItemId => storedItemId !== itemId);

  // Update the local storage with the new stored items
  localStorage.setItem('addTocart', JSON.stringify(storedItems));

  // Reload the bag item objects
  loadBagItemObjects();

  // Update the bag icon
  // handleCartIcon()

  // 
  loadBagItemObjects();
  if(bagItemObjects.length == 0 ){
    EmptyCart()
  }

  // Display the updated bag items
  displayBagItems();

  // Display the updated bag summary
  displayBagSummary();
}

function addressForm(){
  const containerElement = document.querySelector('.bag-items-container');
  containerElement.innerHTML=""
  containerElement.innerHTML=`
  <div class="address-form">
 
  <form id="addressForm" >
  <row class="addressDetail"> 
  <label for="">CONTACT DETAILS:</label>
  <input type="text" id="fullName" name="fullName" placeholder="full Name*"   required>
  <input type="tel" id="phoneNumber" name="phoneNumber"  placeholder="Mobile Number*" required>   
  <br>
  <label for="addressLine1">ADDRESS:</label>
  <input type="text" id="postalCode" name="postalCode"  placeholder="Pin code*" required> 
  <input type="text" id="addressLine1" name="addressLine1" placeholder="Address (House NO, Building, Street, Area)*" required><br>
  <input type="text" id="addressLine2" name="addressLine2" placeholder="Locality / Town•">
  <div>
  <input type="text" id="city" name="city"   placeholder="City / District *" required>
  <input type="text" id="state" name="state"  placeholder="State *"required>
  
  </div>
  </row>
  <br>
  <row class="optionBtn"  >
  <label >SAVE ADDRESS AS:</label>
  <div>
  <input type="button"  value="Home" id="home" required>
  <input type="button" value="Work" id="work" required>
  </div>
  </row>
  
  <row class="btn"  >
  <button id="submit" type="submit">Save Address</button>
  </row>
  </form>
</div>`



 const homeBtn = document.getElementById('home');
 const workBtn = document.getElementById('work');

 function toggleButtonClass(clickedBtn, otherBtn) {
   clickedBtn.classList.toggle('clicked');
   otherBtn.classList.remove('clicked');
 }

 homeBtn.addEventListener('click', () => toggleButtonClass(homeBtn, workBtn));
 workBtn.addEventListener('click', () => toggleButtonClass(workBtn, homeBtn));

document.getElementById('addressForm').addEventListener('submit', formData );
}

function addressType(){

  const homebtn = document.getElementById('home');
  const workbtn = document.getElementById('work');
  if (homebtn.classList == "clicked") { return homebtn.value }
  else if (workbtn.classList == "clicked") { return workbtn.value }
}


function formData(event) {
  event.preventDefault(); // prevent the default form submission behavior
  const dataArray = Array.from(new FormData(event.target).entries()).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  dataArray.addressType = addressType(); 

  localStorage.setItem('SelectDeliveryAddress', JSON.stringify(dataArray))
 event.target.querySelector("#submit").setAttribute("form", "fill");
 event.target.querySelector(".clicked").classList.remove('clicked')
 event.target.reset();
 SelectDeliveryAddress()

}


function SelectDeliveryAddress(){

  const containerElement = document.querySelector('.bag-items-container');
  containerElement.innerHTML=""
  let arrformData = [JSON.parse(localStorage.getItem('SelectDeliveryAddress'))]
  // console.log(arrformData);
  arrformData.forEach((element) =>{


  containerElement.innerHTML=`  <div class="container SelectDeliveryAddress">
  <h1>Select Delivery Address</h1>
  <div style="display:flex;">
  <div class="default-address" style="text-align: left;">DEFAULT ADDRESS</div>
  </div>
  <div class="address-card">
      <input type="radio" name="address" checked>
      <div class="name">${element.fullName} <span class="tag">${element.addressType}</span></div>
      <div class="details">
      ${element.addressLine1} , ${element.addressLine2}<br>
      ${element.city}, ${element.state} - ${element.postalCode}<br>
          Mobile: <span class="mobile">${element.phoneNumber}</span><br>
      </div>
      <div class="actionsbtn">
          <button>REMOVE</button>
          <button>EDIT</button>
      </div>
  </div>
  <div class="add-new-address">+ Add New Address</div>
</div>
  `
})
}


function paymentFormAndTypes(){
  const containerElement = document.querySelector('.bag-items-container');
containerElement.innerHTML=""
containerElement.innerHTML=`<div class="container paymentFormAndTypes">
<div class="payment-options">
    <h2>
     Choose Payment Mode</h2>
     <div  class="paymentOptions">
    <ul class="payment-methods">
     <li class="Recommended"  ><i class="fas fa-star"></i>
      <span>Recommended</span>
     </li>
     <li><i class="fas fa-truck"></i>
      <span>Cash On Delivery</span>
 </li>
     <li><i class="fas fa-mobile-alt"></i>
      <span>UPI (Pay via any App)</span>
         <span class="offers">2 Offers</span>
     </li>
     <li><i class="fas fa-credit-card"></i>
      <span>Credit/Debit Card</span>
      <span class="offers">8 Offers</span>
     </li>
     <li><i class="fas fa-wallet"> </i>
      <span>Wallets</span>
      <span class="offers">4 Offers</span>
     </li>
     <li><i class="fas fa-clock"></i>
      <span>Pay Later </span>
     </li>
     <li> <i class="fas fa-percentage"></i> <span>EMI</span>
     </li>
     <li> <i class="fas fa-university">  </i><span>Net Banking</span>
     </li>
    </ul>
   


    <div class="recommended-options">
    <p>Recommended Payment Options</p>
  
     <label>
      <input name="payment-option" type="radio" value="Cash on Delivery" onclick="CashonDeliveryOption(this)" />Cash on Delivery (Cash/UPI)
      <div class="codCardUI-base-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 24 16"><g fill="none" fill-rule="evenodd" transform="rotate(-6 29.622 -5.581)"><path stroke="#000" d="M19.938 1.386l1.03.072a1 1 0 0 1 .928 1.067l-.697 9.976a1 1 0 0 1-1.068.927L1.988 11.946"></path><rect width="20" height="12" stroke="#000" rx="1"></rect><path fill="#000" fill-rule="nonzero" d="M10.622 10l.744-.36-2.27-2.38c.216-.039.427-.101.633-.188.206-.086.394-.199.563-.336.17-.138.317-.3.441-.488.125-.188.214-.4.267-.637h1v-.798h-.992a1.612 1.612 0 0 0-.067-.234 2.82 2.82 0 0 0-.24-.5 1.462 1.462 0 0 0-.146-.204H12V3H8.122v.875h.559c.218 0 .414.025.588.075.174.05.325.117.454.204a1.276 1.276 0 0 1 .508.659h-2.11v.798h2.09c-.07.173-.179.32-.324.442a1.96 1.96 0 0 1-.488.298 3.005 3.005 0 0 1-1.063.23L8 7.198 10.622 10z"></path><path stroke="#000" d="M3 0c-.167.833-.5 1.5-1 2s-1.167.833-2 1M3 12c-.167-.833-.5-1.5-1-2S.833 9.167 0 9M17 0c.167.833.5 1.5 1 2s1.167.833 2 1M17 12c.167-.833.5-1.5 1-2s1.167-.833 2-1"></path></g></svg></div>
      </label>
      <div class="captcha-container">
      
    </div>
    </div>
   </div>
   </div> `


}

function placeOrder(element) {
  let deliveryAddress = JSON.parse(localStorage.getItem('SelectDeliveryAddress'));

 if(element.innerText == "PLACE ORDER"){
  element.innerHTML = "CONTINUE"
window.location.hash = "addressForm"

}else if(deliveryAddress !== null &&  element.innerHTML == "CONTINUE" ){  // // on second clcicked
element.style.display = "none"

window.location.hash = "paymentFormAndTypes"

}
}


function CashonDeliveryOption(element){

     captchaCode()
}

function captchaCode(){

  document.querySelector(".captcha-container").innerHTML = `
  <div class="captcha-code-container">
 <div class="captcha-image">
    <s>${generateCaptchaCode()}</s>
      </div>
      <div class="captcha-refresh">
      🔄
      
      </div>
     </div>
     <div class="input-container">
      <label for="captcha-input">
       Enter code shown in above image*
      </label>
      <input id="captcha-input" name="captcha-input" type="text"/>
     </div>
     <div class="note">
      You can pay via Cash/ UPI on delivery
     </div>
     <button class="place-order-btn">
      PLACE ORDER
     </button>`

   // Add event listener to the captcha refresh button
   let captchaRefresh = document.querySelector(".captcha-refresh");
   captchaRefresh.addEventListener("click", refreshCaptcha);
   
   // Function to refresh the captcha
   function refreshCaptcha() {
     // Generate a new random captcha code
     let captchaCode = generateCaptchaCode();
     let captchaText = document.querySelector(".captcha-image s");
     captchaText.textContent = captchaCode;
   }
   
   // Function to generate a random captcha code
   function generateCaptchaCode() {
     let code = "";
     for (let i = 0; i < 5; i++) {
       code += Math.floor(Math.random() * 10);
     }
     return code;
   }
   
   // Add event listener to the place order button
   let placeOrderBtn = document.querySelector(".place-order-btn");
   placeOrderBtn.addEventListener("click", placingOrderBtn);
   
   // Function to validate the captcha
   function placingOrderBtn() {
     let captchaCode = document.querySelector(".captcha-image s").textContent;
     let userInput = document.querySelector("#captcha-input").value;
    
     if (captchaCode === userInput) {
      console.log("helolo");
      orderConformed()
      generateCaptchaCode()
       // Captcha is valid, proceed with the order

       
  //  document.body.appendChild(orderConformed);

     } else {
      generateCaptchaCode()
       // Captcha is invalid, show an error message
       console.log("Invalid captcha, please try again.");
     }
   }
  }


  function orderConformed(){
    const orderConformed = `
      
           <div class="orderConformed">
               <div class="icon"></div>
               <div class="message">Thank you for ordering!</div>
               <div class="description">Your order is confirmed! Get ready for an amazing experience with us</div>
               <div class="buttons">
                   <button class="button view-order">VIEW ORDER</button>
                   <button class="button continue-shopping" 
                   onclick="CONTINUESHOPPING()"  >CONTINUE SHOPPING</button>
               </div>
           </div>
       `;

       
      //  window.location.pathname = "/public/index.html"
    const tempDiv = document.createElement('div');
    tempDiv.className = "orderConformedContainer"
    tempDiv.innerHTML = orderConformed;
    // console.log(document.body);
    document.body.appendChild(tempDiv); // Append tempDiv, not tempDiv.firstChild
    document.body.style.overflow = "hidden"
}

function CONTINUESHOPPING(){
  localStorage.removeItem('addTocart')
  window.location.hash = ""
  window.location.pathname = "/public/index.html"
}

// Check the current page and execute corresponding functions



function setActiveNavItem() {
  const hash = window.location.hash;

  // Remove active class from all list items
  activeNavList.forEach((item) => {
    item.classList.remove('active');
  });



  if(hash == ''){
    activeNavList[0].classList.add('active');
    displayBagItems();
  } else if (hash == '#addressForm') {
    if (JSON.parse(localStorage.getItem('SelectDeliveryAddress')) == null ) {
      addressForm()
    }else{
      SelectDeliveryAddress()
    }
    activeNavList[1].classList.add('active');
  } else if (hash =='#paymentFormAndTypes') {
    activeNavList[2].classList.add('active');
    // document.querySelector('.btn-place-order').style.display = "none"
    paymentFormAndTypes()
    
    // captchaCode()
  }
}




window.addEventListener('load' , ()=>{
  window.location.hash = ''
  if (window.location.pathname === '/public/page/productPage.html') {
    product();
  } else if (window.location.pathname === '/public/page/bagCart.html' ) {
    loadBagItemObjects();
    if(bagItemObjects.length > 0 ){
      window.addEventListener('hashchange', setActiveNavItem);
      displayBagItems();
      activeNavList[0].addEventListener('click', ()=>{
        window.location.hash = ''
        setActiveNavItem()
        document.querySelector('.btn-place-order').style.display = "block"
      })
      activeNavList[1].addEventListener('click', ()=>{
       if(window.location.hash  =='#paymentFormAndTypes'){
        window.location.hash = '#addressForm'
        setActiveNavItem()
        document.querySelector('.btn-place-order').style.display = "block"
      }})
    }else{
      EmptyCart()
     
    }
   
  }

  // console.log(window.location)
})
