namespace SpriteKind {

    export const Closet = SpriteKind.create()
    export const OldmanInHouse = SpriteKind.create()

}
namespace house {

    export const ROOM_NAME = "HOUSE"

    export class HouseRoom extends room.AbstractRoom {
        protected roomTilemap(): tiles.TileMapData {
            return tilemap`house`
        }

        private closetSprite: Sprite

        constructor() {
            super(ROOM_NAME)
        }

        placeFurniture() {
            this.closetSprite = this.createSprite(assets.image`衣柜`, SpriteKind.Closet)
            tiles.placeOnTile(this.closetSprite, tiles.getTileLocation(7, 1))
            this.closetSprite.x += 8
            this.closetSprite.y -= 8

            sprites.onOverlap(SpriteKind.Player, SpriteKind.Closet, (sprite: Sprite, otherSprite: Sprite) => {
                otherSprite.sayText("A", 50)
                if (controller.A.isPressed()) {
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        otherSprite.setImage(assets.image`衣柜打开`)
                        if (state.playmateCapturedByBat && !state.rustySwordGet) {
                            story.printCharacterText(i18n.i18nstr`取得锈剑`)
                            state.rustySwordGet = true
                        } else if (!state.playmateCapturedByBat){
                            story.printCharacterText("都是些不值钱的东西")
                            story.printCharacterText("几件衣服")
                            story.printCharacterText("锈迹斑斑的老剑")
                            story.printCharacterText("好久没有练习了", state.playerName)
                        } else {
                            story.printCharacterText("剩下的真的没用了")
                        }
                        otherSprite.setImage(assets.image`衣柜`)
                        controller.moveSprite(this.heroSprite)
                        story.cancelAllCutscenes()
                    })
                }
            })
        }

        fromCave() {
            multilights.toggleLighting(false)
            multilights.removeLightSource(this.heroSprite)
            tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(2, 2))
            this.heroSprite.x -= 8 // move left a little bit to center of the bed

            story.startCutscene(function () {
                controller.moveSprite(this.heroSprite, 0, 0)
                this.heroSprite.setImage(img`
                    . . . . . . . . . . . . . . . .
                    . . . . f f f f . . . . . . . .
                    . . f f e 2 f e f . . . . . . .
                    . f 2 e 2 e f e e f f f f f . .
                    f 2 2 e 2 f e 4 d d e 2 2 5 f .
                    f f 2 e 2 f e 4 d d 4 2 2 5 f .
                    f e f e 2 f e f f d 4 2 2 4 f f
                    f e e f e f f b 1 d 4 e e f f f
                    f e e f e 2 f e 4 4 e d d e f f
                    f e e e f 2 f 4 d e e d d e f .
                    . f e e f 2 f 4 4 e f 4 e f . .
                    . f f e f e f e e e f . . . . .
                    . . f f f f f f e f . . . . . .
                    . . . . . . f f f . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `)
                scene.cameraShake(4, 500)
                music.knock.playUntilDone()
                story.printCharacterText(i18n.i18nstr`又是这个梦`, state.playerName)
                if (state.willingToBind) {
                    story.printCharacterText(i18n.i18nstr`每次说了愿意又要我等`, state.playerName)
                    story.printCharacterText(i18n.i18nstr`下次就说不愿意好了`, state.playerName)
                } else {
                    story.printCharacterText(i18n.i18nstr`每次说了不愿意就不说话`, state.playerName)
                    story.printCharacterText(i18n.i18nstr`下次就说愿意好了`, state.playerName)
                }
                heroSprite.setImage(img`
                    . . . . . . f f f f . . . . . .
                    . . . . f f f 2 2 f f f . . . .
                    . . . f f f 2 2 2 2 f f f . . .
                    . . f f f e e e e e e f f f . .
                    . . f f e 2 2 2 2 2 2 e e f . .
                    . . f e 2 f f f f f f 2 e f . .
                    . . f f f f e e e e f f f f . .
                    . f f e f b f 4 4 f b f e f f .
                    . f e e 4 1 f d d f 1 4 e e f .
                    . . f e e d d d d d d e e f . .
                    . . . f e e 4 4 4 4 e e f . . .
                    . . e 4 f 2 2 2 2 2 2 f 4 e . .
                    . . 4 d f 2 2 2 2 2 2 f d 4 . .
                    . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                    . . . . . f f f f f f . . . . .
                    . . . . . f f . . f f . . . . .
                `)
                controller.moveSprite(this.heroSprite)
            })
        }

        didEnterRoom(entrance?: string): void {

            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, (sprite: Sprite, location: tiles.Location) => {
                this.leaveRoom(village.ROOM_NAME)
            })

            this.placeFurniture()
            if (entrance == cave.ROOM_NAME) {
                this.fromCave()
                controller.moveSprite(this.heroSprite)
            } else if (entrance == village.ROOM_NAME) {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(5, 4))
                controller.moveSprite(this.heroSprite)
            } else if (entrance == trail.ROOM_NAME) {
                // 倒下以后被老头送回家
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(2,1))
                let oldmanSprite = this.createSprite(img`
                    . . . . f f f f . . . .
                    . . f f e e e e f f . .
                    . f f e e e e e e f f .
                    f f f f 4 e e e f f f f
                    f f f 4 4 4 e e f f f f
                    f f f 4 4 4 4 e e f f f
                    f 4 e 4 4 4 4 4 4 e 4 f
                    f 4 4 f f 4 4 f f 4 4 f
                    f e 4 d d d d d d 4 e f
                    . f e d d b b d d e f .
                    . f f e 4 4 4 4 e f f .
                    e 4 f b 1 1 1 1 b f 4 e
                    4 d f 1 1 1 1 1 1 f d 4
                    4 4 f 6 6 6 6 6 6 f 4 4
                    . . . f f f f f f . . .
                    . . . f f . . f f . . .
                `)
                tiles.placeOnTile(oldmanSprite, tiles.getTileLocation(4,1))
                this.heroSprite.setImage(img`
                    . . . . . . f f f f . . . . . .
                    . . . . f f f 2 2 f f f . . . .
                    . . . f f f 2 2 2 2 f f f . . .
                    . . f f f e e e e e e f f f . .
                    . . f f e 2 2 2 2 2 2 e e f . .
                    . . f e 2 f f f f f f 2 e f . .
                    . . f f f f e e e e f f f f . .
                    . f f e f b f 4 4 f b f e f f .
                    . f e e 4 1 f d d f 1 4 e e f .
                    . . f e e d d d d d d e e f . .
                    . . . f e e 4 4 4 4 e e f . . .
                    . . e 4 f 2 2 2 2 2 2 f 4 e . .
                    . . 4 d f 2 2 2 2 2 2 f d 4 . .
                    . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
                    . . . . . f f f f f f . . . . .
                    . . . . . f f . . f f . . . . .
                `)
                story.startCutscene(()=>{
                    story.spriteSayText(oldmanSprite, state.playerName + "...")
                    story.spriteSayText(oldmanSprite, "你还记得你的玩伴叫什么名字吗？")
                    story.showPlayerChoices("小红", "佩奇", "静宜", "小兰")
                    state.playmateName = story.getLastAnswer()
                    story.spriteSayText(oldmanSprite, "对！就是" + story.getLastAnswer() + "...")
                    story.spriteSayText(oldmanSprite, "她被怪物抓走了...")
                    story.spriteSayText(oldmanSprite, "一直都没有回来...")
                    story.spriteSayText(oldmanSprite, "你去救救她吧...")

                    state.doomed = true
                    
                    controller.moveSprite(this.heroSprite)
                })

                sprites.onOverlap(SpriteKind.Player, SpriteKind.OldmanInHouse, (sprite:Sprite, otherSprite:Sprite) => {
                    otherSprite.sayText("A", 500)
                    if (controller.A.isPressed()) {
                        story.startCutscene(() => {
                            story.printCharacterText("你还带着那把剑啊", "村长")
                            story.printCharacterText("那时你才两岁", "村长")
                            story.showPlayerChoices("什么事？", "这是谁的剑", "当作没听见")
                            let answer = story.getLastAnswer() 
                            if (answer == "什么事？") {
                                story.printCharacterText("现在先把" + state.playmateName + "找回来吧", "村长")
                            } else if (answer == "这是谁的剑") {
                                story.printCharacterText("是一个勇者的剑", "村长")
                            } 
                            story.cancelAllCutscenes()
                        })
                    }
                })
            }

        }

    }
}