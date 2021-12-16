import Control from "../common/control";
import './../styles.css';

class GameOverPage extends Control {
    backHome: () => void;
    onNext: ()=> void;

    constructor(parentNode: HTMLElement, results: any) {
        super(parentNode);
        const buttonHome = new Control(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const nextQuiz = new Control(this.node, "button", "button__next", "Next");
        nextQuiz.node.onclick = () => {
            this.onNext();
        }
        const resultsIndicator = new Control(this.node, "div", "question", "");
        resultsIndicator.node.textContent = results.map((item: boolean) => item=== true? "+": "-").join(" ");
    }
}
export default GameOverPage;