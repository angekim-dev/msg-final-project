import { CST } from "../CST";

let fullscreenMushroom;

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU,
        });
    }
    init(data) {
        console.log("This is DATA", data);
    }
    preload() {}
    create() {
        //create images (z order)
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);

        fullscreenMushroom = this.add
            .image(
                this.game.renderer.width / 2,
                this.game.renderer.height * 0.2,
                "mushroom.png"
            )
            .setDepth(1)
            .setScale(0.5)
            .setInteractive();

        fullscreenMushroom.on(
            "pointerup",
            () => {
                if (this.scale.isFullscreen) {
                    fullscreenMushroom.setFrame(0);

                    this.scale.stopFullscreen();
                } else {
                    fullscreenMushroom.setFrame(1);

                    this.scale.startFullscreen();
                }
            },
            this
        );

        let playButton = this.add
            .image(
                this.game.renderer.width / 2,
                this.game.renderer.height / 2,
                "play_button.png"
            )
            .setDepth(1);
        let optionsButton = this.add
            .image(
                this.game.renderer.width / 2 + 300,
                this.game.renderer.height / 2 + 180,
                "options_button.png"
            )
            .setDepth(1);

        // create sprites (if using pixel art, remove sharpen)
        let hoverSprite = this.add.sprite(100, 100, "cat.png");
        hoverSprite.setScale(1);
        hoverSprite.setVisible(false);

        let purpleHover = this.add.sprite(-100, -100, "purple.png");
        hoverSprite.setScale(1);
        hoverSprite.setVisible(false);

        //create animation
        this.anims.create({
            key: "jump",
            frameRate: 4,
            repeat: -1, //repeat forever
            frames: this.anims.generateFrameNumbers("cat.png", {
                frames: [0, 1, 2, 3],
            }),
        });

        // PointerEvents pointerover, pointerout, pointerup, pointerdown
        playButton.setInteractive();

        playButton.on("pointerover", () => {
            console.log("hover");
            hoverSprite.setVisible(true);
            hoverSprite.play("jump");
            hoverSprite.x = playButton.x - (playButton.width - 440);
            hoverSprite.y = playButton.y + playButton.height * 3.3;
        });
        playButton.on("pointerout", () => {
            console.log("out");
            hoverSprite.setVisible(false);
        });
        playButton.on("pointerup", () => {
            console.log("up");
            this.scene.start(CST.SCENES.LEVELONE);
        });

        optionsButton.setInteractive();

        optionsButton.on("pointerover", () => {
            console.log("hover");
            purpleHover.setVisible(true);
        });
        optionsButton.on("pointerout", () => {
            console.log("no-hover");
            purpleHover.setVisible(false);
            purpleHover.x = optionsButton.x;
            purpleHover.y = optionsButton.y;
        });
        optionsButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.OPTIONS);
        });
    }
}
