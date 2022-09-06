'use strict';

const $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document);

//menu header (fix)
$('.menu__btn').addEventListener('click', (e)=> {
    $('.menu__btn').classList.toggle('menu__btn--active');
    $('.mobile-menu').classList.toggle('mobile-menu--active');

    if (!$('body').getAttribute('style')) { body.style.overflow = 'hidden'; }
    else { $('body').removeAttribute('style') }
});


//Slider Hotel-Number
const slideData = {
    prevBtn: $('.prev-btn'),
    nextBtn: $('.next-btn'),

    dotsContainer: $('.dots'),
    slideContainer: $$('.slider-container__wrap'),

    dotsActive: 'dots__btn--active',
    slideActive: 'slider-container__wrap--active',

    dotsItem: '<button class="btn dots__btn"></button>',
    dotsItemClass: '.dots__btn',

    countSlide: '0'
};

const reviewsData = {
    prevBtn: $('.reviews-btn .prev-btn'),
    nextBtn: $('.reviews-btn .next-btn'),

    sliderContainer: $('.feedback-container'),

    dotsContainer: $('.dots-reviews'),
    slideContainer: $$('.feedback'),

    slideClass: '.feedback',

    dotsActive: 'dots-reviews__btn--active',
    slideActive: 'feedback--active',

    dotsItem: '<button class="btn dots-reviews__btn"></button>',
    dotsItemClass: '.dots-reviews__btn',

    countSlide: '0'
};

//dataObj - объект с данными слайда
const createDots = (dataObj, dotsContainer, slideContainer) => {
    for (let i = 1; i <= slideContainer.length; i++) {
        dotsContainer.insertAdjacentHTML('beforeend', `${dataObj.dotsItem}`);
    }

    const dotsBtn = $$(dataObj.dotsItemClass);

    slideContainer.forEach((slide, i) => {
        if (slide.classList.contains(dataObj.slideActive)) {
            dotsBtn[i].classList.add(dataObj.dotsActive);
        }
    });
};
createDots( slideData, $('.dots'), $$('.slider-container__wrap') );
createDots( reviewsData, reviewsData.dotsContainer, reviewsData.slideContainer );


const removeActiveSlide = (dataObj, slideContainer, dotsBtn) => {
    slideContainer.forEach((slide) => {
        if (slide.classList.contains(dataObj.slideActive)) {
            slide.classList.remove(dataObj.slideActive);
        }
    });

    dotsBtn.forEach((dots) => {
        if (dots.classList.contains(dataObj.dotsActive)) {
            dots.classList.remove(dataObj.dotsActive);
        }
    });
};


const nextSlide = (dataObj, slideContainer, dotsBtn) => {
    if (dataObj.countSlide >= slideContainer.length-1) { dataObj.countSlide = 0;}
    else { dataObj.countSlide++; }

    removeActiveSlide( dataObj, dataObj.slideContainer, $$(dataObj.dotsItemClass) );

    slideContainer[dataObj.countSlide].classList.add(dataObj.slideActive);
    dotsBtn[dataObj.countSlide].classList.add(dataObj.dotsActive);
};
if (slideData.nextBtn) {
    slideData.nextBtn.addEventListener('click', ()=> {
        nextSlide( slideData, slideData.slideContainer, $$(slideData.dotsItemClass) );
    });
}


const prevSlide = (dataObj, slideContainer, dotsBtn) => {
    if (dataObj.countSlide <= 0) { dataObj.countSlide = slideContainer.length-1; }
    else { dataObj.countSlide--; }

    removeActiveSlide( dataObj, dataObj.slideContainer, $$(dataObj.dotsItemClass) );

    slideContainer[dataObj.countSlide].classList.add(dataObj.slideActive);
    dotsBtn[dataObj.countSlide].classList.add(dataObj.dotsActive);
};
if (slideData.prevBtn) {
    slideData.prevBtn.addEventListener('click', ()=> {
        prevSlide( slideData, slideData.slideContainer, $$(slideData.dotsItemClass) );
    });
}


const selectSlideDots = (dataObj, slideContainer, dotsBtn) => {
    dotsBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            removeActiveSlide( dataObj, dataObj.slideContainer, $$(dataObj.dotsItemClass) );

            dotsBtn[i].classList.add(dataObj.dotsActive);
            slideContainer[i].classList.add(dataObj.slideActive);

            dataObj.countSlide = i;
        });
    });
};
selectSlideDots( slideData, slideData.slideContainer, $$(slideData.dotsItemClass) );


//Slider "Отзывы"
const nextSlideReviews = (dataObj, container, slidesContainer, slideClass, slideActiveClass) => {
    container.insertBefore(slidesContainer[0], null);

    $$(slideClass).forEach((slide) => {
        if (slide.classList.contains(slideActiveClass)) { slide.classList.remove(slideActiveClass); }
    });

    $$(slideClass)[0].classList.add(slideActiveClass);

    let lastDotBtnActive;
    $$('.dots-reviews__btn').forEach((dotsBtn, i) => {
        if (dotsBtn.classList.contains('dots-reviews__btn--active')) {
            dotsBtn.classList.remove('dots-reviews__btn--active');
            lastDotBtnActive = i;
        }
    });

    if ((lastDotBtnActive + 1) >= $$('.feedback').length) {
        lastDotBtnActive = -1;
    }

    $$('.dots-reviews__btn')[lastDotBtnActive + 1].classList.add('dots-reviews__btn--active');
};
if (reviewsData.nextBtn) {
    reviewsData.nextBtn.addEventListener('click', ()=> {
        nextSlideReviews(reviewsData, reviewsData.sliderContainer, $$(reviewsData.slideClass), reviewsData.slideClass, reviewsData.slideActive)
    });
}


const prevSlideReviews = (dataObj, container, slidesContainer, slideClass, slideActiveClass) => {
    container.insertAdjacentElement('afterbegin', slidesContainer[slidesContainer.length - 1]);

    $$(slideClass).forEach((slide) => {
        if (slide.classList.contains(slideActiveClass)) { slide.classList.remove(slideActiveClass); }
    });

    $$(slideClass)[0].classList.add(slideActiveClass);

    let lastDotBtnActive;
    $$('.dots-reviews__btn').forEach((dotsBtn, i) => {
        if (dotsBtn.classList.contains('dots-reviews__btn--active')) {
            dotsBtn.classList.remove('dots-reviews__btn--active');
            lastDotBtnActive = i;
        }
    });

    if ((lastDotBtnActive - 1) < 0) {
        lastDotBtnActive = $$('.feedback').length;
    }

    $$('.dots-reviews__btn')[lastDotBtnActive - 1].classList.add('dots-reviews__btn--active');
};
if (reviewsData.prevBtn) {
    reviewsData.prevBtn.addEventListener('click', ()=> {
        prevSlideReviews(reviewsData, reviewsData.sliderContainer, $$(reviewsData.slideClass), reviewsData.slideClass, reviewsData.slideActive)
    });
}


$$('.dots-reviews__btn').forEach((dotsBtn, i) => {
   dotsBtn.addEventListener('click', ()=> {
       $$('.dots-reviews__btn').forEach((dotsBtn) => { dotsBtn.classList.remove('dots-reviews__btn--active'); });

      dotsBtn.classList.add('dots-reviews__btn--active');

      $$('.feedback').forEach((slide) => {
          if (slide.classList.contains('feedback--active')) {
              slide.classList.remove('feedback--active')
          }

          if ( (i+1) === +slide.getAttribute('data-slidenum')) {
              $('.feedback-container').insertAdjacentElement('afterbegin', slide);
              slide.classList.add('feedback--active');
          }
      });
   });
});


//CATALOG
// $('.sort-cards__btn').addEventListener('click', ()=> {
//     $('.modal-sort').classList.add('modal-sort--active');
// })
//
// const allSortItem = $$('.modal-sort__list .list__item');
// allSortItem.forEach((elem) => {
//    elem.addEventListener('click', ()=> {
//        $('.sort-cards__text').innerHTML = elem.children[0].children[1].innerHTML;
//
//        // console.log(elem.children[0].children[1].innerHTML);
//        // console.dir(elem);
//
//        $('.modal-sort').classList.remove('modal-sort--active');
//    })
// })


//CATALOG: Боковой фильтр
const modalFilter = $('.modal-filter'),
      modalReserve = $('.modal-reserve'),
      modalStatus = $('.modal-status'),
      filter = $('.main__filter'),

      headerBtn = $('.header-bottom__btn'),
      cardSpecificationsBtns = $$('.card-specifications__btn'),
      filterBtn = $('.filter-search__btn'),
      cardRoomBtns = $$('.card-room__btn'),
      stockBtn = $('.stock__btn'),
      sliderContentBtn = $('.slider-content__btn'),

      modalBtnClose = $('.modal-content__btn-close'),
      statusContentBtnClose = $('.status-content__btn-close'),
      statusContentBtn = $('.status-content__btn'),
      filterBtnClose = $('.filter__btn-close'),

      body = $('body'),
      paddingScroll = window.innerWidth - body.offsetWidth;

const activeModalArr = [headerBtn, filterBtn, stockBtn, sliderContentBtn],
    closeModalArr = [modalReserve, modalBtnClose, modalFilter, filterBtnClose, modalStatus, statusContentBtnClose, statusContentBtn];

if (cardSpecificationsBtns) { cardSpecificationsBtns.forEach((btn) => { activeModalArr.push(btn); }); }
if (cardRoomBtns) { cardRoomBtns.forEach((btn) => { activeModalArr.push(btn); }); }


//Open and Close modal
const modalActive = (elem, elemBody, elemScroll) => {
    if (window.screen.width > 1024) { body.style.paddingRight = `${paddingScroll}px`; }
    body.style.overflow = 'hidden';

    elem.classList.add('modal-active');
    if (elemBody) { elemBody.classList.add('modal-active'); }
    if (elemScroll) { elemScroll.style.overflowY = 'scroll'; }

    // if (window.screen.width > 1024) {
    //     $('.btn-up').style.right = `${parseInt(rightStyleBtnUp) + paddingScroll}px`; //Положение .btn-up после открытия окна
    // }
};

const modalClose = (elem, elemBody, elemScroll) => {
    body.removeAttribute('style');

    elem.classList.remove('modal-active');
    if (elemBody) { elemBody.classList.remove('modal-active'); }
    if (elemScroll) { elemScroll.removeAttribute('style'); }

    // if (window.screen.width > 1024) {
    //     $('.btn-up').style.right = `${parseInt(rightStyleBtnUp)}px`; //Положение .btn-up после закрытия окна
    // }
};


activeModalArr.forEach((item) => {
    if (item) {
        item.addEventListener('click', (e)=> {
            const target = e.target;

            if (filterBtn && filterBtn.contains(target)) {
                modalActive(modalFilter, null, modalFilter);

                if (window.screenX <= 992) { modalFilter.insertAdjacentElement('afterbegin', filter); }
                filter.classList.add('content-active');
                modalFilter.classList.add('filter-active');
                modalFilter.classList.remove('modal-active');
            }
            else if (headerBtn && headerBtn.contains(target)) {
                modalActive(modalReserve, null, modalReserve);
            }
            else if (stockBtn && stockBtn.contains(target)) {
                modalActive(modalReserve, null, modalReserve);
            }
            else if (sliderContentBtn && sliderContentBtn.contains(target)) {
                modalActive(modalReserve, null, modalReserve);
            }

            cardSpecificationsBtns.forEach((btn) => {
                if (btn && btn.contains(target)) { modalActive(modalReserve, null, modalReserve); }
            });

            cardRoomBtns.forEach((btn) => {
                if (btn && btn.contains(target)) { modalActive(modalReserve, null, modalReserve); }
            });

        });
    }
});

closeModalArr.forEach((item) => {
    if (item) {
        item.addEventListener('click', (e)=> {
            const target = e.target;

            if (target.matches('.modal-filter') || target.matches('.filter__btn-close')) {
                modalClose(modalFilter, null, modalFilter);
                filter.classList.remove('content-active');
                modalFilter.classList.remove('filter-active');
            }
            else if (target.matches('.modal-reserve') || modalBtnClose.contains(target)) {
                modalClose(modalReserve, null, modalReserve);
            }
            else if (target.matches('.modal-status') || statusContentBtnClose.contains(target) || statusContentBtn.contains(target)) {
                modalClose(modalStatus, null, modalStatus);
            }
        })
    }
});



//HOTEL-ROOM: слайдер №1
const allSlideHotelRoom = $$('.left-part__wrap-img'),
      basicSlideImg = $('.right-part__img');

allSlideHotelRoom.forEach((slide) => {
   slide.addEventListener('click', (e)=> {
       const slideImg = slide.children[0].getAttribute('src');

       basicSlideImg.setAttribute('src', slideImg);
   })
});



//HOTEL-CATALOG: фильтры
const currentFilterBtn = $('.current-filter'),
      currentFilterBtnName = $('.current-filter__text'),

      allFilterContainer = $('.all-filter'),
      allFilter = $$('.all-filter__value'),

      arrowTypeSort = $('.current-filter__btn-img--leftSize');

if (currentFilterBtn) {
    currentFilterBtn.addEventListener('click', (e)=> {
        currentFilterBtn.classList.toggle('current-filter--active');
        allFilterContainer.classList.toggle('all-filter--active');
    });
}


allFilter.forEach((elem, i) => {
    allFilter[0].style.display = 'none';

    elem.addEventListener('click', ()=> {
        const typeSort = elem.dataset.sort.split(' ')[0];
        if (typeSort === 'Down') { arrowTypeSort.style.transform = 'rotate(180deg)'; }
        else { arrowTypeSort.removeAttribute('style'); }

        currentFilterBtnName.innerHTML = elem.children[1].innerHTML;

        allFilter.forEach((elem) => { elem.removeAttribute('style'); });
        elem.style.display = 'none';

        if (getComputedStyle(elem).marginBottom === '0px') { allFilter[i-1].style.marginBottom = 0; }

        allFilterContainer.classList.remove('all-filter--active');
        currentFilterBtn.classList.remove('current-filter--active');
    });
});


//HOTEL-CATALOG: Поле цены (от и до) мини-валидация
const regNumPrice = /[^0-9]/g;

let inputsPrice;
if ($('.input-price')) {
   inputsPrice = Array.prototype.slice.call( $('.input-price').children );
}

const checkValidInputPrice = (inputPrice) => {
    let val = inputPrice.value;
    inputPrice.value = val.replace(regNumPrice, '');

    if (val.length > 4) { inputPrice.value = val.replace(val[val.length-1], ''); }
};

const validInputPrice = () => {
    inputsPrice.forEach((inputPrice) => {
        inputPrice.addEventListener('input', ()=> { checkValidInputPrice(inputPrice); });
    });
};

if (inputsPrice) { validInputPrice(); }



//HOTEL-CATALOG: сортировка по checkbox
const btnApply = $('.filter__btn-apply'),
      btnReset = $('.filter__btn-reset'),
      allCardRoom = $$('.card-room');

let minPrice = document.querySelector('.input-price__min-price'),
    maxPrice = document.querySelector('.input-price__max-price'),
    filterArea = [],
    filterEquipment = [];

const checkFilterPrice = () => {
    let minPriceVal = document.querySelector('.input-price__min-price').value,
        maxPriceVal = document.querySelector('.input-price__max-price').value;

    if (minPriceVal === '') { minPriceVal = 100;}
    if (maxPriceVal === '') { maxPriceVal = 600;}

    allCardRoom.forEach((card) => {
        const currentPriceCard = card.dataset.price;

        if ((currentPriceCard < +minPriceVal) || (currentPriceCard > +maxPriceVal)) { card.style.display = 'none'; }
    });
};

const checkFilterArea = () => {
    const allCheckBoxSortArea = $$('.room-area__label');

    allCheckBoxSortArea.forEach((item) => {
        const activeCheckBox = item.parentNode.querySelector("input[type='checkbox']").checked;

        if (activeCheckBox) { filterArea.push(item.dataset.areaRoom); }
    });

    allCardRoom.forEach((card) => {
        const areaRoom = card.dataset.areaRoom;

        if(filterArea.indexOf(areaRoom) === -1) { card.style.display = 'none'; }
    });
};

const checkFilterEquipment = () => {
    const allCheckBoxRoomEquipment = $$('.room-equipment__label');

    allCheckBoxRoomEquipment.forEach((item) => {
        const activeCheckBox = item.parentNode.querySelector("input[type='checkbox']").checked;

        if (activeCheckBox) { filterEquipment.push(item.dataset.roomEquipment); }
    });

    allCardRoom.forEach((card) => {
        const roomEquipment = card.dataset.roomEquipment.split(',');

        filterEquipment.forEach((item) => {
            if (roomEquipment.indexOf(item) === -1) { card.style.display = 'none'; }
        });
    });
};


if (btnApply) {
    btnApply.addEventListener('click', ()=>{
        filterArea = [];
        filterEquipment = [];
        allCardRoom.forEach((card) => { card.removeAttribute('style'); });

        checkFilterPrice();
        checkFilterArea();
        checkFilterEquipment();

        setMarginCard();
    });
}

if (btnReset) {
    btnReset.addEventListener('click', ()=> {
        minPrice.value = '';
        maxPrice.value = '';

        const allCheckBoxArea = $$('.room-area__check');
        allCheckBoxArea.forEach((checkbox) => { checkbox.checked = false; });

        const allCheckBoxEquipment = $$('.room-equipment__furniture');
        allCheckBoxEquipment.forEach((checkbox) => { checkbox.checked = false; });

        allCardRoom.forEach((card) => { card.removeAttribute('style'); });
        setMarginCard();
    });
}



//HOTEL-CATALOG: отступы карточек
const setMarginCard = () => {
    const container = document.querySelector('.main-content'),
          cards = document.querySelectorAll('.card-room'),
          widthContainer = container.offsetWidth,
          arrActiveCards = [];

    cards.forEach((card) => {
        card.classList.remove('main-content__card-room--mr');

        if (getComputedStyle(card).display !== 'none') { arrActiveCards.push(card); }
    });

    if (arrActiveCards.length !== 0) {
        let widthCard = arrActiveCards[0].offsetWidth;
        const quantityCardRow = widthContainer / widthCard;

        arrActiveCards.forEach((card, i) => {
            if ((i+1) % parseInt(quantityCardRow) === 0) { card.classList.add('main-content__card-room--mr'); }
        });
    }
};

if (allCardRoom.length !== 0) { setMarginCard(); }



//HOTEL-CATALOG: сортировка
const allSortFilter = $$('.all-filter__value');
allSortFilter.forEach((item) => {
    item.addEventListener('click', () => {
        if ((item.dataset.sort === 'Down Price') || item.dataset.sort === 'Up Price') {
            sortFilter(item.dataset.sort.split(' ')[0], 'price');
        } else if ((item.dataset.sort === 'Down Area') || item.dataset.sort === 'Up Area') {
            sortFilter(item.dataset.sort.split(' ')[0], 'areaRoom');
        }
    });
})

const sortFilter = (typeSort, dataSearch) => {
    const cardContainer = $('.main-content');

    for (let i = 0; i < cardContainer.children.length; i++) {
        for (let j = i; j < cardContainer.children.length; j++) {
            if (typeSort === 'Up') {
                if (+cardContainer.children[i].dataset[`${dataSearch}`] > +cardContainer.children[j].dataset[`${dataSearch}`]) {
                    const replacedElem = cardContainer.replaceChild(cardContainer.children[j], cardContainer.children[i]);
                    cardContainer.children[i].insertAdjacentElement('afterend', replacedElem);
                }
            } else if (typeSort === 'Down') {
                if (+cardContainer.children[i].dataset[`${dataSearch}`] < +cardContainer.children[j].dataset[`${dataSearch}`]) {
                    const replacedElem = cardContainer.replaceChild(cardContainer.children[j], cardContainer.children[i]);
                    cardContainer.children[i].insertAdjacentElement('afterend', replacedElem);
                }
            }

            setMarginCard();
        }
    }
};



//Валидация
const validInputs = {
    name: false,
    nameCat: false,
    phone: false,
    email: false,
    withDate: false,
    beforeDate: false
};

const inputsName = $$('input[name="name"]'),
      inputsNameCat = $$('input[name="nameCat"]'),
      inputsPhone = $$('input[name="phone"]'),
      inputsEmail = $$('input[name="email"]'),
      inputsWithDate = $$('input[name="withDate"]'),
      inputsBeforeDate = $$('input[name="beforeDate"]');

const regStr = /[^А-Яа-яЁё\s]/g,
    regNum = /[^0-9\+]/g,
    regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

const minLength = 2,
    maxLength = 30;

const errMsg = {
    emptyField: 'Пустое поле!',
    invalidInput: 'Неверный ввод!',
    minLength: `Минимальное количество символов: ${minLength}`,
    maxLength: `Максимальное количество символов: ${maxLength}`
};

const createNewElem = (parent, elem, className, text) => {
    const newElem = document.createElement(elem);
    newElem.classList.add(className);
    newElem.innerHTML = text;
    parent.insertAdjacentElement('beforeend', newElem);
};

const errMsgInputAdd = (elem, errMsg) => {
    elem.classList.add('invalid');

    const elemError = elem.parentNode.querySelector('.error');
    if (!(elemError)) {
        createNewElem(elem.closest('.input-wrap'), 'p', 'error', errMsg);
    }
};

const errMsgInputRemove = (elem) => {
    elem.classList.remove('invalid');

    const elemError = elem.parentNode.querySelector('.error');
    if (elemError) { elemError.remove(); }
};


const checkValidInputName = (inputName) => {
    if (inputName.value !== '') { errMsgInputRemove(inputName); }

    if (inputName.value.trim().length < minLength) {
        errMsgInputAdd(inputName, errMsg.minLength);
        validInputs.name = false;
    }
    else if (inputName.value.trim().length > maxLength) {
        errMsgInputAdd(inputName, errMsg.maxLength);
        validInputs.name = false;
    } else {
        errMsgInputRemove(inputName);
        validInputs.name = true;
    }

    let val = inputName.value;
    inputName.value = val.replace(regStr, '');
};

const validInputName = () => {
    inputsName.forEach((inputName) => {
        inputName.addEventListener('input', ()=> { checkValidInputName(inputName); });
    });

    inputsNameCat.forEach((inputName) => {
        inputName.addEventListener('input', ()=> { checkValidInputName(inputName); });
    });
};
validInputName();


const checkValidInputEmail = (inputEmail) => {
    if (inputEmail.value !== '') { errMsgInputRemove(inputEmail); }

    if (!regEmail.test(inputEmail.value)) {
        errMsgInputAdd(inputEmail, errMsg.invalidInput);
        validInputs.email = false;

    } else {
        errMsgInputRemove(inputEmail);
        validInputs.email = true;
    }
};

const validInputEmail = ()=> {
    inputsEmail.forEach((inputEmail) => {
        inputEmail.addEventListener('input', ()=> { checkValidInputEmail(inputEmail); });
    });
};
validInputEmail();


const validInputPhone = ()=> {
    inputsPhone.forEach((inputPhone) => {
        inputPhone.addEventListener('input', ()=> {
            if (inputPhone.value !== '') { errMsgInputRemove(inputPhone); }
        });
    });
};
// validInputPhone();



const checkValidInputWithDate = (inputWithDate) => {
    if (inputWithDate === '') { validInputs.withDate = false; }
    else { validInputs.withDate = true; }
};

const validInputWithData = () => {
    inputsWithDate.forEach((inputWithDate) => {
        inputWithDate.addEventListener('input', ()=> { checkValidInputWithDate(inputWithDate); });
    });
};
validInputWithData();


const checkValidInputBeforeDate = (inputBeforeDate) => {
    if (inputBeforeDate === '') { validInputs.beforeDate = false; }
    else { validInputs.beforeDate = true; }
};

const validInputBeforeDate = () => {
    inputsBeforeDate.forEach((inputBeforeDate) => {
        inputBeforeDate.addEventListener('input', ()=> { checkValidInputBeforeDate(inputBeforeDate); });
    });
};
validInputBeforeDate();



//Отправка данных
const postData = (formBody, form) => {
    fetch('../animal-hotel/template/mail.php', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formBody)
    })
        .then((response) => {
            if (response.status !== 200) { throw new Error('Status network not 200'); }

            modalClose(modalReserve, null, modalReserve);
            modalActive(modalStatus, null, modalStatus);
            form.reset();

            for (let item in validInputs) { validInputs[item] = false; }

            $('.form__btn').disabled = false;

            return response.text();
        }).then((text) => {
    })
        .catch((error) => { console.log(error); });
};



const forms = $$('form');

const checkFormInput = (input) => {
    const inputName = input.getAttribute('name');

    if (input.value === '') {
        validInputs[inputName] = false;
        errMsgInputAdd(input, errMsg.emptyField);
    } else { validInputs[inputName] = true; }

    if (inputName === 'name') {
        checkValidInputName(input);
    } else if (inputName === 'nameCat') {
        checkValidInputName(input);
    } else if (inputName === 'phone' && input.value !== '') {
        errMsgInputRemove(input);
    } else if (inputName === 'email') {
        checkValidInputEmail(input);
    } else if (inputName === 'withDate' && input.value !== '') {
        errMsgInputRemove(input);
    } else if (inputName === 'beforeDate' && input.value !== '') {
        errMsgInputRemove(input);
    }
};

const checkForm = () => {
    forms.forEach((form) => {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const inputsForm = $$(`.${form.classList[1]} input`);
            inputsForm.forEach((input) => { checkFormInput(input); });

            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => { body[key] = val; });

            if (validInputs.name && validInputs.nameCat && validInputs.email && validInputs.phone && validInputs.withDate && validInputs.beforeDate) {
                postData(body, form);
                $('.form__btn').disabled = true;
            }
        })
    });
};
checkForm();
