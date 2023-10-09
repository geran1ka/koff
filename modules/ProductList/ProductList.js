import { addContainer } from "../addContainer";

export class ProductList {
  static instance = null

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this
      this.element = document.createElement('section');
      this.element.classList.add('goods')
      this.containerElement = addContainer(this.element, 'goods__container')
      this.isMounted = false;

      this.addEvents();
    };


    return ProductList.instance
  }

  mount(parent, data, title) {
    this.containerElement.textContent = '';
    
    const titleElem = document.createElement('h2');
    titleElem.textContent = title ? title : 'Список товаров';

    titleElem.className = title ? 'goods__title' : 'goods__title visually-hidden';
    this.containerElement.append(titleElem);
    this.updateListElem(data);

    parent.append(this.element);

    if (this.isMounted) {
      return;
    }

    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  addEvents() {

  }

  updateListElem(data = []) {
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    const listItems = data.map(item => {
      const listItemElement = document.createElement('li');
      listItemElement.innerHTML = this.getHTMLTemplateListItem(item);

      return listItemElement;
    })

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  getHTMLTemplateListItem({id, images: [image], name: title, price}) {
    return `
      <article class="goods__card card">
        <a href="/product/123" class="card__link card__link_img">
          <img src="${API_URL}${image}" alt="${title}" class="card__img">
        </a>

        <div class="card__info">
          <h3 class="card__title">
            <a href="/product/${id}" class="card__link">
              ${title}
            </a>
          </h3>

          <p class="card__price">${price.toLocalString()}nbsp;₽</p>
        </div>

          <button class="card__btn" data-id="${id}">В корзину</button>

          <button class="card__favorite" data-id="${id}">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" fill="white" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
              
          </button>


      </article>
    `
  }
}