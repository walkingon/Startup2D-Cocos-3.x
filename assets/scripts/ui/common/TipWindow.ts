import { _decorator, Label, tween, UIOpacity, Vec3 } from 'cc';
import { BaseWindow } from '../../framework/base/BaseWindow';
const { ccclass, property } = _decorator;

@ccclass('TipWindow')
export class TipWindow extends BaseWindow {
    public static prefabPath = 'prefabs/common/TipWindow';

    @property(Label)
    private tip: Label;

    onOpen(arg?: any): void {
        if(!arg || typeof arg !== 'string') return;

        this.tip.string = arg

        this.node.setScale(0.5, 0.5)

        const opaticy = this.node.addComponent(UIOpacity)
        const t21 = tween(opaticy).to(1, {
            opacity: 0
        })

        tween(this.node)
            .to(0.5, {
                scale: new Vec3(1, 1, 1)
            }, {
                easing: 'bounceOut'
            })
            .delay(0.5)
            .call(() => {
                t21.start()
            })
            .by(1.1, {
                position: new Vec3(0, 300, 0)
            })
            .call(() => {
                this.node.destroy();
            })
            .start()
    }
}


