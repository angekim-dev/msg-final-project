console.log("connected!");

import { LoadScene } from "./scenes/LoadScene";
import { MenuScene } from "./scenes/MenuScene";
import { LevelOneScene } from "./scenes/LevelOneScene";
import { OptionsScene } from "./scenes/OptionsScene";
import { LevelTwoScene } from "./scenes/LevelTwoScene";

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
    scene: [LoadScene, MenuScene, LevelOneScene, OptionsScene, LevelTwoScene],
    render: {
        pixelArt: true,
    },
};

let game = new Phaser.Game(config);
