import Controls from "../common/control";
import {ICategoryData} from "./QuizDataModel";

class CategoriesPage extends Controls {
    public backHome: () => void;
    onSelected: (index: number) => void;

    constructor(parentNode: HTMLElement, gameName: string, quizCategoriesData: Array<ICategoryData>) {
        super(parentNode);
        const header = new Controls(this.node, "header", "header", gameName);
        const buttonHome = new Controls(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }

        //const categoriesList = ["Portrait", "Landscape", "Still Life", "Graphic", "Antique", "Avant-Garde", "Renaissance", "Surrealism", "Kitsch", "Minimalism", "Avangard", "Industrial"];
        const categoryButton = quizCategoriesData.map((item, i) => {
            const button = new Controls(this.node, "button", "card", item.name.toString());
            const img = new Image(100, 100);
            img.src = item.picture;
            img.classList.add("img__photo");
            button.node.append(img);
            button.node.onclick = () => {
                this.onSelected(i);
            }
            return button;
        })
    }
}
export default CategoriesPage;