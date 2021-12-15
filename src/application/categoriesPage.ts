import Controls from "../common/control";

class CategoriesPage extends Controls {
    public backHome: () => void;
    onSelected: (index: number) => void;

    constructor(parentNode: HTMLElement, gameName: string) {
        super(parentNode);
        const header = new Controls(this.node, "header", "header", gameName);
        const buttonHome = new Controls(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }

        const categoriesList = ["Portrait", "Landscape", "Still Life", "Graphic", "Antique", "Avant-Garde", "Renaissance", "Surrealism", "Kitsch", "Minimalism", "Avangard", "Industrial"];
        const categoryButton = categoriesList.map((item, i) => {
            const button = new Controls(this.node, "button", "card", item.toString())
            button.node.onclick = () => {
                this.onSelected(i);
            }
            return button;
        })
    }
}
export default CategoriesPage;