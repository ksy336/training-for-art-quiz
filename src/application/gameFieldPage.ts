import Controls from "../common/control";
import ArtistsQuestions from "./artists-questions";
import {IArtistQuestionData} from "./IArtistQuestionData";

interface IQuizOptions {
    gameName: string;
    categoryIndex: number;
}

type IQuizResults = Array<boolean>;

class GameFieldPage extends Controls {
    gameOptions: IQuizOptions;
    backHome: ()=> void;
    backToCateg: () => void;
    onFinish: (results: IQuizResults) => void;
    progressIndicator: Controls<HTMLElement>;
    results: IQuizResults;
    answersIndicator: Controls<HTMLElement>;

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

        this.progressIndicator = new Controls(this.node, "div", "question", "");
        this.answersIndicator = new Controls(this.node, "div", "question", "");

        const questions: Array<IArtistQuestionData> = [{answers:[1, 2, 3, 4], correctAnswersIndex:2}, {answers:[1, 2, 3, 4], correctAnswersIndex: 0}, {answers:[1, 2, 3, 4], correctAnswersIndex: 3}];
        this.results = [];
        this.questionCycle(questions, 0, () => {
            this.onFinish(this.results);
        })

        // const finishButton = new Controls(this.node, "button", "button", "Finish");
        // finishButton.node.onclick = () => {
        //     this.onFinish({});
        // }
    }
    questionCycle(questions: Array<IArtistQuestionData>, index: number, onFinish: ()=> void) {
        if(index >= questions.length) {
            onFinish();
            return;
        }
        this.progressIndicator.node.textContent = `${index + 1} / ${questions.length}`;
        this.answersIndicator.node.textContent = this.results.map((item) => item=== true? "+": "-").join(" ");
        const artistsQuestions = new ArtistsQuestions(this.node, questions[index]);
        artistsQuestions.onAnswer = (answerIndex) => {
            artistsQuestions.destroy();
            this.results.push(answerIndex === questions[index].correctAnswersIndex);
            this.questionCycle(questions, index + 1, onFinish);

        }
    }
}
export default GameFieldPage;