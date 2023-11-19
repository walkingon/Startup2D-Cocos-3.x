import { _decorator, Component, Node } from 'cc';
import { BasePage } from '../../framework/base/BasePage';
const { ccclass, property } = _decorator;

@ccclass('HomePage')
export class HomePage extends BasePage {
    public static prefabPath = 'prefabs/home/HomePage'
    
    onOpen(arg?: any): void {
        
    }

    onClickStartGame(){
        
    }
}


