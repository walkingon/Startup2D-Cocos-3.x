import { JsonAsset } from "cc";
import { ResMgr } from "./ResMgr";

export class CfgMgr {
    private constructor() { };

    // static initCfg: InitCfg;
    // static itemCfg: ItemCfg;

    static async load() {
        const result = await ResMgr.loadDir<JsonAsset>('json')
        if (result) {
            result.forEach((v, i) => {
                CfgMgr.parseJson(v.name, v.json)
            })
        }
    }

    private static parseJson(name: string, json: any) {
        // if (name === 'init') {
        //     CfgMgr.initCfg = InitCfg.build(json);
        // } else if (name === 'items') {
        //     CfgMgr.itemCfg = ItemCfg.build(json);
        // }
    }
}