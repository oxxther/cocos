// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    // update (dt) {},

    //初始化卡牌
    initCards(){
        cc.log("初始化魔法卡");
        var node = this.node;
        for (let index = 0; index < 4; index++) {
            cc.loader.loadRes('prefabs/magicCard1', function (err, prefab) {
                var magicCard1 = cc.instantiate(prefab);
                magicCard1.parent = node;
                magicCard1.x = -450 + index * 300;
                var mcd = magicCard1.getComponent("MagicCardDetail");
                //创建sprite和attack
                cc.loader.loadRes('images/player2', cc.SpriteFrame, function (err, spriteFrame) {
                    mcd.initCard(spriteFrame,"22");
                });
            });
        }
    },

    resetCards2Normal(){
        var magicCards = this.node.children;
        magicCards.forEach(element => {
            element.getComponent("MagicCardDetail").state = MagicCardState.Normal;
        });
    },

    removeCards(){
        var magicCards = this.node.children;
        magicCards.forEach(element => {
            element.destroy();
        });
    }

});
