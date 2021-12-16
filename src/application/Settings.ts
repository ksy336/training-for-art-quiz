import Control from "../common/control";
import './../styles.css';

interface IQuizSettings {

}

class SettingsPage extends Control {
    public backHome: () => void;
    public onSave: (settings: IQuizSettings) => void;


    constructor(parentNode: HTMLElement) {
        super(parentNode);
        const buttonHome = new Control(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const settings: IQuizSettings = {

        }
        const buttonSave = new Control(this.node, "button", "settings__button-save", "Save");
        buttonSave.node.onclick = () => {
            this.onSave(settings);
        }
    }
}
export default SettingsPage;