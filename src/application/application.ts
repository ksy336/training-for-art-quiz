import Controls from "../common/control";
import StartPage from "./startPage";
import SettingsPage from "./Settings";
import CategoriesPage from "./categoriesPage";

class Application extends Controls {
    constructor(parentNode: HTMLElement) {
        super(parentNode);
        this.mainCycle();
    }

    private mainCycle() {
        const startPage = new StartPage(this.node);
        startPage.onGameSelect = () => {
            const categoriesPage = new CategoriesPage(this.node);
        }
        startPage.onSettings = () => {
            startPage.destroy();
            const settingsPage = new SettingsPage(this.node);
            settingsPage.backHome = () => {
                settingsPage.destroy();
                this.mainCycle();
            }
            settingsPage.onSave = (settings) => {
                console.log(settings);
                settingsPage.destroy();
                this.mainCycle();
            }
        }
    }
}
export default Application;