import { API_URL } from "../../../const";
import { CartButton } from "../CartButton/CartButton";
import { LikeButton } from "../LikeButton/LikeButton";

export class Card {
  constructor({id, image, title, price}) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.cartButton = new CartButton('card__btn', 'В корзину');
    this.likeButton = new LikeButton('card__favorite');

  }

  create() {
    const article = document.createElement('article');
    article.classList.add('goods__card', 'card');

    const link = document.createElement('a');
    link.classList.add('card__link', 'card__link_img');
    link.href = `/product/${this.id}`;

    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = `${API_URL}${this.image}`;
    img.alt = this.title;
    link.append(img);

    const info = document.createElement('div');
    info.classList.add('card__info');

    const title = document.createElement('h3');
    title.classList.add('card__title');

    const linkTitle = document.createElement('a');
    linkTitle.classList.add('card__link');
    linkTitle.href = `/product/${this.id}`;
    linkTitle.textContent = this.title;
    title .append(linkTitle);

    const price = document.createElement('p');
    price.classList.add('card__price');
    price.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`
    info.append(title, price);

    const btnCart = this.cartButton.create(this.id);
    const btnFavorite = this.likeButton.create(this.id);

    article.append(link, info, btnCart, btnFavorite);
    
    return article;
  }
} 
// getHTMLTemplateListItem({id, images: [image], name: title, price}) {
//   console.log(id, image, title, price);
//   return `
//       <div class="card__info">


//         <p class="card__price">${price.toLocaleString()}&nbsp;₽</p>
//       </div>

//         <button class="card__btn" data-id="${id}">В корзину</button>

//         <button class="card__favorite" data-id="${id}">
//           <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
//             <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>
            
//         </button>


//     </article>
//   `
// }