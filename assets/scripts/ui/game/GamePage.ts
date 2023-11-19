import { _decorator, Component, Node } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
import { UIMgr } from '../../framework/mgr/UIMgr';
import { TipWindow } from '../common/TipWindow';
import { HomePage } from '../home/HomePage';
const { ccclass, property } = _decorator;

@ccclass('GamePage')
export class GamePage extends BasePage {
    public static prefabPath = 'prefabs/game/GamePage'
    
    onOpen(arg?: any): void {
        
    }

    onClickBack(){
        UIMgr.open(HomePage, {from: 'GamePage'})
    }

    onClickTip(){
        UIMgr.open(TipWindow, '这是TipWindow \n 可以创建多个Window')
    }
}


