// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var RoleCardDetail = require("RoleCardDetail");

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
        this.initPlayer1();
        this.initPlayer2();
        this.initPlayer1RoleCards();
        // this.initPlayer1MagicCards();
    },

    // update (dt) {},

    //初始化我方角色
    initPlayer1(){
        var p1 = cc.find("Canvas/Player1").getComponent("PlayerDetail");
        cc.loader.loadRes("images/player1",cc.SpriteFrame,function(error,images){
            p1.roleImage.spriteFrame = images;
            p1.hp.string = "200";
        });
    },

    //初始化敌方角色
    initPlayer2(){
        var p2 = cc.find("Canvas/Player2").getComponent("PlayerDetail");
        cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){
            p2.roleImage.spriteFrame = images;
            p2.hp.string = "200";
        });
    },

    //初始化我方角色卡
    initPlayer1RoleCards(){
        var p1r = cc.find("Canvas/RoleCards").getComponent("RoleCardsManager");
        p1r.initCards();
    },

    //初始化我方魔法卡
    initPlayer1MagicCards(){
        var p1m = cc.find("Canvas/MagicCards").getComponent("MagicCardsManager");
        p1m.initCards();
    },

    //初始化敌方角色卡
    initPlayer2RoleCards(){
        this.scheduleOnce(()=>{
            cc.log("1");
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){
                roleCard.roleImage.spriteFrame = images;
                roleCard.roleAttack.string = "33";

                //把内容传递到keng里面
                var node = cc.find("Canvas/Kengs");
                node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
            });

        },0.5);
        this.scheduleOnce(()=>{
            cc.log("2");
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){
                roleCard.roleImage.spriteFrame = images;
                roleCard.roleAttack.string = "33";

                //把内容传递到keng里面
                var node = cc.find("Canvas/Kengs");
                node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
            });

        },1.25);
        this.scheduleOnce(()=>{
            cc.log("3");
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){
                roleCard.roleImage.spriteFrame = images;
                roleCard.roleAttack.string = "33";

                //把内容传递到keng里面
                var node = cc.find("Canvas/Kengs");
                node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
            });

        },2);
    },

    //初始化敌方魔法卡
    initPlayer2MagicCards(){

    },

    //进入了敌方选卡流程
    enter2Player2SelectedRoleCards(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        if (km.player1Index == 6){
            km.player1Index = 3;

            var p1r = cc.find("Canvas/RoleCards").getComponent("RoleCardsManager");
            p1r.removeCards();
            
            //进入敌方选卡流程
            this.initPlayer2RoleCards();
        }
    },

    //进入我方魔法卡选择
    enter2Player1SelectedMagicCards(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        if (km.player2Index == 3){
            km.player2Index = 0;

            this.initPlayer1MagicCards();
        }
    }

});
