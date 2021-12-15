import Controls from "../common/control";

class GameOverPage extends Controls {
    backHome: () => void;
    onNext: ()=> void;

    constructor(parentNode: HTMLElement, results: any) {
        super(parentNode);
        const buttonHome = new Controls(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const nextQuiz = new Controls(this.node, "button", "button__next", "Next");
        nextQuiz.node.onclick = () => {
            this.onNext();
        }
        const resultsIndicator = new Controls(this.node, "div", "question", "");
        resultsIndicator.node.textContent = results.map((item: boolean) => item=== true? "+": "-").join(" ");
    }
}
export default GameOverPage;