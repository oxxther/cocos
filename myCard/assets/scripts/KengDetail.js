// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        animateImage:{
            default: null, 
            type: cc.Node
        },
        tipsImage:{
            default: null, 
            type: cc.Sprite
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    initKeng(sprite,attack){

        this.roleImage.spriteFrame = sprite;
        this.roleAttack.string = attack;

        this.animateImage.setScale(1.5,1.5);
        cc.tween(this.animateImage).to(0,{scale:1.5}).to(0.5,{scale:1}).call(() => {

            //动画播完后你要做的事
            //进入敌方选卡
            var gm = cc.find("Canvas").getComponent("GameManager");
            gm.enter2Player2SelectedRoleCards();
            gm.enter2Player1SelectedMagicCards();
        }).start();

    },

    kengClick(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        km.setKengCannotClick();
    }
});
