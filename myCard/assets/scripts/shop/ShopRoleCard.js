// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var RoleCardDData = require("../dataCenter/RoleCardDData");

export var ShopRoleCardState = cc.Enum({
    Normal : 0,
    Selected : 1,
});

export var ShopRoleCard = cc.Class({
    extends: cc.Component,

    properties: {
        rcState:{
            default:ShopRoleCardState.Normal,
            type:ShopRoleCardState
        },
        roleHeaderImg : {
            default : null,
            type : cc.Sprite
        },
        roleAttackText : {
            default : null,
            type : cc.Label
        },
        roleMoneyText : {
            default : null,
            type : cc.Label
        },
        roleData:{
            default : null,
            type : RoleCardDData
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        this.roleAttackText.string = this.roleData.roleAttack.toString();
        this.roleMoneyText.string = this.roleData.roleUpMoney.toString();
    },
    
    clickRoleCard(){
        cc.log("点击了橘色卡");
        var sm = cc.find("Canvas").getComponent("zdfShopManager");
        sm.resetRoleCardState();
        this.rcState = ShopRoleCardState.Selected;
        var index = sm.roleCardList.indexOf(this.node);
        sm.upRoleCardData(index,this);
    },
});
