import Controls from "../common/control";

interface IQuizOptions {
    gameName: string;
    categoryIndex: number;
}

interface IQuizResults {

}

class GameFieldPage extends Controls {
    gameOptions: IQuizOptions;
    backHome: ()=> void;
    backToCateg: () => void;
    onFinish: (results: IQuizResults) => void;

    constructor(parentNode: HTMLElement, gameOptions: IQuizOptions) {
        super(parentNode);
       this.gameOptions = gameOptions;
        console.log(gameOptions);

        const header = new Controls(this.node, "header", "header", `${gameOptions.gameName} - ${gameOptions.categoryIndex}`);
        const buttonHome = new Controls(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const backToCategories = new Controls(this.node, "button", "button__categ", "Categories");
        backToCategories.node.onclick = () => {
            this.backToCateg();
        }
        const finishButton = new Controls(this.node, "button", "button", "Finish");
        finishButton.node.onclick = () => {
            this.onFinish({});
        }
    }
}
export default GameFieldPage;