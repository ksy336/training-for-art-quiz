import Control from "../common/control";
import './../styles.css';

export interface IQuizSettings {
    time: number;
    timeEnabled: boolean;
}

const defaultSettings: IQuizSettings = {
    time: 10,
    timeEnabled: false,
}

export class SettingsModel {
   private settings: IQuizSettings;
    constructor() {

    }

    loadFromLocalStorage() {
        const storageData = localStorage.getItem("settings");
        const checkStorageData = (data: string | null) => {
            return !!data;
        }
        if(!checkStorageData(storageData)) {
            this.settings = defaultSettings;
        } else {
            const data: IQuizSettings = JSON.parse(storageData);
            this.settings = data;
        }
    }
    saveToStorage() {
        localStorage.setItem("settings", JSON.stringify(this.settings));
    }
    setData(data: IQuizSettings) {
        this.settings = data;
        this.saveToStorage();
    }
    getData() {
        return JSON.parse(JSON.stringify(this.settings));
    }
}

class SettingsPage extends Control {
    public backHome: () => void;
    public onSave: (settings: IQuizSettings) => void;


    constructor(parentNode: HTMLElement, initialSettings: IQuizSettings) {
        super(parentNode);

        const settings: IQuizSettings = initialSettings;

        const timeInput = new Control<HTMLInputElement>(this.node, "input");
        timeInput.node.type = "range";
        timeInput.node.min = 10..toString();
        timeInput.node.max = 30..toString();
        timeInput.node.step = 1..toString();
        timeInput.node.value = settings.time.toString();
        timeInput.node.oninput = () => {
            settings.time = timeInput.node.valueAsNumber;
        }

        const timeCheck = new Control<HTMLInputElement>(this.node, "input");
        timeCheck.node.type = "checkbox";
        timeCheck.node.checked = settings.timeEnabled;
        timeCheck.node.oninput = () => {
            settings.timeEnabled = timeCheck.node.checked;
        }

        const buttonHome = new Control(this.node, "button", "settings__button-home", "Home");
        buttonHome.node.onclick = () => {
            this.backHome();
        }
        const buttonSave = new Control(this.node, "button", "settings__button-save", "Save");
        buttonSave.node.onclick = () => {
            this.onSave(settings);
        }
    }
}
export default SettingsPage;