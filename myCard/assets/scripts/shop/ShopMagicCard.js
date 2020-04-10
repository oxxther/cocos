// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var MagicCardDData = require("../dataCenter/MagicCardDData");

export var ShopMagicCardState = cc.Enum({
    Normal : 0,
    Selected : 1,
});

export var ShopMagicCard = cc.Class({
    extends: cc.Component,

    properties: {
        mcState:{
            default:ShopMagicCardState.Normal,
            type:ShopMagicCardState
        },
        magicHeaderImg : {
            default : null,
            type : cc.Sprite
        },
        magicAttackText : {
            default : null,
            type : cc.Label
        },
        magicMoneyText : {
            default : null,
            type : cc.Label
        },
        magicData:{
            default : null,
            type : MagicCardDData
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.magicAttackText.string = this.magicData.magicAttack.toString();
        this.magicMoneyText.string = this.magicData.magicUpMoney.toString();
    },

    clickMagicCard(){
        cc.log("点击了膜法卡");
        var sm = cc.find("Canvas").getComponent("zdfShopManager");
        sm.resetMagicCardState();
        this.mcState = ShopMagicCardState.Selected;
        var index = sm.magicCardList.indexOf(this.node);
        sm.upMagicCardData(index,this);
    },
});
