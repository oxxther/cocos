// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var PlayerDData = require("./PlayerDData");
var RoleCardDData = require("./RoleCardDData");
var MagicCardDData = require("./MagicCardDData");

cc.Class({
    extends: cc.Component,

    properties: {
        //这个是进入购物的标志
        gameShopFlag : {
            default : 0,
            type : cc.Integer
        },

        //这个是记录要进入的关卡数
        gameLevel:{
            default : 0,
            type : cc.Integer
        },

        playerData:{
            default : null,
            type : PlayerDData
        },

        roleCardData:{
            default:[],
            type : [RoleCardDData]
        },

        magicCardData:{
            default:[],
            type : [MagicCardDData]
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        //获取玩家信息
        this.playerData = this.getComponent("PlayerDData");
        //创建橘色卡(有可能涉及到数据读取)
        for (let i = 0; i < 10; i++) {
            var rcd = new RoleCardDData();
            rcd.roleAttack = 10 + 10 * i;
            rcd.roleUpMoney = 1000;
            rcd.roleImg = "images/sr/sr" + i; //images/sr/sr0  --> images/roled/role0
            if (i < 5){
                rcd.roleLock = true;
            }else{
                rcd.roleLock = false;
            }
            this.roleCardData.push(rcd);
        }

        //创建莫法卡
        for (let i = 0; i < 10; i++) {
            var mcd = new MagicCardDData();
            mcd.magicAttack = 10 + 10 * i;
            mcd.magicUpMoney = 1000;
            mcd.magicImg = "images/sm/sm" + i;
            if (i < 5){
                mcd.magicLock = true;
            }else{
                mcd.magicLock = false;
            }
            this.magicCardData.push(mcd);
        }
        
        cc.log(this.magicCardData.length);
    },

    // update (dt) {},

    save2Local(key,value){
        cc.sys.localStorage.setItem(key, value);
    },

    load2Local(key){
        return cc.sys.localStorage.getItem(key);
    },

    removeLocalData(key){
        cc.sys.localStorage.removeItem(key);
    },

});
