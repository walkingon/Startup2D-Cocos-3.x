import { _decorator, Component } from 'cc';
import { UIMgr } from './framework/mgr/UIMgr';
import { LoadingPage } from './ui/loading/LoadingPage';
const { ccclass, property } = _decorator;

@ccclass('Startup')
export class Startup extends Component {
    
    protected async start(){
        UIMgr.init()
        await UIMgr.open(LoadingPage)

        this.node.destroy()
    }
}
