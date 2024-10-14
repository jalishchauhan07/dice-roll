import assets from "./assets";

export default class SoundManager {
    constructor(oScene) {
        this.oScene = oScene;
        this.isSoundOn = true;
    }
    playSound(key, loop) {
        if (this.isSoundOn) {
            key.play();
            key.loop = loop;
        }
    }
    stopSound(key, loop) {
        key.loop = loop
        key.stop();
    }
}