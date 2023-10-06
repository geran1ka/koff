import { addContainer } from "../addContainer";
import { createTableRow } from "../createTableRow";

export class Order {
  static instance = null

  constructor() {
    if (!Order.instance) {
      Order.instance = this
      this.element = document.createElement('section');
      this.element.classList.add('order');
      this.containerElement = addContainer(this.element, 'order__container');
      this.isMounted = false;
    };


    return Order.instance
  }

  mount(elem) {
    if (this.isMounted) {
      return;
    }

    const info = this.orderInfo();
    const top = this.orderTop();
    const haracteristics = this.orderCharacteristics();
    const title = this.characteristicsTitle();
    const wrapper = this.haracteristicsWrapper();
    const table = this.table();
    const btn = this.button();

    wrapper.append(table, btn);
    haracteristics.append(title, wrapper);
    info.append(top, haracteristics);

    this.containerElement.append(info);
    elem.append(this.element)
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }
  orderInfo() {
    const info = document.createElement('div');
    info.classList.add('order__info');

    return info;
  }

  orderTop() {
    const top = document.createElement('div');
    top.classList.add('order__top');

    const orderTitle = document.createElement('p');
    orderTitle.classList.add('order__title');
    orderTitle.textContent = 'Заказ успешно размещен';

    const orderPrice = document.createElement('p');
    orderPrice.classList.add('order__price');
    orderPrice.innerHTML = `
      <span>20&nbsp;000</span>&nbsp; ₽
    `;

    const orderNumber = document.createElement('p');
    orderNumber.classList.add('order__number');
    orderNumber.textContent = '№43435';

    top.append(orderTitle, orderPrice, orderNumber);

    return top;
  }

  orderCharacteristics() {
    const characteristics = document.createElement('div');
    characteristics.classList.add('order__characteristics');

    return characteristics;
  }

  characteristicsTitle() {
    const title = document.createElement('h3');
    title.classList.add('order__characteristics-title');
    title.textContent = 'Данные доставки';

    return title;
  }

  haracteristicsWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('order__characteristics-wrapper');

    return wrapper;
  }

  table() {
    const table = document.createElement('table');
    table.classList.add('order__characteristics-table', 'table');

    const array = [
      {
        valueTdOne: 'Получатель', 
        valueTdTwo: 'Иванов Петр Александрович',
      },
      {
        valueTdOne: 'Телефон', 
        valueTdTwo: '+7 (737) 346 23 00',
      },
      {
        valueTdOne: 'E-mail', 
        valueTdTwo: 'Ivanov84@gmail.com',
      },
      {
        valueTdOne: 'Адрес доставки', 
        valueTdTwo: 'Москва, ул. Ленина, 21, кв. 33',
      },
      {
        valueTdOne: 'Способ оплаты', 
        valueTdTwo: 'Картой при получении',
      },
      {
        valueTdOne: 'Способ получения', 
        valueTdTwo: 'Доставка',
      },
    ]
    const list = createTableRow(array);
    table.append(...list);

    return table;
  };

  button() {
    const btn = document.createElement('button');
    btn.classList.add('product__btn');
    btn.type = 'button';
    btn.textContent = 'На главную';

    return btn;
  }
}