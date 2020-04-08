// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var MagicCardDetail = require("MagicCardDetail");

cc.Class({
    extends: cc.Component,

    properties: {
        player1Index : 3,
        player2Index : 0,
        
        _currentMagicCardDetail : {
            default : null,
            type : MagicCardDetail
        },

        _kengsPosition:{
            default: [],
            type: [cc.v3]
        },

        _kengsGroup:{
            default: [],
            type: [cc.string]
        },

        kengs: {
            default: [],
            type: [cc.Node]
        },
    },

    // onLoad () {},

    start () {
        
    },

    // update (dt) {},

    initKengs(){
        this.kengs.forEach(element => {
            //坑中内容不显示
            element.active = true;
            var kd = element.getComponent("KengDetail");
            kd.initKeng();

            this._kengsPosition.push(element.position);
            this._kengsGroup.push(element.group);
        });
    },

    resetKengs(){
        cc.log("重新设置卡牌");
        for (let index = 0; index < this.kengs.length; index++) {
            var keng = this.kengs[index];
            keng.active = true;
            var kd = keng.getComponent("KengDetail");
            kd.initKeng();
            kd.unscheduleAllCallbacks();
            keng.position = this._kengsPosition[index];
            keng.group = this._kengsGroup[index];
        }
    },

    setKengDataPlayer1(roleCardDetail){
        var node = this.kengs[this.player1Index];
        if (node){
            node.getComponent("KengDetail").setupKeng(roleCardDetail.roleImage.spriteFrame,roleCardDetail.roleAttack.string);
            //下标+1
            this.player1Index++;
            return true;
        }
        return false;
    },

    setKengDataPlayer2(roleCardDetail){
        if (this.player2Index > 2){
            return;
        }

        var node = this.kengs[this.player2Index];
        if (node){
            node.getComponent("KengDetail").setupKeng(roleCardDetail.roleImage.spriteFrame,roleCardDetail.roleAttack.string);
            //下标+1
            this.player2Index++;
            return true;
        }
        return false;
    },

    setKengCanClick(magicCardDetail){
        this._currentMagicCardDetail = magicCardDetail;
        this.kengs.forEach(element => {
            var btn = element.getComponent(cc.Button);
            btn.interactable = true;
            var kd = element.getComponent("KengDetail");
            kd.tipsImage.node.active = true;
        });
    },

    setKengCannotClick(){
        this.kengs.forEach(element => {
            var btn = element.getComponent(cc.Button);
            btn.interactable = false;
            var kd = element.getComponent("KengDetail");
            kd.tipsImage.node.active = false;
        });
    },

    countAttack(kengDetail){
        kengDetail.animateSkillImage.active = true;
        var cmcd = this._currentMagicCardDetail;
        cc.loader.loadRes("images/player2",cc.SpriteFrame,function(error,images){

            var sprite = kengDetail.animateSkillImage.getComponent(cc.Sprite);
            sprite.spriteFrame = images;
            var attack = parseInt(kengDetail.roleAttack.string);
            attack += parseInt(cmcd.magicAttack.string);
            kengDetail.roleAttack.string = attack + "";

            cc.tween(kengDetail.animateSkillImage).to(0,{scale:1.5}).to(0.5,{scale:1}).call(() => {
                kengDetail.animateSkillImage.active = false;
            }).start();
        });
    },

});
