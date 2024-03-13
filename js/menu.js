import products from './products.json' assert { type: 'json' };

// Menu select
const selectBtns = Array.from(document.querySelectorAll('.js-select-btn'));

// Cards
const cardsWrappers = Array.from(document.querySelectorAll('.js-cards-wrapper'));
const coffeeCards = document.querySelector('.js-coffee-cards');
const teaCards = document.querySelector('.js-tea-cards');
const dessertCards = document.querySelector('.js-dessert-cards');

selectBtns[0].addEventListener('click', showCoffeeCards);
selectBtns[1].addEventListener('click', showTeaCards);
selectBtns[2].addEventListener('click', showDessertCards);

// Show Cards
function showCoffeeCards() {
  if (selectBtns[0].classList.contains('btn-active')) {
    return;
  }
  btnActive(selectBtns, selectBtns[0]);
  showCards(coffeeCards);
  initial();
  window.addEventListener('resize', resizeWindowRefresh);
}

function showTeaCards() {
  if (selectBtns[1].classList.contains('btn-active')) {
    return;
  }
  btnActive(selectBtns, selectBtns[1]);
  showCards(teaCards);
  refreshBtn.classList.add('none');
  window.removeEventListener('resize', resizeWindowRefresh);
}

function showDessertCards() {
  if (selectBtns[2].classList.contains('btn-active')) {
    return;
  }
  btnActive(selectBtns, selectBtns[2]);
  showCards(dessertCards);
  initial();
  window.addEventListener('resize', resizeWindowRefresh);
}

// function btnActive принимает набор радио кнопок и одну из них,
// которую нужно сделать активной
function btnActive(radioBtns, activeBtn) {
  radioBtns.forEach(elem => elem.classList.remove('btn-active'));
  activeBtn.classList.add('btn-active');
}


/*********************************
Создание карточек из products.json
*********************************/
let allCards = products.map(createCard);

function createCard(product, index) {
  const menuCard = document.createElement('div');
  menuCard.classList.add('menu-card');
  if ((index > 3) && (index < 8) || (index > 15) && (index < 20)) {
      menuCard.classList.add('menu-card-desktop');
  }
  const html = `
  <div class="box-img">
    <img src="./assets/images/${product.name.toLowerCase().replaceAll(' ', '-')}.jpg" alt="${product.name}" class="card-img">
  </div>

  <div class="card-info">
    <div>
      <div class="card-title">${product.name}</div>
      <div class="card-text">${product.description}</div>
    </div>
    <div class="card-price">$${product.price}</div>
  </div>
  `;
  menuCard.innerHTML = html;
  menuCard.addEventListener('click', doMenuCard)
  function doMenuCard() {
    clickCard(index);
  }
  return menuCard;
}
/*********************************
/ Создание карточек из products.json
*********************************/


/*********************************
Создание карточек coffee
*********************************/
const coffeeCards1 = allCards.slice(0, 8);
const coffeeCardsMenu = document.createElement('div');
coffeeCardsMenu.classList.add('menu-cards');
coffeeCards1.forEach(card => coffeeCardsMenu.appendChild(card));
coffeeCards.appendChild(coffeeCardsMenu);
/*********************************
/ Создание карточек coffee
*********************************/


/*********************************
Создание карточек tea
*********************************/
const teaCards1 = allCards.slice(8, 12);
const teaCardsMenu = document.createElement('div');
teaCardsMenu.classList.add('menu-cards');
teaCards1.forEach(card => teaCardsMenu.appendChild(card));
teaCards.appendChild(teaCardsMenu);
/*********************************
/ Создание карточек tea
*********************************/


/*********************************
Создание карточек dessert
*********************************/
const dessertCards1 = allCards.slice(12, 20);
const dessertCardsMenu = document.createElement('div');
dessertCardsMenu.classList.add('menu-cards');
dessertCards1.forEach(card => dessertCardsMenu.appendChild(card));
dessertCards.appendChild(dessertCardsMenu);
/*********************************
/ Создание карточек dessert
*********************************/


function showCards(currentCards) {
  cardsActive(currentCards);
}

function cardsActive(currentCards) {
  cardsWrappers.forEach(elem => elem.classList.add('none'));
  currentCards.classList.remove('none');
}


// Refresh
const refreshBtn = document.querySelector('.js-refresh');
const cards = document.querySelectorAll('.menu-card');

function resizeWindowRefresh() {
  if (window.innerWidth > 1110) {
    refreshBtn.classList.add('none');
    cards[4].classList.add('menu-card-desktop');
    cards[5].classList.add('menu-card-desktop');
    cards[6].classList.add('menu-card-desktop');
    cards[7].classList.add('menu-card-desktop');
    cards[16].classList.add('menu-card-desktop');
    cards[17].classList.add('menu-card-desktop');
    cards[18].classList.add('menu-card-desktop');
    cards[19].classList.add('menu-card-desktop');
  } else {
    refreshBtn.classList.remove('none');
  };
};

function showMoreCards() {
  if (selectBtns[0].classList.contains('btn-active')) {
    cards[4].classList.remove('menu-card-desktop');
    cards[5].classList.remove('menu-card-desktop');
    cards[6].classList.remove('menu-card-desktop');
    cards[7].classList.remove('menu-card-desktop');
    refreshBtn.classList.add('none');
    window.removeEventListener('resize', resizeWindowRefresh);
  } else if (selectBtns[2].classList.contains('btn-active')) {
    cards[16].classList.remove('menu-card-desktop');
    cards[17].classList.remove('menu-card-desktop');
    cards[18].classList.remove('menu-card-desktop');
    cards[19].classList.remove('menu-card-desktop');
    refreshBtn.classList.add('none');
    window.removeEventListener('resize', resizeWindowRefresh);
  }
}


// Initial
initial();

function initial() {
  if (window.innerWidth <= 1110) {
    refreshBtn.classList.remove('none');
    cards[4].classList.add('menu-card-desktop');
    cards[5].classList.add('menu-card-desktop');
    cards[6].classList.add('menu-card-desktop');
    cards[7].classList.add('menu-card-desktop');
    cards[16].classList.add('menu-card-desktop');
    cards[17].classList.add('menu-card-desktop');
    cards[18].classList.add('menu-card-desktop');
    cards[19].classList.add('menu-card-desktop');
  }
  refreshBtn.addEventListener('click', showMoreCards);
  window.addEventListener('resize', resizeWindowRefresh);
}

/*
Если есть полоса прокрутки, и она занимает какое-то место, то свойство clientWidth указывает ширину документа без неё
console.log(document.body.clientWidth);
console.log(document.documentElement.clientWidth);
*/

/*
Если есть полоса прокрутки, и она занимает какое-то место, то свойство innerWidth включает в себя полосу прокрутки.
console.log(window.innerWidth);
*/



/*********************************
Создание 20 модальных окон из products.json
*********************************/
let allDescrs = products.map(createDescription);

function createDescription(product) {
  const modalDescr = document.createElement('div');
  modalDescr.classList.add('modal__description');
  const html = `
  <h2 class="desktop-title">${product.name}</h2>
  <div class="desktop-text">${product.description}</div>

  <div class="desktop-size">Size</div>
  <div class="desktop-size-items">
    <div class="menu-btn js-size-btn btn-active">
      <div class="btn-icon">S</div>
      <div class="btn-text">${product.sizes.s.size}</div>
    </div>
    <div class="menu-btn js-size-btn">
      <div class="btn-icon">M</div>
      <div class="btn-text">${product.sizes.m.size}</div>
    </div>
    <div class="menu-btn js-size-btn">
      <div class="btn-icon">L</div>
      <div class="btn-text">${product.sizes.l.size}</div>
    </div>
  </div>

  <div class="desktop-additives">Additives</div>
  <div class="desktop-additives-items">
    <div class="menu-btn add-btn js-add-btn">
      <div class="btn-icon">1</div>
      <div class="btn-text">${product.additives[0].name}</div>
    </div>
    <div class="menu-btn add-btn js-add-btn">
      <div class="btn-icon">2</div>
      <div class="btn-text">${product.additives[1].name}</div>
    </div>
    <div class="menu-btn add-btn js-add-btn">
      <div class="btn-icon">3</div>
      <div class="btn-text">${product.additives[2].name}</div>
    </div>
  </div>

  <div class="desktop-total">
    <div class="total-total">Total</div>
    <div class="total-price js-total">$${product.price}</div>
  </div>

  <div class="desktop-info">
    <div class="info-icon"></div>
    <div class="info-text">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>
  </div>
  <div class="menu-btn menu-btn-close js-close-btn">
    <div class="btn-text">Close</div>
  </div>
  `;
  modalDescr.innerHTML = html;

  return modalDescr;
}

let allPreview = products.map(createPreview);

function createPreview(product, index) {
  const modalPreview = document.createElement('div');
  modalPreview.classList.add('modal__preview');
  modalPreview.classList.add('none');
  const html = `
  <img src="./assets/images/${product.name.toLowerCase().replaceAll(' ', '-')}.jpg" alt="${product.name}" class="modal__img">
  `;

  const div1 = document.createElement('div');
  div1.innerHTML = html;
  modalPreview.appendChild(div1);
  modalPreview.appendChild(allDescrs[index]);
  return modalPreview;
}

const modal = document.querySelector('.js-modal');
modal.append(...allPreview);
/*********************************
/ Создание 20 модальных окон из products.json
*********************************/


/*********************************
Показываем только одно модальное окно,
остальные 19 скрыты display:none;
*********************************/
const overlay = document.querySelector('.js-overlay');
overlay.addEventListener('click', overlayClick);
const cardData = {};
console.log('cardData', cardData);

// при клике на карточку, соответствующее модальное окно
// получает display:block;
function clickCard(index) {
  cardData.currentModal = allPreview[index];
  cardData.sizes = Array.from(cardData.currentModal.querySelectorAll('.js-size-btn'));
  cardData.additives = Array.from(cardData.currentModal.querySelectorAll('.js-add-btn'));
  cardData.total = cardData.currentModal.querySelector('.js-total');
  cardData.closeBtn = cardData.currentModal.querySelector('.js-close-btn');


  /*********************************
  Calculate Total Price
  *********************************/
  cardData.sizes[0].addEventListener('click', changePriceS);
  cardData.sizes[1].addEventListener('click', changePriceM);
  cardData.sizes[2].addEventListener('click', changePriceL);

  cardData.additives[0].addEventListener('click', changePrice1);
  cardData.additives[1].addEventListener('click', changePrice2);
  cardData.additives[2].addEventListener('click', changePrice3);

  cardData.price = +products[index].price;
  cardData.sizePrice = 0;
  cardData.addPrice = 0;
  cardData.totalPrice = cardData.price;
  console.log('cardData', cardData);
  cardData.total.innerText = `$${cardData.totalPrice.toFixed(2)}`;

  function changePriceS() {
    if (cardData.sizes[0].classList.contains('btn-active')) {
      return;
    }
    btnActive(cardData.sizes, cardData.sizes[0]);
    cardData.sizePrice = 0;
    changePrice();
  }

  function changePriceM() {
    if (cardData.sizes[1].classList.contains('btn-active')) {
      return;
    }
    btnActive(cardData.sizes, cardData.sizes[1]);
    cardData.sizePrice = 0.50;
    changePrice();
  }

  function changePriceL() {
    if (cardData.sizes[2].classList.contains('btn-active')) {
      return;
    }
    btnActive(cardData.sizes, cardData.sizes[2]);
    cardData.sizePrice = 1.00;
    changePrice();
  }

  function changePrice1() {
    cardData.additives[0].classList.toggle('btn-active');
    cardData.addPrice = cardData.additives[0].classList.contains('btn-active')
    ? cardData.addPrice + 0.50
    : cardData.addPrice - 0.50;
    changePrice();
  }

  function changePrice2() {
    cardData.additives[1].classList.toggle('btn-active');
    cardData.addPrice = cardData.additives[1].classList.contains('btn-active')
    ? cardData.addPrice + 0.50
    : cardData.addPrice - 0.50;
    changePrice();
  }

  function changePrice3() {
    cardData.additives[2].classList.toggle('btn-active');
    cardData.addPrice = cardData.additives[2].classList.contains('btn-active')
    ? cardData.addPrice + 0.50
    : cardData.addPrice - 0.50;
    changePrice();
  }

  function changePrice() {
    cardData.totalPrice = cardData.price + cardData.sizePrice + cardData.addPrice;
    cardData.total.innerText = `$${cardData.totalPrice.toFixed(2)}`;
  }

  cardData.currentModal.classList.remove('none');
  cardData.closeBtn.addEventListener('click', closeBtnClick);

  function closeBtnClick() {
    cardData.sizes[0].classList.add('btn-active');
    cardData.sizes[1].classList.remove('btn-active');
    cardData.sizes[2].classList.remove('btn-active');

    cardData.sizes[0].removeEventListener('click', changePriceS);
    cardData.sizes[1].removeEventListener('click', changePriceM);
    cardData.sizes[2].removeEventListener('click', changePriceL);

    cardData.additives[0].classList.remove('btn-active');
    cardData.additives[1].classList.remove('btn-active');
    cardData.additives[2].classList.remove('btn-active');

    cardData.additives[0].removeEventListener('click', changePrice1);
    cardData.additives[1].removeEventListener('click', changePrice2);
    cardData.additives[2].removeEventListener('click', changePrice3);
    cardData.closeBtn.removeEventListener('click', closeBtnClick);
    overlayClick();
  }
  showModal();
}

// показываем модальное окно
function showModal() {
  overlay.classList.remove('none');
  modal.classList.remove('none');
  document.body.style.overflow = 'hidden';
}

function overlayClick() {
  overlay.classList.add('none');
  modal.classList.add('none');
  allPreview.forEach(cardPreview => cardPreview.classList.add('none'));
  document.body.style.overflow = 'visible';
}


/**************************
Total Price
**************************/


