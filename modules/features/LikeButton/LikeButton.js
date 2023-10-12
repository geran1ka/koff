import { FavoriteService } from "../../../services/StorageService";
import { likeSvg } from "../likeSvg/likeSvg";

export class LikeButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.className);
    button.classList.add(`${this.className}_active`)

    if(this.favoriteService.check(id)) {
      button.
    }

    button.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        this.favoriteService.remove(id);
        button.classList.remove(`${this.className}_active`)
      } else {
        this.favoriteService.add(id);
        button.classList.add(`${this.className}_active`)

      }
      console.log('Добавить товар в избранное');
    });

    likeSvg().then((svg) => {
      button.append(svg);
    });



    return button;
  }
}