import Controls from "../common/control";

interface IQuizSettings {

}

class SettingsPage extends Controls {
    public backHome: () => void;
    public onSave: (settings: IQuizSettings) => void;


    constructor(parentNode: HTMLElement) {
        super(parentNode);
        const buttonHome = new Controls(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const settings: IQuizSettings = {

        }
        const buttonSave = new Controls(this.node, "button", "settings__button-save", "Save");
        buttonSave.node.onclick = () => {
            this.onSave(settings);
        }
    }
}
export default SettingsPage;