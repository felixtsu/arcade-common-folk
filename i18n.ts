

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
        }
        return name;
    })

    }
