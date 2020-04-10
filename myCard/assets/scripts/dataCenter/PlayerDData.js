// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        syncCallBack : {
            default : null,
            type : Function
        },

        //角色头像
        playerHeaderImg : {
            default : null,
            type : cc.SpriteFrame
        },

        //金钱
        playerMoney : {
            default : 0,
            type : cc.Integer
        },

        //等级
        playerLevel : {
            type : cc.Integer,
            get: function () {
                return this._playerLevel;
            },
            set: function (value) {
                if (this._playerLevel != value){
                    this._playerLevel = value;

                    this.playerHp = 50 + this._playerLevel * 50;
                    this.playerLevelExp = 100 + this._playerLevel * 100;
                }
            },
        },

        //血量
        playerHp : {
            default : 0,
            type : cc.Integer
        },

        //经验
        playerExp : {
            type: cc.Integer,
            get: function () {
                return this._playerExp;
            },
            set: function (value) {
                if (this._playerExp != value){
                    this._playerExp = value;

                    if (this._playerExp >= this.playerLevelExp){
                        this.playerLevel ++;
                        this._playerExp -= this.playerLevelExp
                    }
                }
            },
        },

        //升级要用的经验
        playerLevelExp : {
            default : 0,
            type : cc.Integer
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.getComponent("zdfGameData").removeLocalData('playerData');
        var playerData = JSON.parse(this.getComponent("zdfGameData").load2Local('playerData'));
        if (playerData){
            cc.log("有玩家数据");
            //设置角色内容
            var self = this;
            cc.loader.loadRes(playerData.playerHeaderImg,cc.SpriteFrame,function(err,image){
                self.playerHeaderImg = image;
                if (self.syncCallBack){
                    self.syncCallBack (self.playerHeaderImg);
                }
            });
            this.playerMoney = playerData.playerMoney;
            this.playerLevel = playerData.playerLevel;
            this.playerExp = playerData.playerExp;
        }else{
            cc.log("没有玩家数据");
            //初始化角色内容
            var self = this;
            cc.loader.loadRes("images/player1",cc.SpriteFrame,function(err,image){
                self.playerHeaderImg = image;
                self.syncCallBack (self.playerHeaderImg);
            });
            this.playerMoney = 0;
            this.playerLevel = 1;
            this.playerExp = 0;

            //写入本地数据中
            var playerDataLocal = {
                playerHeaderImg : "images/player1",
                playerMoney : this.playerMoney,
                playerLevel : this.playerLevel,
                playerExp : this.playerExp,
            };

            this.getComponent("zdfGameData").save2Local("playerData",JSON.stringify(playerDataLocal));
        }
    },

    start () {

    },

    // update (dt) {},
});
