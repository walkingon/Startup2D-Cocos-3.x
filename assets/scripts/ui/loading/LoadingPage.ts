import { _decorator } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
import { UIMgr } from '../../framework/mgr/UIMgr';
import { HomePage } from '../home/HomePage';
const { ccclass, property } = _decorator;

@ccclass('LoadingPage')
export class LoadingPage extends BasePage {
    public static prefabPath = 'prefabs/loading/LoadingPage'
    
    onOpen(arg?: any): void {
        this.scheduleOnce(this.jumpHomePage, 2)
    }

    private jumpHomePage(){
        UIMgr.open(HomePage, {from: 'LoadingPage'})
    }
}
