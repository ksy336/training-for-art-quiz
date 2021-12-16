import Control from "../common/control";
import './../styles.css';

class StartPage extends Control {
    public onSettings: () => void;
    public onGameSelect:(gameName: string) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode);
        const picturesButton = new Control(this.node, "button", "pic__button", "Pictures quiz");
        picturesButton.node.onclick = () => this.onGameSelect("pictures");
        const artistsButton = new Control(this.node, "button", "pic__button", "Artists quiz");
        artistsButton.node.onclick = () => this.onGameSelect("artists");
        const settingsButton = new Control(this.node, "button", "settings__button", "Settings");
        settingsButton.node.onclick = () => this.onSettings();
    }
}
export default StartPage;