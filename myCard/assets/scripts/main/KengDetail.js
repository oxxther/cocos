// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        roleImage: {
            default: null, 
            type: cc.Sprite
        },
        roleAttack:{
            default: null,
            type: cc.Label
        },
        animateImage:{
            default: null, 
            type: cc.Node
        },
        tipsImage:{
            default: null, 
            type: cc.Sprite
        },
        animateSkillImage:{
            default: null, 
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    initKeng(){
        //按钮不能点击
        var btn = this.getComponent(cc.Button);
        btn.interactable = false;
        this.animateImage.active = false;
        this.tipsImage.node.active = false;
        this.animateSkillImage.active = false;
    },

    setupKeng(sprite,attack){
        this.animateImage.active = true;

        this.roleImage.spriteFrame = sprite;
        this.roleAttack.string = attack;

        cc.tween(this.animateImage).to(0,{scale:1.5}).to(0.5,{scale:1}).call(() => {

            //动画播完后你要做的事
            //进入敌方选卡
            var gm = cc.find("Canvas").getComponent("GameManager");
            gm.enter2Player2SelectedRoleCards();
            gm.enter2Player1SelectedMagicCards();

        }).start();

    },

    kengClick(){
        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
        km.setKengCannotClick();
        km.countAttack(this);

        var p1m = cc.find("Canvas/MagicCards").getComponent("MagicCardsManager");
        p1m.removeCards();

        //进入敌方选魔法卡
        var gm = cc.find("Canvas").getComponent("GameManager");
        gm.initPlayer2MagicCards();
        
    },

    //碰撞检测
    onCollisionEnter: function (other, self) {

        cc.log("碰撞发生");

        self.node.stopAllActions();

        var shake = cc.find("Canvas/Main\ Camera").getComponent("ZDFShake");

        var player1 = cc.find("Canvas/Player1");
        var player2 = cc.find("Canvas/Player2");
        var finish = null;

        if (other.node != player1 && other.node != player2){
            finish = function(){
                if (other.node.active && self.node.active){
                    cc.log("控制消失");

                    var current = null;

                    var selfkd = self.getComponent("KengDetail");
                    var otherkd = other.getComponent("KengDetail");
                    var self_attack = parseInt(selfkd.roleAttack.string);
                    var other_attack = parseInt(otherkd.roleAttack.string);
                    if (self_attack < other_attack){
                        self.node.active = false;
                        current = other;
                    }else if(self_attack == other_attack){
                        self.node.active = false;
                        other.node.active = false;
                    }else{
                        other.node.active = false;
                        current = self;
                    }

                    if (current){
                        var km = cc.find("Canvas/Kengs").getComponent("KengsManager");
                        var index = km.kengs.indexOf(current.node);
                        var groupName = index < 3 ? "Player1":"Player2";
                        var forwardY = index < 3 ? -450:450;

                        var y = current.node.y;
                        cc.tween(current.node).to(0.25,{position:cc.v2(0,y)}).call(()=>{
                            current.node.group = groupName;
                        }).by(0.5,{position:cc.v2(0,forwardY)})
                        .start();
                    }
                }
            };
        }else{
            finish = function(){
                var kd = self.getComponent("KengDetail");
                var hurt = parseInt(kd.roleAttack.string);

                cc.log(hurt);
                //把自身消除，结算生命值
                self.node.active = false;

                var hp = other.getComponent("PlayerDetail").hp;
                var nowHp = parseInt(hp.string) - hurt;
                nowHp = nowHp <= 0 ? 0 : nowHp;
                other.getComponent("PlayerDetail").hp.string = nowHp.toString();
            };
        }

        shake.shakeAnimation(finish);
    },
});
