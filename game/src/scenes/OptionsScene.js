import { CST } from "../CST";

let changePlayer;
let moderngirl;

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
        moderngirl = this.add.sprite(500, 100, "moderngirl", 0);

        this.anims.create({
            key: "walk",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 1,
                end: 3,
            }),
        });
        moderngirl.play("walk");
    }
}
