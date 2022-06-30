namespace SpriteKind {
    export const Fireball = SpriteKind.create()
    export const FirstFireball = SpriteKind.create()
}
namespace throne_chamber {
    export const ROOM_NAME = "THRONE_CHAMBER"

    export class ThroneChamberRoom extends room.AbstractRoom {

        private bossSprite:Sprite = null

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`throne_chamber`
        }

        constructor() {
            super(ROOM_NAME)
        }

        protected didEnterRoom(entrance?:string) {

            
            sprites.onOverlap(SpriteKind.Player, SpriteKind.FirstFireball, (sprite:Sprite, otherSprite:Sprite) => {
                otherSprite.lifespan = 10000
                otherSprite.vx = 0
                otherSprite.vy = 0

                story.startCutscene(()=>{

                    story.printCharacterText(state.playerName + "醒醒", "封印之剑")
                    story.printCharacterText("她已经不是你认识的" + state.playmateName, "封印之剑")
                    story.printCharacterText("一起打倒她吧", "封印之剑")

                    let isApressed = false


                    info.onCountdownEnd(() => {
                        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {})
                        story.cancelAllCutscenes()
                        if (!isApressed) {
                            otherSprite.destroy()
                            info.changeLifeBy(-1)
                            scene.cameraShake(4, 500)
                            story.printCharacterText("这样下去，没有人能阻止魔王了", "封印之剑")
                        }
                    })
                    
                    info.startCountdown(1)
                    controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                        isApressed = true
                        info.stopCountdown()
                        otherSprite.destroy(effects.disintegrate, 500)
                        meteoroid.redirectTo(otherSprite, this.bossSprite.x, this.bossSprite.y, 2000)
                        story.cancelAllCutscenes()
                    })
                    
                    story.cancelAllCutscenes()
                })
            })

            story.startCutscene( () => {
                this.bossSprite = this.createSprite(assets.image`playmate_back_doomed`)
                tiles.placeOnTile(this.bossSprite, tiles.getTileLocation(7, 7))
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(7, 13))
                scene.cameraFollowSprite(this.heroSprite)

                story.printText(state.playerName, 120, 120)
                story.printText("你来了", 120, 120)
                story.printText("你为什么不早点来!!!", 120, 120)
                scene.cameraShake(6, 500)
                story.printText(state.playerName, 120, 120)
                story.printText("你还认得我吗？", 120, 120)

                story.spriteMoveToLocation(this.heroSprite, 120, 168, 50)

                scene.centerCameraAt(120, 144)

                pause(500)

                story.spriteSayText(this.bossSprite, "停!")
                scene.cameraShake(8, 500)
                story.spriteSayText(this.bossSprite, "不要再过来了")
                story.spriteSayText(this.bossSprite, "我不想你看到我这个样子")

                story.printCharacterText("看来我们还是来晚了", "???")
                story.printCharacterText("封印已经解除了", "???")

                this.bossSprite.setImage(assets.image`playmate_front_doomed`)

                story.spriteSayText(this.bossSprite, "你拿着的是什么？")
                story.spriteSayText(this.bossSprite, "!!!!!!!!")
                scene.cameraShake(8, 500)

                story.spriteSayText(this.bossSprite, "是封印之剑？")
                story.spriteSayText(this.bossSprite, "没有勇者的血脉")
                story.spriteSayText(this.bossSprite, "怎么能用封印之剑？！")

                story.printCharacterText("他就是的" + state.papaName() + "的儿子", "封印之剑")
                story.printCharacterText("当然能用挥舞我", "封印之剑")
                story.printCharacterText("还能像以前一样", "封印之剑")
                story.printCharacterText("封印你", "封印之剑")

                story.spriteSayText(this.bossSprite, "哈")
                story.spriteSayText(this.bossSprite, "哈哈")
                story.spriteSayText(this.bossSprite, "哈哈哈哈")
                story.spriteSayText(this.bossSprite, "他办得到吗？！")

                this.bossSprite.setImage(assets.image`playmate_front`)
                this.bossSprite.x += 5
                this.bossSprite.y += 4
                
                story.spriteSayText(this.bossSprite, state.playerName + ",是我")
                story.spriteSayText(this.bossSprite, state.playerName + ",放下手里的剑")
                story.spriteSayText(this.bossSprite, state.playerName + ",我是你的青梅竹马")

                let fireballSprite = this.createSprite(assets.image`bossFireball`, SpriteKind.FirstFireball)
                fireballSprite.x = this.heroSprite.x + 32
                fireballSprite.y = this.heroSprite.y + 32

                meteoroid.launchMeteoroidToPosition(fireballSprite, this.heroSprite.x, this.heroSprite.y, 50, 2000, 8)
                
                scene.cameraFollowSprite(this.heroSprite)
                

                
                
            })
        }
        
    }
}   