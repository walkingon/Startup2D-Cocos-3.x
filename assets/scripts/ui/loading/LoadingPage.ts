import { _decorator } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
import { UIMgr } from '../../framework/mgr/UIMgr';
import { HomePage } from '../home/HomePage';
import { CfgMgr } from '../../framework/mgr/CfgMgr';
import { AudioManager } from '../../framework/mgr/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('LoadingPage')
export class LoadingPage extends BasePage {
    public static prefabPath = 'prefabs/loading/LoadingPage'
    
    async onOpen(arg?: any) {
        await CfgMgr.load()
        AudioManager.instance.volumeScale = 1

        this.scheduleOnce(this.jumpHomePage, 2)
    }

    private jumpHomePage(){
        UIMgr.open(HomePage, {from: 'LoadingPage'})
    }
}
