import { CST } from "../CST";

let platforms;
let player;

export class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.PLAY,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, "ground").setScale(2).refreshBody();

        platforms.create(600, 420, "ground");
        platforms.create(50, 270, "ground");
        platforms.create(750, 250, "ground");

        player = this.physics.add.sprite(300, 0, "dude");

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.collider(player, platforms);
    }
}
