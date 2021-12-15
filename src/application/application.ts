import Controls from "../common/control";
import StartPage from "./startPage";
import SettingsPage from "./Settings";
import CategoriesPage from "./categoriesPage";
import "./../styles.css";
import GameFieldPage from "./gameFieldPage";
import GameOverPage from "./gameOverPage";

class Application extends Controls {
    constructor(parentNode: HTMLElement) {
        super(parentNode);
        this.mainCycle();
    }

    private gameCycle(gameName: string, categoryIndex: number) {
        const gameFieldPage = new GameFieldPage(this.node,{gameName: gameName, categoryIndex: categoryIndex});
        gameFieldPage.backHome = () => {
            gameFieldPage.destroy();
            this.mainCycle();
        }
        gameFieldPage.backToCateg = () => {
            gameFieldPage.destroy();
            this.categoryCycle(gameName);
        }
        gameFieldPage.onFinish = (results) => {
            gameFieldPage.destroy();
            const gameOverPage = new GameOverPage(this.node, results);
            gameOverPage.backHome = () => {
                gameOverPage.destroy();
                this.mainCycle();
            }
            gameOverPage.onNext = () => {
                gameOverPage.destroy();
                // if (categoryIndex >)
                this.gameCycle(gameName, categoryIndex + 1);
            }
        }
    }
    private categoryCycle(gameName: string) {
        const categoriesPage = new CategoriesPage(this.node, gameName);
        categoriesPage.backHome = () => {
            categoriesPage.destroy();
            this.mainCycle();
        }
        categoriesPage.onSelected = (i) => {
            categoriesPage.destroy();
            this.gameCycle(gameName, i);
        }
    }

    private mainCycle() {
        const startPage = new StartPage(this.node);
        startPage.onGameSelect = (gameName) => {
            startPage.destroy();
            this.categoryCycle(gameName);
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