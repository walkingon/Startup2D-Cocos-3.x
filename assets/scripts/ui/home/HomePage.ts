import { _decorator, Component, Node } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
import { UIMgr } from '../../framework/mgr/UIMgr';
import { GamePage } from '../game/GamePage';
import { TipWindow } from '../common/TipWindow';
const { ccclass, property } = _decorator;

@ccclass('HomePage')
export class HomePage extends BasePage {
    public static prefabPath = 'prefabs/home/HomePage'
    
    onOpen(arg?: any): void {
        if(arg && arg.from){
            UIMgr.open(TipWindow, `欢迎你从 ${arg.from} 来`)
        }
    }

    onClickStartGame(){
        UIMgr.open(GamePage)
    }
}


