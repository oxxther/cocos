// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

MagicCardState = cc.Enum({
    Normal : 0,
    Selected : 1
});

cc.Class({
    extends: cc.Component,

    properties: {
        magicImage: {
            default: null, 
            type: cc.Sprite
        },
        magicAttack:{
            default: null,
            type: cc.Label
        },
        state:{
            default: MagicCardState.Normal,
            type: MagicCardState
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    //初始化卡片内容
    initCard(sprite,attack){
        this.magicImage.spriteFrame = sprite;
        this.magicAttack.string = attack;
    },

    //点击的时候
    clickCard(){
        cc.log(this.state);
        if (this.state == MagicCardState.Normal) {
            var magicCardsManager = cc.find("Canvas/MagicCards").getComponent("MagicCardsManager");
            magicCardsManager.resetCards2Normal();
            this.state = MagicCardState.Selected;

            //亮起提示框
            var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
            km.setKengCanClick();

            return;
        }
    },
});
