// Add your code here
namespace SpriteKind {
    export const SWORD_IN_STONE_KIND = SpriteKind.create()
    export const SWORD_CUTSCENE_TRIGGER_SPRITE_KIND = SpriteKind.create()
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
            if (entrance == cave_entrance.ROOM_NAME) {

                 // 清醒的时候来到山洞里
                 
                multilights.addLightSource(this.heroSprite, 6)
                scene.cameraFollowSprite(this.heroSprite)
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(5, 12))

                controller.moveSprite(this.heroSprite, 0, 0)

                this.swordInStone = this.createSprite(assets.image`swordInStone`, SpriteKind.SWORD_IN_STONE_KIND)
                tiles.placeOnTile(this.swordInStone, tiles.getTileLocation(5, 4))

                let lightFromCeilingSprite = this.createSprite(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `)
                multilights.toggleLighting(true)
                lightFromCeilingSprite.x = this.swordInStone.x 
                lightFromCeilingSprite.y = this.swordInStone.y
                
                multilights.addLightSource(lightFromCeilingSprite, 24)


                story.printCharacterText("这里...", state.playerName)
                story.printCharacterText("我来过...", state.playerName)
                story.printText("你当然来过", 80, 80)
                story.printText("过来吧", 80, 80)

                controller.moveSprite(this.heroSprite)

                let swordCutSceneTriggerSprite = this.createSprite(img`
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
                `, SpriteKind.SWORD_CUTSCENE_TRIGGER_SPRITE_KIND)
                tiles.placeOnTile(swordCutSceneTriggerSprite, tiles.getTileLocation(5, 7))
                swordCutSceneTriggerSprite.setFlag(SpriteFlag.Invisible, true)

                sprites.onOverlap(SpriteKind.Player, SpriteKind.SWORD_CUTSCENE_TRIGGER_SPRITE_KIND, (sprite: Sprite, otherSprite: Sprite) => {
                    otherSprite.destroy()
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        story.printCharacterText("这是，那个梦...", state.playerName)
                        story.printCharacterText("这是我们封印魔王的地方", "???")
                        story.printCharacterText("把我带到封印上去吧", "???")
                        controller.moveSprite(this.heroSprite)
                    })
                })

                sprites.onOverlap(SpriteKind.Player, SpriteKind.SWORD_IN_STONE_KIND, (sprite: Sprite, otherSprite: Sprite) => {
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)


                        info.setLife(3)
                        story.printCharacterText(state.playerName + "恢复了全部力量")
                        
                        
                        this.swordInStone.setImage(img`
                            aaaaaaaaccccccccccbbbbbbbbccccaa
                            aaaaaaccccccccccccbbbbbbbbccccaa
                            aaaaacccccccbbbbbbbbddddddbbccca
                            aaccccccccccbbbbbbbbddddddbbccca
                            acccccccccccbbddddddddddddbbcccc
                            ccccccccccccbbddddddddddddbbcccc
                            ccccccccbbbbddddddddddbbbbddcccc
                            ccccccccbbbbddddddddddbbbbddcccc
                            ccccccccbbddddddddddddbbbbddbbcc
                            ccccccccbbddddddddddddbbbbddbbcc
                            ccccccccccddddddddbbbbbbddbbcccc
                            ccccccccccddddddddbbbbbbddbbcccc
                            ccccccbbccccbbbbbbddddddbbcccccc
                            ccccccbbccccbbbbbbddddddbbcccccc
                            ccccbbbbccccccbbddddbbcccccccccc
                            ccccbbbbccccccbbddddbbcccccccccc
                            ccbbbbddddddbbbbbbbbbbbbcccccccc
                            ccbbbbddddddbbbbbbbbbbbbcccccccc
                            ccccddddddddddddbbddbbccccccbbcc
                            ccccddddddddddddbbddbbccccccbbcc
                            ccccbbddddddbbbbddbbccccccbbbbcc
                            ccccbbddddddbbbbddbbccccccbbbbcc
                            ccbbccccccccbbddddbbbbbbbbbbcccc
                            ccbbccccccccbbddddbbbbbbbbbbcccc
                            ccccbbbbbbddddbbccccbbbbbbbbcccc
                            ccccbbbbbbddddbbccccbbbbbbbbcccc
                            ccccccccccccccccccbbbbbbbbcccccc
                            ccccccccccccccccccbbbbbbbbccccca
                            acccccccccbbbbbbbbbbbbbbccccccaa
                            aaccccccccbbbbbbbbbbbbbbcccccaaa
                            aaaccccccccccccccccccccccccccaaa
                            aaaaaccccccccccccccccccccccaaaaa
                        `)
                        
                        this.swordInStone.setFlag(SpriteFlag.Ghost, true)
                        scene.cameraShake(4, 500)
                        for (let i = 0 ; i < 4; i ++) {
                            story.spriteMoveToLocation(this.swordInStone, this.swordInStone.x - (2), this.swordInStone.y, 10*i + 10)
                            story.spriteMoveToLocation(this.swordInStone, this.swordInStone.x + (2), this.swordInStone.y, 10*i + 10)
                        }
                        story.spriteMoveToLocation(this.swordInStone, this.swordInStone.x + 32 , this.swordInStone.y, 32)
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
                        story.spriteMoveToLocation(this.heroSprite, 88, 80, 50)
                        controller.moveSprite(this.heroSprite)
                        story.cancelAllCutscenes()
                        throneChamberRoom.enterRoom(this.heroSprite, this.getRoomName())
                    })
                })

                




            } else {
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
                this.swordInStone = this.createSprite(assets.image`swordInStone`, SpriteKind.SWORD_IN_STONE_KIND)
                multilights.toggleLighting(true)
                multilights.addLightSource(this.swordInStone, 16)
                tiles.placeOnTile(this.swordInStone, tiles.getTileLocation(5, 4))
                let notFinished = true

                story.startCutscene(function () {
                    story.printText(i18n.i18nstr`勇者` + ".", 80, 80)
                    story.printText(i18n.i18nstr`勇者` + "..", 80, 80)
                    story.printText(i18n.i18nstr`勇者` + "...", 80, 80)
                    story.printText(i18n.i18nstr`到我跟前来...`, 80, 80)
                    story.spriteMoveToLocation(this.heroSprite, 88, 96, 40)
                    story.printCharacterText(i18n.i18nstr`告诉我你的名字`, "???")
                    story.showPlayerChoices(i18n.i18nstr`马克`, i18n.i18nstr`乔治`, i18n.i18nstr`大雄`, i18n.i18nstr`柯南`)
                    state.playerName = story.getLastAnswer()
                    story.printCharacterText(i18n.i18nstr`这世界面临灾难...`, "???")
                    story.printCharacterText(i18n.i18nstr`你愿意和我建立灵魂链接吗？`, "???")
                    story.showPlayerChoices(i18n.i18nstr`愿意`, i18n.i18nstr`不愿意`)
                    if (story.getLastAnswer() == i18n.i18nstr`愿意`) {
                        state.willingToBind = true
                        story.printCharacterText(i18n.i18nstr`等待合适的时机吧`, "???")
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
            
        }

        willLeaveRoom(exit: string): boolean {
            multilights.removeLightSource(this.heroSprite)
            return true
        }
    }
}