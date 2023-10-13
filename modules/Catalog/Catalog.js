import { ApiService } from "../../services/ApiService";
import { addContainer } from "../addContainer";

export class Catalog {
  static instance = null

  constructor() {
    if (!Catalog.instance) {
      Catalog.instance = this
      this.element = document.createElement('nav');
      this.element.classList.add('catalog');
      this.containerElement = addContainer(this.element, 'catalog__container');
      this.isMounted = false;
    };


    return Catalog.instance
  }

  async getData() {
    this.catalogData = await new ApiService().getProductCategories();
  }

  async mount(parent) {
    if (this.isMounted) {
      return;
    }

    if (!this.catalogData) {
      await this.getData();
      this.renderListElem(this.catalogData);
    }

    parent.prepend(this.element);
    this.isMounted = true;
  }

  unmount() {
    this.element.remove();
    this.isMounted = false;
  }

  renderListElem(data) {
    const listElem = document.createElement('ul');
    listElem.classList.add('catalog__list');

    const listItems = data.map(item => {
      const listItemsElem = document.createElement('li');
      listItemsElem.classList.add('catalog__item');

      const link = document.createElement('a');
      link.classList.add('catalog__link');
      link.href = `/category?slug=${item}`;
      link.textContent = item;

      listItemsElem.append(link);

      return listItemsElem;
    })

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  }
}