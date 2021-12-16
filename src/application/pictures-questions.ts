import Control from "../common/control";
import { IArtistsQuestionData, IPicturesQuestionData } from "./quizDataModel";
import './../styles.css';

 class PicturesQuestions extends Control {
    onAnswer: (index:number)=>void;

    constructor(parentNode: HTMLElement, questionData: IPicturesQuestionData) {
        super(parentNode);

        const question = new Control(this.node, 'div', 'question', ` Какую картину написал ${questionData.artistName}`);
        const answerButtons = questionData.answers.map((it, i) => {
            const button = new Control(this.node, 'button', 'card', i.toString());
            const img = new Image(200, 200);
            img.src = it;
            button.node.append(img);
            button.node.onclick = () => {
                this.onAnswer(i);
            }
        })
    }
}
export default PicturesQuestions;