import { CST } from "../CST";

let changePlayer;
let moderngirl;
let back;
let button;
let jasmine;

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

        moderngirl = this.add
            .sprite(500, 100, "moderngirl", 0)
            .setInteractive();

        moderngirl.on("pointerup", () => {
            this.scene.start(CST.SCENES.LEVELONEMODERN);
        });

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

        jasmine = this.add.sprite(600, 100, "jasmine").setInteractive();

        jasmine.on("pointerup", () => {
            this.scene.start(CST.SCENES.LEVELONE);
        });

        this.anims.create({
            key: "playerWalk",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames("jasmine", {
                start: 1,
                end: 3,
            }),
        });
        jasmine.play("playerWalk");

        back = this.add
            .sprite(50, 550, "back")
            .setDepth(1)
            .setScale(1)
            .setInteractive();

        back.on("pointerup", () => {
            this.scene.start(CST.SCENES.MENU);
        });

        button = this.add
            .sprite(750, 50, "fullscreen")
            .setDepth(1)
            .setScale(1)
            .setInteractive();

        button.on(
            "pointerup",
            () => {
                if (this.scale.isFullscreen) {
                    button.setFrame(0);

                    this.scale.stopFullscreen();
                } else {
                    button.setFrame(1);

                    this.scale.startFullscreen();
                }
            },
            this
        );
        let fKey = this.input.keyboard.addKey("F");

        fKey.on(
            "down",
            function () {
                if (this.scale.isFullscreen) {
                    button.setFrame(0);
                    this.scale.stopFullscreen();
                } else {
                    button.setFrame(1);
                    this.scale.startFullscreen();
                }
            },
            this
        );
    }
}
