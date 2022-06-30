// 在此处添加您的代码
namespace state {

    export let playmateCapturedByBat = false
    export let rustySwordGet = false
    export let soulBound = false
    export let willingToBind = false
    export let exp = 0
    export let doomed = false

    export let playmateName = ""
    export let playerName = ""

    export function papaName():string {
        if(playerName == "乔治") {
            return "猪爸爸"
        } else if (playerName == "大雄") {
            return "野比大助"
        } else if (playerName == "柯南") {
            return "工藤优作"
        } else if (playerName == "马克") {
            return "上一任勇者"
        }
        return ""
    }

}