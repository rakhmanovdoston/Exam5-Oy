let container =document.querySelector(".container");

async function fetchProducts(){
    let response =await fetch("https://fakestoreapi.com/products");
    const products =await response.json();

    return products;
};

async function init(products){
    checkToken();

    products =await fetchProducts();
    render(products);
};

function checkToken(){
    const token = localStorage.getItem("token");
    

    if(!token){
        window.location.href ="http://127.0.0.1:5500/login.html"
    }
}

function render(products){
    products.forEach(function(product){
        const li =document.createElement("li");
        let a =document.createElement("a");

        const img =document.createElement("img");
        img.src= product.image;
        img.classList.add("liImage")
        li.appendChild(img);

        const title=document.createElement("p");
        title.textContent =product.title;
        title.classList.add("title");
        a.append(title);
        li.appendChild(a);

        const price =document.createElement("strong");
        price.textContent =`$${product.price}`;
        price.classList.add("price")
        li.appendChild(price);

        const stars ="<span>⭐️</span>".repeat(Math.round(product.rating.rate));
        const divStars =document.createElement("div");
        divStars.insertAdjacentHTML("beforeend",stars);

        const ratingCount =document.createElement("div");
        ratingCount.textContent =`(${product.rating.count})`;
        ratingCount.classList.add("count")
        li.appendChild(ratingCount);

        const divPrice =document.createElement("div");
        divPrice.classList.add("div");
        divPrice.append(price)
        divPrice.append(divStars);
        divPrice.append(ratingCount);
        li.append(divPrice);
        
        li.style.cursor ="pointer";
        li.addEventListener("click",function(event){
            if(event){
                window.location.href =`http://127.0.0.1:5500/product.html?id=${product.id}`
            }
        })
        li.classList.add("li");

        container.appendChild(li);
    });
};


init();