// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ShopRoleCardState } from "./ShopRoleCard";
import { ShopMagicCardState } from "./ShopMagicCard";

cc.Class({
    extends: cc.Component,

    properties: {
        roleShopPage:{
            default:null,
            type:cc.Node
        },
        magicShopPage:{
            default:null,
            type:cc.Node
        },
        roleCardList:{
            default:[],
            type:[cc.Node]
        },
        magicCardList:{
            default:[],
            type:[cc.Node]
        },
        roleCV:{
            default:null,
            type:cc.Node
        },
        _currentRC:{
            default:null,
            type:cc.Node
        },
        _currentMC:{
            default:null,
            type:cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var gd = cc.find("GameData").getComponent("zdfGameData");
        cc.log(gd.gameShopFlag);
        if (gd.gameShopFlag == 0){
            this.roleShopPage.active = true;
            this.magicShopPage.active = false;
        }
        if (gd.gameShopFlag == 1){
            this.roleShopPage.active = false;
            this.magicShopPage.active = true;
        }

        //初始化所有卡片
        var self = this;
        for (let index = 0; index < gd.roleCardData.length; index++) {
            const element = gd.roleCardData[index];
            cc.loader.loadRes("prefabs/roleCard2",function(err,prefab){
                var roleCard2 = cc.instantiate(prefab);
                self.roleCardList.push(roleCard2);
                if (index < 5){
                    roleCard2.position = cc.v2(-440 + 220 * index,10);
                }else{
                    roleCard2.position = cc.v2(-440 + 220 * (index%5),-10);
                    roleCard2.anchorY = 1;
                }
                roleCard2.parent = self.roleShopPage;
                var src = roleCard2.getComponent("ShopRoleCard");
                src.roleData = element;
                cc.loader.loadRes(element.roleImg,cc.SpriteFrame,function(err,sf){
                    src.roleHeaderImg.spriteFrame = sf;
                });
                src.roleAttackText.string = element.roleAttack.toString();
                src.roleMoneyText.string = element.roleUpMoney.toString();
            });
        }

        //初始化所有卡片
        var self = this;
        for (let index = 0; index < gd.magicCardData.length; index++) {
            const element = gd.magicCardData[index];
            cc.loader.loadRes("prefabs/magicCard2",function(err,prefab){
                var magicCard2 = cc.instantiate(prefab);
                self.magicCardList.push(magicCard2);
                if (index < 5){
                    magicCard2.position = cc.v2(-440 + 220 * index,10);
                }else{
                    magicCard2.position = cc.v2(-440 + 220 * (index%5),-10);
                    magicCard2.anchorY = 1;
                }
                magicCard2.parent = self.magicShopPage;
                var smc = magicCard2.getComponent("ShopMagicCard");
                smc.magicData = element;
                cc.loader.loadRes(element.magicImg,cc.SpriteFrame,function(err,sf){
                    smc.magicHeaderImg.spriteFrame = sf;
                });
                smc.magicAttackText.string = element.magicAttack.toString();
                smc.magicMoneyText.string = element.magicUpMoney.toString();
            });
        }

    },

    // update (dt) {},

    click2ShowCV(){
        this.Node.active = true;
    },

    back2Begin(){
        cc.director.loadScene("zdfGameBegin");
    },

    resetRoleCardState(){
        this.roleCardList.forEach(element => {
            element.getComponent("ShopRoleCard").rcState = ShopRoleCardState.Normal;
        });
    },
    
    resetMagicCardState(){
        this.magicCardList.forEach(element => {
            element.getComponent("ShopMagicCard").mcState = ShopMagicCardState.Normal;
        });
    },

    upRoleCardData(index,shopRoleCard){
        cc.log(index);
        this._currentRC = shopRoleCard;
    },

    upMagicCardData(index,shopMagicCard){
        cc.log(index);
        this._currentMC = shopMagicCard;
    },

    click2Uprc(){
        var rolec = this._currentRC.getComponent("ShopRoleCard").roleData;
        rolec.roleAttack += 10;
        rolec.roleUpMoney += 100;
    },

    click2Upmc(){
        var magicc = this._currentMC.getComponent("ShopMagicCard").magicData;
        magicc.magicAttack += 10;
        magicc.magicUpMoney += 100;
    },
});
