namespace helpers {
    export type I18nFactory = (name:string) => string

    export function getI18nStringByName(name: string) {
        return helpers._getFactoryInstance("i18n", name)
    }
}

namespace i18n {

    export let locale:string = "zh_CN"

    //% helper=getI18nStringByName
    //% pyConvertToTaggedTemplate
    export function i18nstr(lits: any, ...args: any[]) :string{
        return null
    }
    helpers._registerFactory("i18n", function (name: string) {
        if (locale == "zh_CN") {
            return name
        }


        switch (helpers.stringTrim(name)) {

            case "马克":return "Mark";
            case "大雄":return "Nobita";
            case "乔治":return "George";
            case "柯南":return "Conan";
            case "勇者":return "The One";
            case "到我跟前来...": return "Come closer...";
            case "告诉我你的名字": return "Tell me your name";
            case "这世界面临灾难...": return "Calamity is coming...";
            case "你愿意和我建立灵魂链接吗？":return "Tie your soul with me?"
            case "愿意":return "Yes"
            case "不愿意":return "No"
            case "等待合适的时机吧": return "Wait for the right time."
            case "取得锈剑": return "Found a rusty sword"
            case "又是这个梦": return "This dream again"
            case "每次说了愿意又要我等":return "Everytime I said yes, it asked me to wait"
            case "下次就说不愿意好了": return "I shall try NO next time"
            case "每次说了不愿意就不说话": return "Everytime I said no, it said nothing"
            case "下次就说愿意好了": return "I shall try YES next time"
            case "你快过来看": return "Come and look"
            case ",你看": return ", look"
            case "雪融了": return "Snow is melted"
            case "左:观景台\n右:下山": return "L:View point\nR:Downhill"
            case "把衣柜里的武器带上吧": return "should take the sword in wardrobe.."
            case "啊" : return "Ah"
            case "现在还是先别下山吧" : return "Not now."
            case "魔王大人...": return "The lord..."
            case "手无寸铁的小子": return "an empty-handed kid..."
            case "去死吧": return "DIE"
            case "啊...": return "Ahhhhhh"
            case "谁让你那时候说不愿意" : return "Said you are not willing to bind, "
            case "你有能力对抗魔王吗" : return "So face the evil by yourself. "
            case "不自量力的家伙": return "..."
            case "只能等待下一个天选之人了": return "Have to wait for the next one."
            case "邪恶法师召唤的火球从天而降": return "Evil wizard summons a fireball"
            case "无法动弹": return " can not move"
            case "完了...": return "I'm done."
            case "就在": return "Just about "
            case "即将失去意识之际": return " to pass out."
            case "包里的锈剑闪出光芒": return "Dazzling light bursts out from the rusty sword."
            case "时候到了..." : return "Time has come."
            case "和我建立连接吧..." : return "Bind your soul with me."
            case "到了生死关头": return "At critical moment,"
            case "按A就可以使用我的力量": return "Press A to use my power."
            case "试一下吧":return "give it a try"
            case "不可能...":return "no way..."
            case "要告诉...": return "must inform..."
            case "呼呼呼...": return "phew..."
            case "真够危险的...": return "so close..."
            case "刚才是?": return "that was?"
            case "，你怎么倒在这里了...":return ", what happened?"
            case "村长将" : return "The chief carries "
            case "带回了家" : return " home."
            case "这届勇者好难带": return "YOU FOOL"
            case "不是说了按A吗？": return "PRESS A TO WIELD MY POWER!"
            case "按啊!!!": return "JUST PRESS!!!"
            case "按了你就无敌了": return "AND YOU ARE INVINCIBLE"
            case "新王要来了": return "THE new Lord is coming"
            case "大人苏醒了": return "Master is awakening"
            case "魔族的大日子": return "Big day for us"
            case "来吧，黑暗": return "Come, darkness"
            case "接下来就是最终决战了": return "It will be the final batle, "
            case "一旦开始不能回头": return "and no turning back after this point"
            case "准备好了" : return "I'm ready"
            case "还是再看看" : return "Maybe later"
            case "这是，那个梦..." : return "This is, in that dream..."
            case "这是我们封印魔王的地方": return "This is the cave we sealed Calamity one hundred years ago."
            case "把我带到封印上去吧": return "Take me to the seal."
            case "恢复了全部力量": return " restores full power."
            case "这里...": return "This cave..."
            case "我来过...": return "I had been here before..."
            case "你当然来过": return "Of course you had..."
            case "过来吧": return "Come here."

            case "橙色": return "orange"
            case "青色": return "teal"
            case "粉色": return "pink"

            case "啊啊啊啊啊啊啊啊啊" : return "Ahhhhhhhhhhhhhhhh"
            case "完了...": return "We are done..."
            case "封印之剑": return "Sword of seal"
            case "掉了下去": return " fell down"
            case "一同掉落的": return " also fell "
            case "还有世界的希望": return " the wolrd's hope "
            case "哈哈" : return "Haha"
            case "哈哈哈哈": return "Hahahaha"
            case "哈哈哈哈哈哈": return "Hahahahahahahah"


            case "不!!!!!!" : return "NO!!!!!!!!!"
            case "是谁？！": return "Who is it?!"

            case "把": return "Bring "
            case "还回来!!": return " back!!!!"
            case "哈哈哈，就凭你": return "Hahaha, you minor "
            case "你能做得了什么？": return "What can you do?"
            case "你忘了": return "I've been to the sealing dungeon..."
            case "我见过你的封印符文": return "where I've seen the seals"
            case "只要把褪色的符文": return "once I fill the faded seals"
            case "重新上色": return " with the right color"


            case "你错了": return "WRONG!!! "
            case "这不是封印的颜色": return "This is NOT the right color"
            case "给我消失吧": return "Vanish..."
            case "这就是一个": return "This is the end "
            case "普普通通的勇者故事": return "of a tale "
            case "的结局": return "of a common folk."
            case "很遗憾": return "that the common folk "
            case "普普通通的勇者": return "failed "
            case "未能拯救世界": return "saving the world."

            case "醒醒": return " wake up"
            case "她已经不是你认识的": return "She's not "
            case "一起打倒她吧": return "Fight her "

            case "这样下去，": return "Now..."
            case "没有人能阻止魔王了": return "no one can stop Calamity"

            case "可恶！": return "Ahh!"
            case "居然能对青梅竹马": return "Wielding the sowrd "
            case "挥刀相向": return "against childhood sweetheart"

            case "你来了": return "You've come"
            case "你为什么不早点来!!!": return "What took you so long?????"
            case "你还认得我吗？": return "recognize me?"


            case "停!": return "STOP!!!!!"
            case "不要再过来了": return "NOT ANY CLOSER!!!"
            case "我不想你看到我这个样子": return "I DON'T WANT YOU TO SEE ME LIKE THIS"
            case "看来我们还是来晚了": return "We are late"
            case "封印已经解除了": return "The seal is broken"


            case "你拿着的是什么？": return "What are you holding?"
            case "是封印之剑？": return "The Sword of Seal?"
            case "没有勇者的血脉": return "How can anyone wield the Sword of Seal"
            case "怎么能用封印之剑？！": return "without bloodline of the ONE."

            case "他就是": return "He's the son of "
            case "的儿子": return ""
            case "当然能用挥舞我": return "Of course he CAN wield me"
            case "还能像以前一样": return "and also "
            case "封印你": return "SEAL you "

            case ",是我": return ", it's me"
            case ",放下手里的剑": return ", put down your sword"
            case ",我是你的青梅竹马": return ", I'm your friend"


            case "都是些不值钱的东西": return "some worthless"
            case "几件衣服": return "sereval clothes"
            case "锈迹斑斑的老剑": return "a rusty sword"
            case "好久没有练习了": return "haven't practice for long"
            case "剩下的真的没用了": return "the rest is really useless"


            case "你还记得你的玩伴叫什么名字吗？": return "Remember your playmate's name?"
            case "小红": return "Pinky"
            case "佩奇": return "Peppa"
            case "静宜": return "Shizuka"
            case "小兰": return "Ran"
            case "对！就是": return "Yes, it's "
            case "她被怪物抓走了...": return "She's been taken away by that monster..."
            case "一直都没有回来...": return "and not return..."
            case "你去救救她吧...": return "please go and find her..."

            case "你还带着那把剑啊": return "Still carrying that sword..."
            case "那时你才两岁": return "You are just a baby then."
            case "什么事？": return "What happened?"
            case "这是谁的剑": return "Whose sword is this?"
            case "当作没听见": return "Take no notice"
            case "现在先把": return "Bring "
            case "找回来吧": return " back first"
            case "是一个勇者的剑" : return "It's the ONE's sword."
            case "村长": return "Chief"

            case "旁白": return "Narrator"
            case "与此同时...": return "In the meanwhile..."
            case "被带走的": return "The taken "


            case "啊！！！！！！": return "Ouch!"
            case "这是哪里？": return "What is this place?"

            case "点燃柴火？": return "light the firwood?"

            case "墙上有一个拉杆": return "There's a lever on wall."
            case "拉": return "Pull"
            case "还是算了" : return "Do nothing"

            case "打开宝箱": return "Open the chest"
            case "但是宝箱竟然自己打开了": return "But the chest opens suddenly, it's a trap!"
            case "一股邪恶的诅咒落到了": return "An evil curse is put on "
            case "的头上": return ""
            case "晕了过去": return " passed out."

            case "B使用火把": return "Pressed B to use torch."
        }

        return name;
    })

}
