// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        shakeStrength:{
            default:0,
            type:cc.Integer
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    shakeAnimation(finish){
        var self = this;
        cc.tween(this.node)
        .to(0.1,{position:cc.v2(this.createShakeNum(self.shakeStrength),this.createShakeNum(self.shakeStrength))})
        .to(0.1,{position:cc.v2(this.createShakeNum(self.shakeStrength),this.createShakeNum(self.shakeStrength))})
        .to(0.1,{position:cc.v2(this.createShakeNum(self.shakeStrength),this.createShakeNum(self.shakeStrength))})
        .to(0.1,{position:cc.v2(this.createShakeNum(self.shakeStrength),this.createShakeNum(self.shakeStrength))})
        .to(0.1,{position:cc.v2(0,0)})
        .call(finish)
        .start();
    },

    createShakeNum(shakeStrength){
        var Range = shakeStrength * 2;
        var Rand = Math.random();
        var num = 0 - shakeStrength + Math.round(Rand * Range); //四舍五入
        return num
    },

});
