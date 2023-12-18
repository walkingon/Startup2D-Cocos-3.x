import { _decorator, Component, Node } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
import { UIMgr } from '../../framework/mgr/UIMgr';
import { TipWindow } from '../common/TipWindow';
import { HomePage } from '../home/HomePage';
import { CfgMgr } from '../../framework/mgr/CfgMgr';
const { ccclass, property } = _decorator;

@ccclass('GamePage')
export class GamePage extends BasePage {
    public static readonly prefabPath = 'prefabs/game/GamePage'
    
    onOpen(arg?: any): void {
        const item = CfgMgr.itemCfg.getCfg(1)
        UIMgr.open(TipWindow, item.name)
    }

    onClickBack(){
        UIMgr.open(HomePage, {from: 'GamePage'})
    }

    onClickTip(){
        UIMgr.open(TipWindow, '这是TipWindow \n 可以创建多个Window')
    }
}


