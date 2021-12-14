import Controls from "../common/control";

class StartPage extends Controls {
    public onSettings: () => void;
    public onGameSelect:(gameName: string) => void;

    constructor(parentNode: HTMLElement) {
        super(parentNode);
        const picturesButton = new Controls(this.node, "button", "pic__button", "Pictures quiz");
        picturesButton.node.onclick = () => this.onGameSelect("pictures");
        const artistsButton = new Controls(this.node, "button", "pic__button", "Artists quiz");
        artistsButton.node.onclick = () => this.onGameSelect("artists");
        const settingsButton = new Controls(this.node, "button", "settings__button", "Settings");
        settingsButton.node.onclick = () => this.onSettings();
    }
}
export default StartPage;