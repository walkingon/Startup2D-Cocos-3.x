import { _decorator, Component, Node, Tween, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Spinner')
export class Spinner extends Component {
    private tw: Tween<Node>;

    start() {
        this.tw = tween(this.node)
            .by(2, { angle: -360 })
            .repeatForever()
            .start();
    }

    protected onDestroy(): void {
        if (this.tw) this.tw.stop();
    }

}


