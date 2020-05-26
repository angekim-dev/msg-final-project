console.log("connected!");

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { PlayScene } from "./scenes/PlayScene";
import { OptionsScene } from "./scenes/OptionsScene";

let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [LoadScene, MenuScene, PlayScene, OptionsScene],
    render: {
        pixelArt: true,
    },
};

let game = new Phaser.Game(config);
