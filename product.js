init();

async function init(){

    checkToken();

    const productId =getId();
    const product =await fetchProduct(productId);
    renderProduct(product)
}

function getId (){
    const queryString=window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id =urlParams.get("id");

    return id;
};

async function fetchProduct(id){
    const response =await fetch(`https://fakestoreapi.com/products/${id}`);
    const result =await response.json();

    return result;
}

function checkToken(){
    const token =localStorage.getItem("token");
    if(!token){
        window.location.href ="http://127.0.0.1:5500/login.html"
    }
}

function renderProduct(product) {
    const conatiner =document.querySelector(".container")
    const div = document.createElement("div");
    const div2 =document.createElement("div");
    div2.classList.add("divPrisec");
    div.className = "product";

    const titlesMenu =document.createElement("div");
    titlesMenu.textContent=`Account / ${product.category} / ${product.title}`;
    titlesMenu.classList.add("titlesMenu");
    div.append(titlesMenu);

    const img = document.createElement("img");
    img.src = product.image;
    div.append(img);

    const title = document.createElement("p");
    title.textContent = product.title;
    title.classList.add("title")
    div.append(title);
    div2.append(title);

    const price = document.createElement("strong");
    price.textContent = `$${product.price}`;
    price.classList.add("pricee")
    div.append(price);
    div2.append(price)

    const stars = "<span>⭐️</span>".repeat(Math.round(product.rating.rate));
    div2.insertAdjacentHTML("beforeend", stars);

    const ratingCount = document.createElement("div");
    ratingCount.textContent = `(${product.rating.count})`;
    ratingCount.classList.add("ratingCount")
    div.append(ratingCount);
    div2.append(ratingCount);

    const description =document.createElement("p");
    description.textContent = product.description;
    description.classList.add("description");
    div2.append(description);

    // const divPrice =document.createElement("div");
    // divPrice.classList.add("div");
    // divPrice.append(divStars);
    // divPrice.append(ratingCount);
    

    div.append(div2);

    conatiner.append(div);
}