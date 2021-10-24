const list = document.getElementById("listEl");
const productsContainer = document.getElementById("swiper-wrapper");
let menu =[]
let productArr = []
 function swiper() {
    new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    lazy: true,
    breakpoints: {
        900: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        1200: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1547: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
     
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })};

  async function getData() {

    let response = await fetch("product-list.json"); 
    let parsed = await response.json()
    let menu = await parsed.responses[0][0].params.userCategories
    let products = await parsed.responses[0][0].params.recommendedProducts 
    

    menu.forEach(element => {
       
        if(element.indexOf(">")<0){


            let listElement = document.createElement("li")
            listElement.classList.add("list-item")
            listElement.setAttribute("id", element);
            listElement.innerHTML = element
            list.appendChild(listElement)


        } else {


            let newElement = element.slice(element.indexOf(">")+1,element.length)
            let listElement = document.createElement("li")
            listElement.classList.add("list-item")
            listElement.setAttribute("id", element);
            listElement.innerHTML = newElement
            list.appendChild(listElement)
        }
       
    });

  
    
    list.children[0].classList.add("active")
    productArr = products[list.children[0].id]
    putProducts()

    let listItems = await document.querySelectorAll(".list-item  ")

    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("click", function() {
            productArr=[]
          let current = document.getElementsByClassName("active");
          current[0].className = current[0].className.replace(" active", "");
          this.className += " active";
          productArr=products[this.id]
          productsContainer.innerHTML=""
          putProducts()
        });
      }
  

}


  const putProducts = () => {
    swiper();

    productArr.forEach((product)=>{


        let htmlContent = `<div class="card">
                        <div class="cardImg"><img loading="lazy" src="${product.image}" alt="${product.productId}"></div>
                        <div class="cardTitle">${product.name}</div>
                        <div class="cardPrice">${product.priceText}</div>   
                        <div class="cardCargoText"><i class="fas fa-truck-moving" id="truck"></i><span>Ücretsiz Kargo</span></div>
                        <button id = button${product.productId} class="cardBtn">Sepete Ekle</button>
                        </div>`
        let productCard = document.createElement("div")
        productCard.classList.add("swiper-slide")
        productCard.innerHTML = htmlContent
        productCard.setAttribute("id", product.productId);    
        productsContainer.appendChild(productCard)
        document.getElementById(`button${product.productId}`).addEventListener("click",function(){
            
            let toastHTML = `  <div class="icon"><i class="fas fa-check-circle"></i></div>
            <div class="toastTextEl">
              <p class="toastTitle">Ürün Sepete Eklendi.</p>
              <p class="toastText">Sepete Git</p>
            </div>
            <div id="toastQuit${product.productId}" class="toastQuit">
              <i class="fas fa-times"></i>
            </div>`

            
            
            
            let toastEl = document.createElement("div")
            toastEl.classList.add("toast")
            toastEl.setAttribute("id", `toast${product.productId}`);    
            toastEl.innerHTML= toastHTML
            document.body.appendChild(toastEl)

            document.getElementById(`toastQuit${product.productId}`).addEventListener("click",function(){
                document.body.removeChild(toastEl)
            })

            setTimeout(()=>{
                document.body.removeChild(toastEl)
            },2000)
            
            
        },false)

    })
}  

getData()
