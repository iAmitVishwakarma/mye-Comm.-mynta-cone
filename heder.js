// Define constants for magic numbers
let productCategory = ["All Product", ...[...new Set(dataItem.map(product => product.category))]];
const HEADER_SCROLL_THRESHOLD = 100;
const HEADER_TOP_PADDING = '20px';
let wishlistsData = JSON.parse(localStorage.getItem('wishlistsData'));


// Define functions wishlisticon btn
function wishlisticon(item){

  if (wishlistsData == null){
    return  "ri-heart-line"
  } else{
    return wishlistsData.includes(item) ? "ri-heart-fill": "ri-heart-line"
  }
  
}

// Define functions for event handling
function handleWindowScroll() {
  const headerMenubar = document.querySelector('.header-menubar');
  headerMenubar.style.top = window.scrollY <= HEADER_SCROLL_THRESHOLD ? HEADER_TOP_PADDING : '0';
}



function handleCartIcon() {
  const cartIcon = document.querySelector('#cartIcon');
  const cartCount = getCartCount();
  cartIcon.querySelector('span').textContent = cartCount;
  cartIcon.querySelector('span').style.display = cartCount > 0 ? 'flex' : 'none';
}

function getCartCount() {
  try {
    return JSON.parse(localStorage.getItem('addTocart'))?.length || 0;
  } catch (error) {
    console.error('Error parsing cart data:', error);
    return 0;
  }
}

function renderHeaderMenubar() {
  const headerMenubar = document.querySelector('.header-menubar nav');
  headerMenubar.innerHTML = genrateHeaderHTML();
  document.getElementById('productSearchform').addEventListener('submit', productSearch );
}

function genrateHeaderHTML(){
  if (window.location.pathname === '/public/page/bagCart.html') {
    return `<ul class="onBagpage"> <ul>
    <li class="bag">BAG</li><span>-------</span>
    <li class="address">ADDRES </li><span>------- </span>
    <li class="payment  ">PAYMENT</li>
    </ul>
    <ul>
    <div> 100% SECURE</div>
     </ul>
     </ul>`
   }
   else if(window.location.pathname === '/public/page/productPage.html'){
   return `<ul class="onIndex"  style="
   float: right;"
   >
    <ul style=" gap: 20px;" >
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li><a href="#" onclick="BtnOfShopCart(this)" id="cartIcon"><i style=" font-size:30px; "  class="ri-shopping-cart-fill"></i>
        <span></span></a></li>
    </ul>
    </ul>`
   }
   else{
  return `
  <ul class="onIndex">
  <form id="productSearchform" action="#productSearch" >
  <input type="text" id="productSearch" value="" placeholder="Search for product">
  <button id="submit" type="submit">Search</button>
  </form >
  <ul>
    <li>
      <div class="category" id="option-list" onclick="activeList(this)">
        <a href="#"> <span class="category"> Categories</span>
         <span id="arrow">⮟</span></a>
        <div id="list" class="otions ">
        </div>
      </div>
    </li>

    <li><a href="#About">About Us</a></li>
    <li><a href="#Follow">Contact</a></li>
    <li><a href="#"  onclick="wishlistBtn(this)"><i class="ri-heart-line"></i></a></li>
    <li><a href="#ShopCart" onclick="BtnOfShopCart(this)" id="cartIcon"><i class="ri-shopping-cart-fill"></i>
      <span></span></a></li>
  </ul>
  </ul>`} 


}

function activeList(elem){
// console.log(elem.querySelector("#list"));
elem.querySelector("#arrow").textContent = elem.querySelector("#arrow").textContent =="⮟" ?"⮝":"⮟"
elem.querySelector("#list").style.display =elem.querySelector("#list").style.display ==  "grid" ? "none": "grid"
}



function productSearch(e) {
  e.preventDefault();
  if (!dataItem || !Array.isArray(dataItem)) {
    console.error("dataItem is not an array of products");
    return;
  }

  const searchQuery = e.target[0].value.trim().toLowerCase(); // Use e.target.value instead of e.target[0].value
  if (!searchQuery) {
    console.log("Search query is empty");
    return;
  }

  const productSearch = dataItem.filter((product) => product.title.toLowerCase().includes(searchQuery));

  if (productSearch.length === 0) {
    document.querySelector(".hero").innerHTML = "";
    let products = document.querySelector(".products");
    products.innerHTML = "<h1>No products found</h1>";

  } else {
    searchResultsHtml(productSearch)
  }

  e.target[0].value = ""; // Clear the search input field
}

function searchResultsHtml(searchData) {
  document.querySelector(".container h1 span").innerHTML =""
  document.querySelector(".container h1 span").innerHTML = `Product Search`;
  let searchHtml = "";
  document.querySelector(".hero").innerHTML = "";
  let products = document.querySelector(".products");
  products.innerHTML = "";

  searchData.forEach((product) => {
    searchHtml += `<div class="product-card">
                     <div  onclick="Product(${product.id})"   >
                     <img src="${product.image}" alt="${product.title}" class="product-image">
                     <h2 class="product-title" id="${product.id}">${product.title}</h2>
                     <p class="product-price"><b>Discount Price: $ ${product.price}
                     </b>  <s>Original Price :$ ${(
                       product.price +
                       product.price * 0.5
                       ).toFixed(2)}</s></p>
                     <h1 class="product-categroies">${product.category}</h1>
                     </div>
                     <div class="utilyBtn" >
                     <button class="add-to-cart" onclick="AddToCard(${product.id})"> <i class="ri-shopping-cart-fill"></i> </button>
                     <button class="wishlist" onclick="wishlist(${product.id}, this)"><i class=${wishlisticon(product.id)}></i></button>
                     </div>
                     </div>`
  });
  products.innerHTML = searchHtml;
}


//this function handle by wishlist  icon on nav bar 

// console.log(i.getAttribute("click"));


function wishlistBtn(element) {
element.classList.toggle("btnClick");
// console.log(element.className);
  let wishlistHtml = ""
  const storedWishlistsData = JSON.parse(localStorage.getItem('wishlistsData'))  || [];

  if (storedWishlistsData.length === 0) {
      alert("nan")
      // productCards()
  } else if (element.classList == "btnClick") {
    if(window.location.pathname == '/public/index.html'){
      element.href = '#wishlist'
      // console.log("hllo");
      // wishlistDataHtml(storedWishlistsData ,wishlistHtml  )
      } }else if (element.classList == "") { 
       console.log("hello");
        element.href = '#'
        //   
  



}}


function wishlistDataHtml(){


  let wishlistHtml = ""
  const storedWishlistsData = JSON.parse(localStorage.getItem('wishlistsData'))  || [];



  document.querySelector(".hero").innerHTML = ""
    
  let products = document.querySelector(".products");
        products.innerHTML = ""
        dataItem.forEach((product)=>{
          if(storedWishlistsData.includes(product.id)){
            wishlistHtml += `<div class="product-card">
                               <div  onclick="Product(${product.id})"   >
                               <img src="${product.image}" alt="${
                                 product.title
                                }" class="product-image">
                                <h2 class="product-title" id="${product.id}">${product.title}</h2>
                                <p class="product-price"><b>Discount Price: $ ${product.price}
                                </b>  <s>Original Price :$ ${(
                                  product.price +
                                  product.price * 0.5
                                  ).toFixed(2)}</s></p>
                                  <h1 class="product-categroies">${product.category}</h1>
                                  </div>
                                  <div class="utilyBtn" >
                                  <button class="add-to-cart" onclick="AddToCard(${
                                    product.id
                                  } )"> <i class="ri-shopping-cart-fill"></i> </button>
                                  <button class="wishlist" onclick="wishlist(${
                                    product.id
                                  } ,this)"><i class=${wishlisticon(product.id)}></i></button>
                                  
                                  </div>
                                  </div>`
                                }
        })
        document.querySelector(".container h1 span").innerHTML = `wishlist`;
        products.innerHTML = wishlistHtml
}


function categoryDropdownList() {
  let category_Option = document.querySelector("#list");
  let categories = "";
  productCategory.forEach((category) => {
    categories += ` 
         <a href="#${category}"   id="${category}" onclick="categoryDropdown(this)">
        ${category.toUpperCase()}
      </a>  `;
      
  });
  category_Option.innerHTML = categories;

}

function categoryDropdown(item) {
  const productSection = document.querySelector(".container h1 span");
  productSection.textContent = item.id.toUpperCase();

  const selectedCategoryId = item.id;
  const filteredData = dataItem.filter((product) => product.category === selectedCategoryId);
  categoryHTML(filteredData)
};


function categoryHTML(item) {

    document.querySelector(".hero").innerHTML = ""
  let filteredDataHTML = ""
  let products = document.querySelector(".products");
  let wishlistsData = JSON.parse(localStorage.getItem('wishlistsData'))
  item.forEach((product) => {
      const wishlisticon = wishlistsData.includes(product.id)
        ? "ri-heart-fill"
        : "ri-heart-line";
      // ...
      filteredDataHTML += `
            <div class="product-card">
            <div  onclick="Product(${product.id})"   >
              <img src="${product.image}" alt="${
        product.title
      }" class="product-image">
              <h2 class="product-title" id="${product.id}">${product.title}</h2>
              <p class="product-price"><b>Discount Price: $ ${product.price}
              </b>  <s>Original Price :$ ${(
                product.price +
                product.price * 0.5
              ).toFixed(2)}</s></p>
              <h1 class="product-categroies">${product.category}</h1>
              </div>
            <div class="utilyBtn" >
            <button class="add-to-cart" onclick="AddToCard(${
              product.id
            } )"> <i class="ri-shopping-cart-fill"></i> </button>
            <button class="wishlist" onclick="wishlist(${
              product.id
            } ,this)"><i class=${wishlisticon}></i></button>
        
        </div>
        </div>
          `;
    });
    if (item.length == 0) {
      productCards()
    }else{
    products.innerHTML = filteredDataHTML
 
       }   // Update the bag icon
  handleCartIcon()
}

function setItem(){
  if(window.location.hash == '#wishlist'){
  wishlistDataHtml()
}else if(window.location.hash == ""){        
    document.querySelector(".products").innerHTML = ""
  
    heroPoster()
    productCards()
    document.querySelector(".container h1 span").innerHTML = "Tranding"
   
    }

}

// Set up event listeners
window.addEventListener('scroll', handleWindowScroll);
window.addEventListener('hashchange', setItem);
// Initialize header menubar and cart icon

renderHeaderMenubar();

if (window.location.pathname === '/public/page/bagCart.html') {
  // Do nothing
} else  if (window.location.pathname === '/public/page/productPage.html'){
  handleCartIcon();
}else{
  handleCartIcon();
  categoryDropdownList();
}
