// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { RoleCardState } from "./RoleCardDetail";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
       
    },

    // update (dt) {},

    //初始化卡牌
    initCards(){

        //随机取出4个下标
        var set = new Set();
        while(set.size < 4){
            set.add(Math.floor(Math.random()*5));
        }

        var node = this.node;
        var playerNode = cc.find("GameData").getComponent("zdfGameData");
        var i = 0;
        set.forEach((index) => {
            var RoleCardDData = playerNode.roleCardData[index];
            cc.loader.loadRes('prefabs/roleCard1', function (err, prefab) {
                var roleCard1 = cc.instantiate(prefab);
                roleCard1.parent = node;
                roleCard1.x = -450 + i * 300;
                i ++;
                var rcd = roleCard1.getComponent("RoleCardDetail");
                //创建sprite和attack
                cc.loader.loadRes(RoleCardDData.roleImg, cc.SpriteFrame, function (err, spriteFrame) {
                    var path = RoleCardDData.roleImg.replace("sr/sr","roled/role");
                    cc.loader.loadRes(path, cc.SpriteFrame,function(err, sf){
                        rcd.initCard(spriteFrame,sf,RoleCardDData.roleAttack.toString());
                    });
                });
                
            });
        });

    },

    resetCards2Normal(){
        var roleCards = this.node.children;
        roleCards.forEach(element => {
            element.getComponent("RoleCardDetail").state = RoleCardState.Normal;
        });
    },

    removeCards(){
        var roleCards = this.node.children;
        roleCards.forEach(element => {
            element.destroy();
        });
    }

});


