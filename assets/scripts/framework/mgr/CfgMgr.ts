import { JsonAsset } from "cc";
import { ResMgr } from "./ResMgr";
import { ItemCfgModel } from "../../cfgModel/ItemCfgModel";
import { InitCfgModel } from "../../cfgModel/InitCfgModel";

class Cfg<T>{
    private _list: T[] = [];
    private _map: Map<number | string, T> = new Map();

    public constructor(jsonData: any, primary: string) {
        jsonData.forEach((v, i) => {
            const dt = { ...v }
            this._list.push(dt)
            this._map.set(dt[primary], dt)
        })
    }

    public getList() {
        return this._list
    }

    public getCfg(key: number | string) {
        return this._map.get(key)
    }
}

export class CfgMgr {
    private constructor() { };

    static initCfg: Cfg<InitCfgModel>
    static itemCfg: Cfg<ItemCfgModel>

    static async load() {
        const result = await ResMgr.loadDir<JsonAsset>('json')
        if (result) {
            result.forEach((v, i) => {
                CfgMgr.init(v.name, v.json)
            })
        }
    }

    private static init(name: string, json: any) {
        if(name === 'init'){
            CfgMgr.initCfg = new Cfg<InitCfgModel>(json, 'key')
        }else if (name === 'item') {
            CfgMgr.itemCfg = new Cfg<ItemCfgModel>(json, 'id')
        }
    }
}