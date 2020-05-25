import { CST } from "../CST";
// import { MenuScene } from "./MenuScene";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD,
        });
    }
    init() {}
    preload() {
        // load image, spritesheet, sound

        this.load.image("mainbg", "./assets/mainbg.jpg");
        this.load.image("options_button.png", "./assets/options_button.png");
        this.load.image("play_button.png", "./assets/play_button.png");
        this.load.image("mushroom.png", "./assets/mushroom.png");
        this.load.spritesheet("cat.png", "./assets/cat.png", {
            frameHeight: 100,
            frameWidth: 200,
        });
        this.load.spritesheet("purple.png", "./assets/purple.png", {
            frameHeight: 50,
            frameWidth: 100,
        });

        // create loading bar

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xff00ff, //white
            },
        });

        //Loader Events - complete, progress

        //simulate large load
        for (let i = 0; i < 100; i++) {
            this.load.spritesheet("cat" + i, "./assets/cat.png", {
                frameHeight: 150,
                frameWidth: 200,
            });
        }

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(
                0,
                this.game.renderer.height / 2,
                this.game.renderer.width * percent,
                50
            );
            console.log(percent);
        });
        this.load.on("complete", () => {
            console.log("done");
        });
    }
    create() {
        this.scene.start(CST.SCENES.MENU, "hello from LoadScene");
    }
}
