import { _decorator, Component, view, screen, UITransform } from 'cc';
const { ccclass } = _decorator;

/**
 * 用于适配界面无黑边、不拉伸、背景可能被裁的分辨率方案的组件
 */
@ccclass('CropedArea')
export class CropedArea extends Component {
    onLoad() {
        let designSize = view.getDesignResolutionSize()
        let windowSize = screen.windowSize

        let designAspectRatio = designSize.width / designSize.height
        //console.log('设计宽高比', designAspectRatio)
        let windowAspectRatio = windowSize.width / windowSize.height
        //console.log('窗口宽高比', windowAspectRatio)

        if(Math.abs(designAspectRatio - windowAspectRatio) > 0.002){
            let tsfm = this.getComponent(UITransform)
            if(!tsfm){
                tsfm = this.addComponent(UITransform)
            }
            if(windowAspectRatio > designAspectRatio){
                //上下被裁，调整高度
                let cropedHeight = designSize.width / windowAspectRatio
                //console.log('cropedHeight', cropedHeight)
                tsfm.setContentSize(designSize.width, cropedHeight)
            }else{
                //左右被裁，调整宽度
                let cropedWidth = designSize.height * windowAspectRatio
                //console.log('cropedWidth', cropedWidth)
                tsfm.setContentSize(cropedWidth, designSize.height)
            }
        }
    }

}