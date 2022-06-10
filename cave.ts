// Add your code here
namespace SpriteKind {
    export const SWORD_IN_STONE_KIND = SpriteKind.create()
}
namespace cave {

    export const ROOM_NAME = "CAVE"

    export class CaveRoom extends room.AbstractRoom {

        private swordInStone: Sprite

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`cave`
        }
        constructor() {
            super(ROOM_NAME)
        }

        didEnterRoom(entrance?:string): void {
            this.heroSprite.setImage(img`
                . . . . . . f f f f . . . . . .
                . . . . f f e e e e f f . . . .
                . . . f e e e f f e e e f . . .
                . . f f f f f 2 2 f f f f f . .
                . . f f e 2 e 2 2 e 2 e f f . .
                . . f e 2 f 2 f f 2 f 2 e f . .
                . . f f f 2 2 e e 2 2 f f f . .
                . f f e f 2 f e e f 2 f e f f .
                . f e e f f e e e e f e e e f .
                . . f e e e e e e e e e e f . .
                . . . f e e e e e e e e f . . .
                . . e 4 f f f f f f f f 4 e . .
                . . 4 d f 2 2 2 2 2 2 f d 4 . .
                . . 4 4 f 4 4 4 4 4 4 f 4 4 . .
                . . . . . f f f f f f . . . . .
                . . . . . f f . . f f . . . . .
            `)
            multilights.addLightSource(heroSprite, 6)
            scene.cameraFollowSprite(heroSprite)
            tiles.placeOnTile(heroSprite, tiles.getTileLocation(5, 12))
            this.swordInStone = this.createSprite(img`  
    c c c c c c c c c 5 b b b c c c 
    c c c c c c b b b 5 d d d b c c 
    c c c c c c b d 5 8 5 d d b c c 
    c c c c b b d d d 1 d b b d c c 
    c c c c b d d d d 1 d b b d b c 
    c c c c c d d d d 1 b b d b c c 
    c c c b c c b b b 1 d d b c c c 
    c c b b c c c b d 1 b c c c c c 
    c b b d d d b b b b b b c c c c 
    c c d d d d d d b d b c c c b c 
    c c b d d d b b d b c c c b b c 
    c b c c c c b d d b b b b b c c 
    c c b b b d d b c c b b b b c c 
    c c c c c c c c c b b b b c c c 
    c c c c c b b b b b b b c c c c 
    c c c c c c c c c c c c c c c c 
    `, SpriteKind.SWORD_IN_STONE_KIND)
            multilights.toggleLighting(true)
            multilights.addLightSource(this.swordInStone, 16)
            tiles.placeOnTile(this.swordInStone, tiles.getTileLocation(5, 4))
            let notFinished = true
            story.startCutscene(function () {
                story.printText("勇者.", 80, 80)
                story.printText("勇者..", 80, 80)
                story.printText("勇者...", 80, 80)
                story.printText("到我跟前来...", 80, 80)
                story.spriteMoveToLocation(this.heroSprite, 88, 96, 40)
                story.printCharacterText("告诉我你的名字", "???")
                story.showPlayerChoices("马克", "乔治", "大雄", "柯南")
                state.playerName = story.getLastAnswer()
                story.printCharacterText("这世界面临灾难...", "???")
                story.printCharacterText("你愿意和我建立灵魂链接吗？", "???")
                story.showPlayerChoices("愿意", "不愿意")
                if (story.getLastAnswer() == "愿意") {
                    state.willingToBind = true
                    story.printCharacterText("等待合适的时机吧", "???")
                } else {
                    story.printCharacterText("...", "???")
                }
                notFinished = false
            })

            while (notFinished) {
                pause(1)
            }
            this.leaveRoom(house.ROOM_NAME)
        }

        willLeaveRoom(exit: string): boolean {
            multilights.removeLightSource(this.heroSprite)
            return true
        }
    }
}