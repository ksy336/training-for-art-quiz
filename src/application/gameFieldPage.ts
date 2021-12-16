import Control from "../common/control";
import ArtistsQuestions from "./artists-questions";
// import {IArtistQuestionData} from "./IArtistQuestionData";
import PicturesQuestions from "./pictures-questions";
import {IPicturesQuestionData, IArtistsQuestionData} from "./QuizDataModel";
import './../styles.css';

interface IQuizOptions {
    gameName: string;
    categoryIndex: number;
}

type IQuizResults = Array<boolean>;

class GameFieldPage extends Control {
    gameOptions: IQuizOptions;
    backHome: ()=> void;
    backToCateg: () => void;
    onFinish: (results: IQuizResults) => void;
    progressIndicator: Control<HTMLElement>;
    results: IQuizResults;
    answersIndicator: Control<HTMLElement>;

    constructor(parentNode:HTMLElement, gameOptions: IQuizOptions, questionData:Array<IArtistsQuestionData| IPicturesQuestionData>){
        super(parentNode);
        console.log(gameOptions);
        this.gameOptions = gameOptions;
        const header = new Control(this.node, 'h1', '', `${gameOptions.gameName} - ${gameOptions.categoryIndex}`);

        const buttonHome = new Control(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const backToCategories = new Control(this.node, "button", "button__categ", "Categories");
        backToCategories.node.onclick = () => {
            this.backToCateg();
        }

        this.progressIndicator = new Control(this.node, "div", "question", "");
        this.answersIndicator = new Control(this.node, "div", "question", "");

        //const questions: Array<IArtistQuestionData> = [{answers:[1, 2, 3, 4], correctAnswersIndex:2}, {answers:[1, 2, 3, 4], correctAnswersIndex: 0}, {answers:[1, 2, 3, 4], correctAnswersIndex: 3}];
        this.results = [];
        this.questionCycle(gameOptions.gameName, questionData, 0, () => {
            this.onFinish(this.results);
        })

        // const finishButton = new Controls(this.node, "button", "button", "Finish");
        // finishButton.node.onclick = () => {
        //     this.onFinish({});
        // }
    }
    questionCycle(gameName: string, questions: Array<any>, index: number, onFinish: ()=> void) {
        if(index >= questions.length) {
            onFinish();
            return;
        }
        if(gameName === "artists") {
            const artistsQuestions = new ArtistsQuestions(this.node, questions[index]);
            artistsQuestions.onAnswer = (answerIndex) => {
                artistsQuestions.destroy();
                this.results.push(answerIndex === questions[index].correctAnswersIndex);
                this.questionCycle(gameName, questions, index + 1, onFinish);

            }
        } else if(gameName === "pictures") {
            const artistsQuestions = new PicturesQuestions(this.node, questions[index]);
            artistsQuestions.onAnswer = (answerIndex) => {
                artistsQuestions.destroy();
                this.results.push(answerIndex === questions[index].correctAnswersIndex);
                this.questionCycle(gameName, questions, index + 1, onFinish);

            }
        } else {
            throw new Error("gameName does not exist");
        }
        this.progressIndicator.node.textContent = `${index + 1} / ${questions.length}`;
        this.answersIndicator.node.textContent = this.results.map((item) => item=== true? "+": "-").join(" ");
    }
}
export default GameFieldPage;