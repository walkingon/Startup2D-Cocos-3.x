import { Asset, AssetManager, JsonAsset, Prefab, resources } from "cc"

export class ResMgr {
    private constructor() { }

    static async loadAsset<T extends Asset>(assetPath: string, type?:new (...args: any[]) => T): Promise<T | false> {
        return new Promise((resolve, reject) => {
            if (typeof assetPath != 'string' || assetPath.length === 0) {
                reject(false)
                return
            }
            resources.load<T>(assetPath, type, (err, dt) => {
                    if (err) {
                        reject(false)
                        return
                    }
                    resolve(dt)
                })
        })
    }

    static async loadPrefab(prefabPath: string): Promise<Prefab | false> {
        return await ResMgr.loadAsset<Prefab>(prefabPath, Prefab);
    }

    static async loadJson(jsonPath: string): Promise<JsonAsset | false> {
        return await ResMgr.loadAsset<JsonAsset>(jsonPath, JsonAsset);
    }

    static async loadDir<T extends Asset>(dir: string, progress?: Function): Promise<T[] | false> {
        return new Promise((resolve, reject) => {
            if (typeof dir != 'string' || dir.length === 0) {
                reject(false)
                return
            }
            resources.loadDir<T>(dir,
                (finished: number, total: number, item: AssetManager.RequestItem) => {
                    if (progress) {
                        progress(finished, total, item)
                    }
                },
                (err: Error, data: T[]) => {
                    if (err) {
                        reject(false)
                        return
                    }
                    resolve(data)
                })
        })
    }

    /**预加载资源 */
    static async preloadAsset<T extends Asset>(path: string, type?:new (...args: any[]) => T): Promise<void>{
        resources.preload(path, type, (err, data)=>{
            if(err){
                console.log(`预加载 ${path} 错误`, err)
            }else{
                console.log(`预加载 ${path} 完成`)
            }
        })
    }
}