import { JsonAsset } from "cc";
import { ResMgr } from "./ResMgr";
import { ItemCfgModel } from "../../cfgModel/ItemCfgModel";
import { InitCfgModel } from "../../cfgModel/InitCfgModel";

class Cfg<T>{
    private _list: T[] = [];
    private _map: Map<number | string, T> = new Map();

    public constructor(jsonData: any, primary: string) {
        jsonData.forEach((v: T, i: any) => {
            this._list.push(v)
            this._map.set(v[primary], v)
        })
    }

    public getList() {
        const list: ReadonlyArray<T> = this._list;
        return list
    }

    public getCfg(key: number | string) {
        const cfg = this._map.get(key);
        return cfg;
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