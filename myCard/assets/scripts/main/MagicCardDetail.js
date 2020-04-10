// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export var MagicCardState = cc.Enum({
    Normal : 0,
    Selected : 1
});

export var MagicCardDetail = cc.Class({
    extends: cc.Component,
    
    properties: {
        magicSImage:{
            default: null, 
            type: cc.Sprite
        },
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
    initCard(sprite,sprite1,attack){
        this.magicImage.spriteFrame = sprite;
        this.magicSImage.spriteFrame = sprite1;
        this.magicAttack.string = attack;
    },

    //点击的时候
    clickCard(){
        if (this.state == MagicCardState.Normal) {
            var magicCardsManager = cc.find("Canvas/MagicCards").getComponent("MagicCardsManager");
            magicCardsManager.resetCards2Normal();
            this.state = MagicCardState.Selected;

            //亮起提示框
            var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
            km.setKengCanClick(this);

            return;
        }
    },
});
