import Control from "../common/control";
import { IArtistsQuestionData, IPicturesQuestionData } from "./quizDataModel";
import './../styles.css';

export class ArtistsQuestions extends Control {
    onAnswer: (index:number)=>void;

    constructor(parentNode: HTMLElement, questionData: IArtistsQuestionData) {
        super(parentNode);

        const question = new Control(this.node, 'div', 'question', 'Кто автор данной картины');
        const img = new Image(200, 200);
        img.src = questionData.artistImageUrl;
        question.node.append(img);
        const answerButtons = questionData.answers.map((it, i) => {
            const button = new Control(this.node, 'button', '', it.toString());
            button.node.onclick = () => {
                this.onAnswer(i);
            }
        })
    }
}
export default ArtistsQuestions;