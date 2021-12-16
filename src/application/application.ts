import Control from "../common/control";
import StartPage from "./startPage";
import SettingsPage, {SettingsModel} from "./Settings";
import CategoriesPage from "./categoriesPage";
import "./../styles.css";
import GameFieldPage from "./gameFieldPage";
import GameOverPage from "./gameOverPage";
import QuizDataModel from "./QuizDataModel";
import {SoundManager} from "./soundManager";

class Application extends Control {
     model: QuizDataModel;
     settingsModel: SettingsModel;

    constructor(parentNode: HTMLElement) {
        super(parentNode);
        const preloader = new Control(this.node, "div", "", "Loading...");
        SoundManager.preload();
        this.settingsModel = new SettingsModel();
        this.settingsModel.loadFromLocalStorage();
        this.model = new QuizDataModel();
        this.model.build().then(result => {
            preloader.destroy();
            console.log(result.data);
            this.mainCycle();
        })

    }

    private gameCycle(gameName: string, categoryIndex: number) {
        let questions: Array<any> = [];
        if(gameName === "artists") {
            questions = this.model.getArtistsQuestions(categoryIndex);
        } else if(gameName === "pictures") {
            questions = this.model.getPicturesQuestions(categoryIndex);
        } else {
            throw new Error("gameName does not exist");
        }
        const gameFieldPage = new GameFieldPage(this.node,{gameName: gameName, categoryIndex: categoryIndex, settings: this.settingsModel.getData()}, questions);
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
        const categoriesPage = new CategoriesPage(this.node, gameName, this.model.getCategoriesData());
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
            const settingsPage = new SettingsPage(this.node, this.settingsModel.getData());
            settingsPage.backHome = () => {
                settingsPage.destroy();
                this.mainCycle();
            }
            settingsPage.onSave = (settings) => {
                console.log(settings);
                settingsPage.destroy();
                this.settingsModel.setData(settings);
                this.mainCycle();
            }
        }
    }
}
export default Application;