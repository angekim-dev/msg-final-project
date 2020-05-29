import { CST } from "../CST";

let jasmine;
let cursors;
let stars;

let score = 210;
let scoreText;
let button;
let fullscreenText;

let ping;
let sound;
let cancelsound;

let platforms;
let tile;

function collectStar(jasmine, star) {
    star.disableBody(true, true);

    score += 10;
    ping.play();
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    let x =
        jasmine.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

export class LevelThreeScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELTHREE,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);

        tile = this.physics.add.staticGroup();
        tile.create(140, 510, "tile").refreshBody();
        tile.create(300, 400, "tile");
        tile.create(400, 200, "tile");

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 600, "grass").setScale(2).refreshBody();
        platforms.create(-100, 300, "grass");

        jasmine = this.physics.add.sprite(20, 300, "jasmine", 0);
        jasmine.setBounce(0.5);
        jasmine.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNames("jasmine", {
                start: 4,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "jasmine", frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNames("jasmine", {
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(jasmine, platforms);
        this.physics.add.collider(jasmine, tile);

        stars = this.physics.add.group({
            key: "star",
            repeat: 8,
            setXY: { x: 12, y: 0, stepX: 90 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
        });

        this.physics.add.collider(stars, platforms);

        scoreText = this.add.text(280, 10, "Your score: 210", {
            fontSize: "32px",
            fill: "#000",
        });

        fullscreenText = this.add.text(
            420,
            570,
            "press f for fullscreen modus",
            {
                fontSize: "22px",
                fill: "#000",
            }
        );

        sound = this.add
            .sprite(50, 50, "sound")
            .setDepth(1)
            .setScale(1)
            .setInteractive();

        sound.on("pointerup", () => {
            cancelsound = this.add
                .sprite(50, 50, "redline")
                .setDepth(1)
                .setScale(1)
                .setInteractive();
            this.sound.mute = true;
            if ((this.sound.mute = true)) {
                cancelsound.on("pointerup", () => {
                    this.sound.mute = false;
                    cancelsound.visible = false;
                });
            }
        });

        button = this.add
            .image(800 - 16, 16, "fullscreen", 0)
            .setOrigin(1, 0)
            .setInteractive();

        button.on(
            "pointerup",
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
        ping = this.sound.add("ping");
        ping.allowMultiple = true;
        ping.addMarker("ping", 10, 1.0);
    }
    update() {
        if (cursors.left.isDown) {
            jasmine.setVelocityX(-160);

            jasmine.anims.play("left", true);
        } else if (cursors.right.isDown) {
            jasmine.setVelocityX(160);

            jasmine.anims.play("right", true);
        } else {
            jasmine.setVelocityX(0);

            jasmine.anims.play("turn");
        }

        if (cursors.up.isDown && jasmine.body.touching.down) {
            jasmine.setVelocityY(-330);
        }

        if (cursors.down.isDown) {
            console.log("BOMB");
        }
    }
}
