// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        player1Index : 3,
        player2Index : 0,
        
        kengs: {
            default: [],
            type: [cc.Node]
        },
    },

    // onLoad () {},

    start () {
    
    },

    // update (dt) {},

    setKengDataPlayer1(roleCardDetail){
        var node = this.kengs[this.player1Index];
        if (node){
            node.getComponent("KengDetail").initKeng(roleCardDetail.roleImage.spriteFrame,roleCardDetail.roleAttack.string);
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
            node.getComponent("KengDetail").initKeng(roleCardDetail.roleImage.spriteFrame,roleCardDetail.roleAttack.string);
            //下标+1
            this.player2Index++;
            return true;
        }
        return false;
    },

    setKengCanClick(){
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

});
