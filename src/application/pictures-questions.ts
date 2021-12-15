import Controls from "../common/control";

interface IArtistQuestionData {
    answers: Array<any>,
}

class PicturesQuestions extends Controls {
    onAnswer: (index: number)=> void;

    constructor(parentNode: HTMLElement, questionData: IArtistQuestionData) {
        super(parentNode);
        const question = new Controls(this.node, "div", "question", "Какую картину написал ?");
        const answerButton = questionData.answers.map((item, index) => {
            const button = new Controls(this.node, "button", "button__categ", index.toString());
            button.node.onclick = () => {
                this.onAnswer(index);
            }
        })
    }
}
export default PicturesQuestions;