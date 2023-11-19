import { Vec3, instantiate } from "cc";
import { ResMgr } from "./ResMgr";
import { find, Node } from "cc";
import { BasePage } from "../base/BasePage";
import { BaseWindow } from "../base/BaseWindow";

interface Openable<T extends BasePage | BaseWindow> {
    new(...args: any[]): T;
    prefabPath: string;
}

export class UIMgr {
    //不写getInstance用起来才知道有多爽
    private constructor() { }

    private static uiRoot: Node;
    private static pageRoot: Node;
    private static windowRoot: Node;
    private static loading: Node;

    public static init() {
        UIMgr.uiRoot = find('UIRoot')
        UIMgr.pageRoot = UIMgr.uiRoot.getChildByName('PageRoot')
        UIMgr.windowRoot = UIMgr.uiRoot.getChildByName('WindowRoot')
        UIMgr.loading = UIMgr.uiRoot.getChildByName('Loading')
        UIMgr.loading.active = false
    }

    public static async open<T extends BasePage | BaseWindow>(openable: Openable<T>, openArg?: any) {
        UIMgr.loading.active = true
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
        UIMgr.loading.active = false
    }

}