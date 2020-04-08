// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

        _oposition : {
            default : null,
            type : cc.v3
        },

        roleImage : {
            default: null,
            type: cc.Sprite
        },
        hp : {
            default: null,
            type: cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this._oposition = this.node.position;
    },

    // update (dt) {},

    setOriginPositon(){
        this._oposition = this.node.position;
    },

    getOriginPositon(){
        return this._oposition;
    },

});
