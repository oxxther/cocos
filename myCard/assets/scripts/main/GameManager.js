// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { RoleCardDetail } from "./RoleCardDetail";
import { MagicCardDetail } from "./MagicCardDetail";

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
        // this.initPlayer1();
        // this.initPlayer2();
        // this.initKengs();
        // this.initPlayer1RoleCards();
        // this.initPlayer1MagicCards();
        this.gameStart();
    },

    // update (dt) {},

    gameStart(){
        var self = this;

        var p1 = this.initPlayer1();
        var p2 = this.initPlayer2();
        
        var winw = cc.winSize.width;
        var winh = cc.winSize.height;
        var p11w = -winw / 2;
        var p12w = -p1.node.width;
        var p13h = -winh / 4;
        var p14h = -winh / 2 + p1.node.height / 2;
        cc.tween(p1.node).to(0,{position:cc.v2(p11w,0)})
        .to(0.25,{position:cc.v2(p12w,0)})
        .to(0.25,{position:cc.v2(p11w,p13h)})
        .to(0.25,{position:cc.v2(p12w,p14h)})
        .to(0.25,{position:cc.v2(p11w,p13h)})
        .call(()=>{
            p1.setOriginPositon();

            //初始化坑和角色牌
            self.initKengs();
            self.initPlayer1RoleCards();
        })
        .start();

        var p21w = winw / 2;
        var p22w = p2.node.width;
        var p23h = winh / 4;
        var p24h = winh / 2 - p2.node.height / 2;
        cc.tween(p2.node).to(0,{position:cc.v2(p21w,0)})
        .to(0.25,{position:cc.v2(p22w,0)})
        .to(0.25,{position:cc.v2(p21w,p23h)})
        .to(0.25,{position:cc.v2(p22w,p24h)})
        .to(0.25,{position:cc.v2(p21w,p23h)})
        .call(()=>{
            p2.setOriginPositon();
        })
        .start();

    },

    //初始化坑
    initKengs(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        km.initKengs();
    },

    //初始化我方角色
    initPlayer1(){
        var playerNode = cc.find("GameData").getComponent("PlayerDData");
        var p1 = cc.find("Canvas/Player1").getComponent("PlayerDetail");
        p1.roleImage.spriteFrame = playerNode.playerHeaderImg;
        p1.hp.string = playerNode.playerHp;
        return p1;
    },

    //初始化敌方角色
    initPlayer2(){
        var playerNode = cc.find("GameData").getComponent("zdfGameData");
        var p2 = cc.find("Canvas/Player2").getComponent("PlayerDetail");
        cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){
            p2.roleImage.spriteFrame = images;
            p2.hp.string = playerNode.gameLevel * 50 + 50;
        });
        return p2;
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
        var set = new Set();
        while(set.size < 3){
            set.add(Math.floor(Math.random()*7));
        }
        set = [...set];
        var playerNode = cc.find("GameData").getComponent("zdfGameData");

        this.scheduleOnce(()=>{
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            roleCard.roleSImage = cc.Sprite;
            
            var RoleCardDData = playerNode.roleCardData[set[0]];
            //创建sprite和attack
            cc.loader.loadRes(RoleCardDData.roleImg, cc.SpriteFrame, function (err, spriteFrame) {
                var path = RoleCardDData.roleImg.replace("sr/sr","roled/role");
                cc.loader.loadRes(path, cc.SpriteFrame,function(err, sf){
                    roleCard.roleImage.spriteFrame = spriteFrame;
                    roleCard.roleSImage.spriteFrame = sf;
                    roleCard.roleAttack.string = RoleCardDData.roleAttack.toString();

                    //把内容传递到keng里面
                    var node = cc.find("Canvas/Kengs");
                    node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
                });
            });
        },0.5);
        this.scheduleOnce(()=>{
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            roleCard.roleSImage = cc.Sprite;
            
            var RoleCardDData = playerNode.roleCardData[set[1]];
            //创建sprite和attack
            cc.loader.loadRes(RoleCardDData.roleImg, cc.SpriteFrame, function (err, spriteFrame) {
                var path = RoleCardDData.roleImg.replace("sr/sr","roled/role");
                cc.loader.loadRes(path, cc.SpriteFrame,function(err, sf){
                    roleCard.roleImage.spriteFrame = spriteFrame;
                    roleCard.roleSImage.spriteFrame = sf;
                    roleCard.roleAttack.string = RoleCardDData.roleAttack.toString();

                    //把内容传递到keng里面
                    var node = cc.find("Canvas/Kengs");
                    node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
                });
            });

        },1.25);
        this.scheduleOnce(()=>{
            var self = this;
            var roleCard = new RoleCardDetail();
            roleCard.roleAttack = cc.Label;
            roleCard.roleImage = cc.Sprite;
            roleCard.roleSImage = cc.Sprite;
            
            var RoleCardDData = playerNode.roleCardData[set[2]];
            //创建sprite和attack
            cc.loader.loadRes(RoleCardDData.roleImg, cc.SpriteFrame, function (err, spriteFrame) {
                var path = RoleCardDData.roleImg.replace("sr/sr","roled/role");
                cc.loader.loadRes(path, cc.SpriteFrame,function(err, sf){
                    roleCard.roleImage.spriteFrame = spriteFrame;
                    roleCard.roleSImage.spriteFrame = sf;
                    roleCard.roleAttack.string = RoleCardDData.roleAttack.toString();

                    //把内容传递到keng里面
                    var node = cc.find("Canvas/Kengs");
                    node.getComponent("KengsManager").setKengDataPlayer2(roleCard);
                });
            });

        },2);
    },

    //初始化敌方魔法卡
    initPlayer2MagicCards(){
        var index = Math.floor(Math.random()*5);
        var playerNode = cc.find("GameData").getComponent("zdfGameData");
        cc.log("进入敌方魔法卡选择");
        this.scheduleOnce(()=>{
            var self = this;
            var magicCardDetail = new MagicCardDetail();
            magicCardDetail.magicAttack = cc.Label;
            magicCardDetail.magicImage = cc.Sprite;
            magicCardDetail.magicSImage = cc.Sprite;

            MagicCardDData = playerNode.magicCardData[index];
            cc.loader.loadRes(MagicCardDData.magicImg,cc.SpriteFrame,function(error,spriteFrame){
                var path = MagicCardDData.magicImg.replace("sm/sm","magicd/magic");
                cc.loader.loadRes(path, cc.SpriteFrame,function(err, sf){
                    magicCardDetail.magicImage.spriteFrame = spriteFrame;
                    magicCardDetail.magicSImage.spriteFrame = sf;
                    magicCardDetail.magicAttack.string = MagicCardDData.magicAttack.toString();

                    var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
                    km.setKengCanClick(magicCardDetail);
                });
            });

        },0.75);

        this.scheduleOnce(()=>{

            var self = this;
            var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
            var index = Math.floor(Math.random()*3);
            var keng = km.kengs[index].getComponent("KengDetail");
            km.setKengCannotClick();
            km.countAttack(keng);

        },1);

        //进入结算阶段
        this.scheduleOnce(()=>{
            //调用结算
            this.enter2DuelState();
        },1.5);
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
    },

    //进入结算阶段
    enter2DuelState(){

        var self = this;

        //开启碰撞检测？
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        var kd0 = parseInt(km.kengs[0].getComponent("KengDetail").roleAttack.string);
        var kd1 = parseInt(km.kengs[1].getComponent("KengDetail").roleAttack.string);
        var kd2 = parseInt(km.kengs[2].getComponent("KengDetail").roleAttack.string);
        var kd3 = parseInt(km.kengs[3].getComponent("KengDetail").roleAttack.string);
        var kd4 = parseInt(km.kengs[4].getComponent("KengDetail").roleAttack.string);
        var kd5 = parseInt(km.kengs[5].getComponent("KengDetail").roleAttack.string);
        var duration1 = kd0 == kd3 ? 1.5 : 2.5;
        var duration2 = kd1 == kd4 ? 1.5 : 2.5;
        var duration3 = kd2 == kd5 ? 1.5 : 2.5;

        //挪动角色卡
        var winh = cc.winSize.height;
        var player1 = cc.find("Canvas/Player1");
        cc.tween(player1).to(0.5,{position:cc.v2(-100,-winh/2+125)}).start();
        var player2 = cc.find("Canvas/Player2");
        var animate = cc.tween(player2).to(0.5,{position:cc.v2(100,winh/2-125)}).call(()=>{
            //第一阶段动画
            this.startDuelStateOne();
        }).delay(duration1).call(()=>{
            if (self.shouldEndRound()){
                animate.stop();
                return;
            }
            //第二阶段动画
            this.startDuelStateTwo();
        }).delay(duration2).call(()=>{
            if (self.shouldEndRound()){
                animate.stop();
                return;
            }
            //第三阶段动画
            this.startDuelStateThree();
        }).delay(duration3).call(()=>{
            //判断是否进入新一轮
            cc.log("是否进入新一轮");
            if (self.shouldEndRound()){
                animate.stop();
                return;
            }

            //这里是要进入新的一轮
            //移回原位置后
            var p1 = cc.find("Canvas/Player1").getComponent("PlayerDetail");
            var p2 = cc.find("Canvas/Player2").getComponent("PlayerDetail");
            cc.tween(p1.node).to(0.5,{position:p1.getOriginPositon()}).start();
            cc.tween(p2.node).to(0.5,{position:p2.getOriginPositon()}).call(()=>{
                //重置坑和角色卡
                var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
                km.resetKengs();

                self.initPlayer1RoleCards();

            }).start();

        }).start();
    },

    startDuelStateOne(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        var km0 = km.kengs[0];
        var action0 = cc.moveBy(0.5, 0, -100);
        km0.runAction(action0);

        var km3 = km.kengs[3];
        var action3 = cc.moveBy(0.5, 0, 100);
        km3.runAction(action3);
    },

    startDuelStateTwo(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        var km1 = km.kengs[1];
        var action1 = cc.moveBy(0.5, 0, -100);
        km1.runAction(action1);

        var km4 = km.kengs[4];
        var action4 = cc.moveBy(0.5, 0, 100);
        km4.runAction(action4);
    },

    startDuelStateThree(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        var km2 = km.kengs[2];
        var action2 = cc.moveBy(0.5, 0, -100);
        km2.runAction(action2);

        var km5 = km.kengs[5];
        var action5 = cc.moveBy(1, 0, 100);
        km5.runAction(action5);
    },

    shouldEndRound(){
        var p1 = cc.find("Canvas/Player1").getComponent("PlayerDetail");
        var p2 = cc.find("Canvas/Player2").getComponent("PlayerDetail");
        if (parseInt(p1.hp.string) == 0){
            //进入输的界面
            return true;
        }
        if (parseInt(p2.hp.string) == 0){
            //进入赢的界面
            return true;
        }
        return false;
    },
});
