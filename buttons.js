//this function handle by -shopping-cart icon on nav bar 
function BtnOfShopCart(i) {  //this the button of cart which work is diplay cart porduct and their length
    // console.log(productCards_Data);
    let CartSection = document.querySelector("#CartSection")
    
        window.location.href = `/public/page/bagCart.html`;
}
// end of shop cart button 

//this function handle by shopping-cart close icon
function closeBtnOfShopCart() {  // this button function work close popUp cart 

    let CartSection = document.querySelector("#CartSection")
    if (CartSection.style.display = "block") {
        CartSection.style.display = "none"
    }
}
// end

function AddToCard(product) {
    // Retrieve existing cart items from localStorage
    let existingCart = localStorage.getItem("addTocart");
    if (existingCart) {
      existingCart = JSON.parse(existingCart);
    } else {
      existingCart = [];
    }
  
    // Check if the product is already in the cart
    let index = existingCart.indexOf(product);
  
    if (index === -1) {
      // Add the new item to the existing cart
      existingCart.push(product);
    // Save the updated cart to localStorage
    let addTocartArray = JSON.stringify(existingCart);
    localStorage.setItem("addTocart", addTocartArray);
  
    // Update the UI
 
    handleCartIcon();
    } else {
      // Remove the item from the cart
      existingCart.splice(index, 1);
      // Save the updated cart to localStorage
    let addTocartArray = JSON.stringify(existingCart);
    localStorage.setItem("addTocart", addTocartArray);
  
    // Update the UI
  
    handleCartIcon();

    }
  
    
  }




//this function handle by like button icon in product cards  
function wishlist(wishlist, element) {
    if (element.children[0].className === "ri-heart-line") {
        element.children[0].className = "ri-heart-fill"
        element.classList.toggle("wishitedri-heart-fill")
       
        
    } else {
        element.children[0].className = "ri-heart-line"
        element.classList.remove("wishitedri-heart-fill")
        
    }

   
    

    let wishlistsData = JSON.parse(localStorage.getItem('wishlistsData'));
    if (!wishlistsData) {
        wishlistsData = []; // Initialize to an empty array if it doesn't exist
    }

    const index = wishlistsData.indexOf(wishlist);
    if (index === -1) {
        // Add to wishlist if it doesn't exist
        wishlistsData.push(wishlist);
    } else {
        // Remove from wishlist if it already exists
        wishlistsData.splice(index, 1);
    }
    // Save the updated wishlistsData to local storage
    localStorage.setItem('wishlistsData', JSON.stringify(wishlistsData));
}
// end 


function decrease(i) {
    let quantity = i.parentNode.querySelector('.quntity-Value');
 
   if(quantity.innerHTML <= 0) {
    quantity.innerHTML = 0
   }
   else {
    quantity.innerHTML --
  }
}

function increse(i) {
    let quantity = i.parentNode.querySelector('.quntity-Value');
//    let qv =  quantity.value++
 quantity.innerHTML ++

 console.log( quantity.innerHTML + "     " + quantity.className );
}

function buyNow( ) {
  alert(`You are buying ${count} item(s) now!`);
}