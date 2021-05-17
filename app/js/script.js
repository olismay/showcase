const searchInput = document.querySelector('#search-input');
const itemsList = document.querySelector('#items-list');
let itemsCards = [];
let itemsValues = {};
let priceValues = {};
let price = [];

let selectItem = document.querySelectorAll('#select-item');
let selectHeader = document.querySelectorAll('#select-header');
let selectCurrencyRubles = document.querySelector('#item-currency-rubles');
let selectCurrencyBonus = document.querySelector('#item-currency-bonus');

 

selectItem.forEach( item => {
  item.addEventListener('click', selectChoose);
});

selectHeader.forEach( item => {
  item.addEventListener('click', selectAll);
});

selectCurrencyRubles.addEventListener('click', selectAll);

selectCurrencyBonus.addEventListener('click', showItemsWithPriceBonus);

function selectChoose() {
  let text = this.innerHTML;
  console.log(text);
  
  let filteredCardsBySubject = itemsCards.filter( (item) => {   
    if(item.subject.toString().includes(text) || item.genre.toString().includes(text) || item.grade.toString().includes(text)) {
       return item;
    }
    
  });  

  showItems(filteredCardsBySubject);  
}

function selectAll() {
  showItems(itemsCards);
}

function showItemsWithPriceBonus(items) {
  showItemsPriceBonus(itemsCards);
}


const getItemsPrice = async () => {

  try { 
    const response = await fetch('https://krapipl.imumk.ru:8443/api/mobilev1/update', {
                        method: 'post',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }})                     
    priceValues = await response.json();   
    price = priceValues.items.price;
    showItems(itemsCards);
    console.log(itemsCards);    

  } catch (err) {
    console.error(err);
  }

}

searchInput.addEventListener('keyup', (e) => {
    const searchStr = e.target.value.toLowerCase();
    const filteredItems = itemsCards.filter( (item) => {
      return item.title.toLowerCase().includes(searchStr);
    })
    showItems(filteredItems);
})


const getItems = async () => {
  try {     
    const response = await fetch('https://krapipl.imumk.ru:8443/api/mobilev1/update', {
                        method: 'post',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      }})                     
    itemsValues = await response.json();   
    itemsCards = itemsValues.items;
    showItems(itemsCards);
    console.log(itemsCards);    
}  catch (err) {
    console.error(err);
}  
}

function showItems(items) {
    const str = items 
    .map((item) => { 
        return `<li class='items__card'>   
                 <div class='items__wrapper'>  
                  <div class='items__wrap'>  
                   <div class='items__content'>           
                      <p class='items__subject'>${item.subject}</p>
                      <span class='items__grade'>${item.grade.replace(/;/gi, ' ')} класс</span>
                    </div>
                    <div class='items__genre'>${item.genre}</div>
                    <a href='#' class='items__link'>Подробнее</a>
                  </div>   
                    <button id='button' type='button' class='items__button'>${item.price}</button>                   
                 </div> 
                </li>`
    })     
    .join('');
    itemsList.innerHTML = str;
}

function showItemsPriceBonus(items) {
  const str = items 
  .map((item) => { 
      return `<li class='items__card'>  
               <div class='items__wrapper'> 
                <div class='items__wrap'>       
                 <div class='items__content'>       
                    <p class='items__subject'>${item.subject}</p>
                    <span class='items__grade'>${item.grade.replace(/;/gi, '- ')} класс</span>
                  </div>
                  <div class='items__genre'>${item.genre}</div>
                  <a href='#'class='items__link'>Подробнее</a>
                </div>  
                  <button id='button' type='button' class='items__button'>${item.priceBonus}</button>                
               </div> 
              </li>`
  })     
  .join('');
  itemsList.innerHTML = str;
}

getItems();