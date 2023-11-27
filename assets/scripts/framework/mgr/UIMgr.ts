import { ResolutionPolicy, Vec3, View, instantiate } from "cc";
import { ResMgr } from "./ResMgr";
import { find, Node } from "cc";
import { BasePage } from "../base/BasePage";
import { BaseWindow } from "../base/BaseWindow";

interface Openable<T extends BasePage | BaseWindow> {
    new(...args: any[]): T;
    prefabPath: string;
}

export class UIMgr {
    private constructor() { }

    private static uiRoot: Node;
    private static pageRoot: Node;
    private static windowRoot: Node;
    private static blockInput: Node;
    private static spinner: Node;

    public static init() {
        View.instance.setResolutionPolicy(ResolutionPolicy.NO_BORDER)

        UIMgr.uiRoot = find('Canvas')
        UIMgr.pageRoot = UIMgr.uiRoot.getChildByName('PageRoot')
        UIMgr.windowRoot = UIMgr.uiRoot.getChildByName('WindowRoot')
        UIMgr.blockInput = UIMgr.uiRoot.getChildByName('BlockInput')
        UIMgr.spinner = UIMgr.blockInput.getChildByName('spinner')
        UIMgr.blockInput.active = false
    }

    public static async open<T extends BasePage | BaseWindow>(openable: Openable<T>, openArg?: any) {
        UIMgr.blockInput.active = true;
        UIMgr.spinner.active = false;
        const timerId = setTimeout(() => {
            UIMgr.spinner.active = true
        }, 500);//界面打开过程超过0.5s会显示转圈

        const result = await ResMgr.loadPrefab(openable.prefabPath)
        if (result) {
            const pwNd = instantiate(result)
            const pwCom = pwNd.getComponent(openable)

            if (pwCom instanceof BasePage) {
                UIMgr.pageRoot.destroyAllChildren();
                pwNd.setParent(UIMgr.pageRoot)
            } else {
                pwNd.setParent(UIMgr.windowRoot)
            }
            pwNd.setPosition(Vec3.ZERO)

            pwCom.onOpen(openArg)
        }
        
        clearTimeout(timerId);
        UIMgr.blockInput.active = false
    }

}