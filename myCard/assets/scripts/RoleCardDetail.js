// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

RoleCardState = cc.Enum({
    Normal : 0,
    Selected : 1,
    Sure : 2
});

cc.Class({
    extends: cc.Component,

    properties: {
        roleImage: {
            default: null, 
            type: cc.Sprite
        },
        roleAttack:{
            default: null,
            type: cc.Label
        },
        state:{
            default: RoleCardState.Normal,
            type: RoleCardState
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    //初始化卡片内容
    initCard(sprite,attack){
        this.roleImage.spriteFrame = sprite;
        this.roleAttack.string = attack;
    },

    //点击的时候
    clickCard(){
        if (this.state == RoleCardState.Normal) {
            var roleCardsManager = cc.find("Canvas/RoleCards").getComponent("RoleCardsManager");
            roleCardsManager.resetCards2Normal();
            this.state = RoleCardState.Selected;
            return;
        }
        if (this.state == RoleCardState.Selected) {
            this.state = RoleCardState.Sure;

            //把内容传递到keng里面
            var node = cc.find("Canvas/Kengs");
            if (node.getComponent("KengsManager").setKengDataPlayer1(this)){
                this.node.destroy();
            }
            return;
        }
    },

});
