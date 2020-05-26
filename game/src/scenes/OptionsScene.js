import { CST } from "../CST";

let changePlayer;

export class OptionsScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.OPTIONS,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        changePlayer = this.add.text(50, 100, "Choose your player:", {
            fontSize: "32px",
            fill: "#000",
        });
    }
}
