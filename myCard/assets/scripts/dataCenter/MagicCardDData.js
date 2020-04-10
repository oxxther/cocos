// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        magicImg : {
            default : [],
            type : cc.String
        },

        magicAttack : {
            default : [],
            type : cc.String
        },

        magicUpMoney : {
            default : 0,
            type : cc.Integer
        },
        
        magicLock : {
            default : [],
            type : cc.Boolean
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
