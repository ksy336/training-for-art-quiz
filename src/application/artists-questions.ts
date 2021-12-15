import Controls from "../common/control";
import {IArtistQuestionData} from "./IArtistQuestionData";


class ArtistsQuestions extends Controls {
    onAnswer: (index: number)=> void;

    constructor(parentNode: HTMLElement, questionData: IArtistQuestionData) {
        super(parentNode);
        const question = new Controls(this.node, "div", "question", "Кто автор данной картины");
        const answerButton = questionData.answers.map((item, index) => {
            const button = new Controls(this.node, "button", "", index.toString());
            button.node.onclick = () => {
                this.onAnswer(index);
            }
        })
    }
}
export default ArtistsQuestions;