

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

        }
        return name;
    })

    }
    