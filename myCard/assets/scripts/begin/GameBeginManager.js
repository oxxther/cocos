// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        playerHeaderSprite:{
            default : null,
            type : cc.Sprite
        },
        playerHpText:{
            default : null,
            type : cc.Label
        },
        playerMoneyText:{
            default : null,
            type : cc.Label
        },
        playerLevelText:{
            default : null,
            type : cc.Label
        },
        playerExpText:{
            default : null,
            type : cc.Label
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //初始化常驻节点
        var myNode = cc.find("GameData");
        cc.game.addPersistRootNode(myNode);
    },

    start () {
        var playerNode = cc.find("GameData").getComponent("PlayerDData");

        //设置图片
        var self = this;
        var setImage = function (spriteFrame){
            self.playerHeaderSprite.spriteFrame = spriteFrame;
        };
        playerNode.syncCallBack = setImage;

        this.playerHeaderSprite.spriteFrame = playerNode.playerHeaderImg;
        this.playerHpText.string = playerNode.playerHp.toString();
        this.playerMoneyText.string = playerNode.playerMoney.toString();
        this.playerLevelText.string = playerNode.playerLevel.toString();
        this.playerExpText.string = playerNode.playerExp + "/" + playerNode.playerLevelExp;
    },

    // update (dt) {},

    zdfJump2GameLevel(){
        cc.director.loadScene("zdfGameLevel");
    },

    zdfJump2GameShop(event, flag){
        var gd = cc.find("GameData").getComponent("zdfGameData");
        gd.gameShopFlag = flag;
        cc.director.loadScene("zdfGameShop");
    },


});
