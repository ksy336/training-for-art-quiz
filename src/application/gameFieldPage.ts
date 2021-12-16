import Control from "../common/control";
import ArtistsQuestions from "./artists-questions";
// import {IArtistQuestionData} from "./IArtistQuestionData";
import PicturesQuestions from "./pictures-questions";
import {IPicturesQuestionData, IArtistsQuestionData} from "./QuizDataModel";
import './../styles.css';
import {IQuizSettings} from "./Settings";
import {SoundManager} from "./soundManager";

interface IQuizOptions {
    gameName: string;
    categoryIndex: number;
    settings: IQuizSettings;
}

type IQuizResults = Array<boolean>;

export class Timer extends Control{
    onTimeout: ()=>void;
    timer: number;
    initialTime:number;

    constructor(parentNode:HTMLElement){
        super(parentNode);
    }

    start(time:number){
        this.initialTime = time;
        if (this.timer){
            this.stop();
        }
        let currentTime = time;
        const render = (currentTime:number)=>{
            this.node.textContent = `${this.initialTime} / ${currentTime}`;
        }
        render(time);
        this.timer = window.setInterval(()=>{
            currentTime--;
            render(currentTime);
            if (currentTime <=0){
                this.onTimeout();
            }
        }, 1000);
    }

    stop(){
        window.clearInterval(this.timer);
    }
}

class GameFieldPage extends Control {
    gameOptions: IQuizOptions;
    backHome: ()=> void;
    backToCateg: () => void;
    onFinish: (results:IQuizResults)=>void;
    progressIndicator: Control<HTMLElement>;
    results: IQuizResults;
    answersIndicator: Control<HTMLElement>;
    timer: Timer;

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

        this.timer = new Timer(this.node);
        this.progressIndicator = new Control(this.node, "div", "question", "");
        this.answersIndicator = new Control(this.node, "div", "question", "");

        //const questions: Array<IArtistQuestionData> = [{answers:[1, 2, 3, 4], correctAnswersIndex:2}, {answers:[1, 2, 3, 4], correctAnswersIndex: 0}, {answers:[1, 2, 3, 4], correctAnswersIndex: 3}];
        this.results = [];
        this.questionCycle(gameOptions.gameName, questionData, 0, () => {
            this.onFinish(this.results);
        })
    }
    questionCycle(gameName: string, questions: Array<any>, index: number, onFinish: ()=> void) {
        if (index >= questions.length) {
            onFinish();
            return;
        }
        let _quest: Control;
        this.progressIndicator.node.textContent = `${index + 1} / ${questions.length}`;
        this.answersIndicator.node.textContent = this.results.map(it => it ? '+' : '-').join(' ');
        if (this.gameOptions.settings.timeEnabled) {
            this.timer.start(this.gameOptions.settings.time);
            this.timer.onTimeout = () => {
                _quest.destroy();
                this.results.push(false);
                SoundManager.fail();
                this.questionCycle(gameName, questions, index + 1, onFinish);
            }
        }

        if (gameName == 'artists') {
            const question = new ArtistsQuestions(this.node, questions[index]);
            _quest = question;
            question.onAnswer = answerIndex => {
                question.destroy();
                const result = answerIndex === questions[index].correctAnswerIndex;
                if (result) {
                    SoundManager.ok();
                } else {
                    SoundManager.fail();
                }
                this.results.push(result);
                this.questionCycle(gameName, questions, index + 1, onFinish);
            };
        } else if (gameName == 'pictures') {
            const question = new PicturesQuestions(this.node, questions[index]);
            _quest = question;
            question.onAnswer = answerIndex => {
                question.destroy();
                const result = answerIndex === questions[index].correctAnswerIndex;
                if (result) {
                    SoundManager.ok();
                } else {
                    SoundManager.fail();
                }
                this.results.push(result);
                this.questionCycle(gameName, questions, index + 1, onFinish);
            };
        } else {
            throw new Error('Game type is not exists');
        }
    }
    destroy(){
        this.timer.stop();
        super.destroy();
    }
}
export default GameFieldPage;