import { AudioClip, AudioSource, Component, Node, director } from "cc";
import { ResMgr } from "./ResMgr";

export class AudioManager extends Component {
    private static _instance: AudioManager;

    public static get instance(): AudioManager {
        if (!AudioManager._instance) {
            const nd = new Node('AudioManager');
            nd.setParent(director.getScene());
            AudioManager._instance = nd.addComponent(AudioManager);
            AudioManager._instance._audioSource = nd.addComponent(AudioSource);
            AudioManager._instance._audioSource.playOnAwake = false;
        }
        return AudioManager._instance;
    }

    private _audioSource: AudioSource;
    volumeScale: number = 1;

    async play(path: string, loop: boolean = true, volume: number = 1.0) {
        const clip = await ResMgr.loadAsset<AudioClip>(path);
        if (clip) {
            this.stop()
            this._audioSource.clip = clip;
            this._audioSource.loop = loop;
            this._audioSource.volume = volume * this.volumeScale;
            this._audioSource.play();
        }
    }

    async playShot(path: string, volume: number = 1.0) {
        const result = await ResMgr.loadAsset<AudioClip>(path);
        if (result) {
            this._audioSource.playOneShot(result, volume * this.volumeScale);
        }
    }

    stop() {
        this._audioSource.stop()
    }
}