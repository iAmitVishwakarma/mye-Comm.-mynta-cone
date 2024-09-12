

const ranNumposter = Math.floor(Math.random() * dataItem.length);
 function productCards() {
  
  let products = document.querySelector(".products");
   dataItem.forEach((product) => {
    
    // ...
    products.innerHTML += `
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
          } ,this)"><i class=${wishlisticon(product.id)}></i></button>
      
      </div>
      </div>
        `;
  });
}

function heroPoster() {
  let poster = document.querySelector(".hero");
  const product = dataItem[ranNumposter];
  const PosterinnerHTML = `
    <div class="poster"  onclick="Product(${product.id})">
      <div class="text-detail">
        <h4 style="text-transform: uppercase;">${product.category}</h4>
        <h1>${product.title.split(" ").slice(0, 6).join(" ")}</h1>
        <p style="text-transform: capitalize;height: 118px;overflow: hidden;margin: 0 0 -50px;">
          <i>${product.description}</i>
        </p>
      </div>
      <div class="Poster-detail">
        <img src="${product.image}" alt="${product.title}">
      </div>
    </div>
  `;
  poster.innerHTML = PosterinnerHTML;
}

function Product(id) {
  let string = JSON.stringify(id);
  localStorage.setItem("productCardsID", string);

  window.location.href = `/public/page/productPage.html`;
 
}



if(window.location.pathname == '/public/index.html'){

heroPoster()
productCards()
}