namespace SpriteKind {
    export const Fireball = SpriteKind.create()
    export const FirstFireball = SpriteKind.create()
}
namespace throne_chamber {
    export const ROOM_NAME = "THRONE_CHAMBER"

    export class ThroneChamberRoom extends room.AbstractRoom {

        private bossSprite:Sprite = null
        private playmateSprite:Sprite = null

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`throne_chamber`
        }

        constructor() {
            super(ROOM_NAME)
        }

        private colorSeal(sealImage:Image, offset:number) : {sprite:Sprite, color:number} {
            let sealSprite = this.createSprite(sealImage)
            sealSprite.x = this.playmateSprite.x
            sealSprite.y = this.bossSprite.y - 32 

            story.showPlayerChoices(i18n.i18nstr`橙色`, i18n.i18nstr`青色`, i18n.i18nstr`粉色`)
            let selectedColor = this.handleColor(story.getLastAnswer())

            sealSprite.image.replace(0, selectedColor)
            sealSprite.image.replace(12, 0)
            
            story.spriteMoveToLocation(sealSprite, this.playmateSprite.x + offset, this.playmateSprite.y - 72, 50)
            return {sprite:sealSprite, color:selectedColor}
        }

        private handleColor(color:String) :number {
            if (color == i18n.i18nstr`橙色`) {
                return 4
            } else if (color == i18n.i18nstr`粉色`) {
                return 3
        } else if(color == i18n.i18nstr`青色`) {
                return 6
            } else {
                return 0
            }
        }

        protected didEnterRoom(entrance?:string) {

            let bossFightBegin = false

            scene.onOverlapTile(SpriteKind.Fireball, sprites.dungeon.floorDark2, (sprite:Sprite, location:tiles.Location)=> {
                sprite.destroy()
                tiles.setTileAt(location, sprites.dungeon.floorDark3)
            })

            scene.onOverlapTile(SpriteKind.Fireball, sprites.dungeon.floorDark3, (sprite:Sprite, location:tiles.Location)=> {
                sprite.destroy()
                tiles.setTileAt(location, myTiles.transparency16)
            })

            scene.onOverlapTile(SpriteKind.Player, myTiles.transparency16, (sprite: Sprite, location: tiles.Location) => {
                story.startCutscene(() => {
                    controller.moveSprite(this.heroSprite, 0, 0)
                    sprites.destroyAllSpritesOfKind(SpriteKind.Fireball)
                    bossFightBegin = false

                    story.spriteSayText(this.heroSprite, i18n.i18nstr`啊啊啊啊啊啊啊啊啊`)
                    story.printCharacterText(i18n.i18nstr`完了...`, i18n.i18nstr`封印之剑`)
                    this.heroSprite.setFlag(SpriteFlag.Invisible, true)
                    this.heroSprite.setFlag(SpriteFlag.Ghost, true)
                    story.printCharacterText(state.playerName + i18n.i18nstr`掉了下去`)
                    story.printCharacterText(i18n.i18nstr`一同掉落的`)
                    story.printCharacterText(i18n.i18nstr`还有世界的希望`)
                    story.printCharacterText(i18n.i18nstr`封印之剑`)

                    scene.cameraFollowSprite(this.bossSprite)

                    story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈`)
                    story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈哈哈`)
                    story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈哈哈哈哈`)

                    story.printCharacterText(i18n.i18nstr`不!!!!!!`, "???")
                    story.printCharacterText(state.playerName + "!!!!", "???")

                    story.spriteSayText(this.bossSprite, i18n.i18nstr`是谁？！`)
                    scene.cameraShake(4, 500)

                    this.playmateSprite = this.createSprite(assets.image`playmate_front`, SpriteKind.PlayMate)
                    this.playmateSprite.x = this.bossSprite.x 
                    this.playmateSprite.y = this.bossSprite.y + 48

                    story.spriteSayText(this.playmateSprite, i18n.i18nstr`把` + state.playerName + i18n.i18nstr`还回来!!`)

                    story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈哈，就凭你`)
                    story.spriteSayText(this.bossSprite, i18n.i18nstr`你能做得了什么？`)

                    story.spriteSayText(this.playmateSprite, i18n.i18nstr`你忘了`)
                    story.spriteSayText(this.playmateSprite, i18n.i18nstr`我见过你的封印符文`)
                    story.spriteSayText(this.playmateSprite, i18n.i18nstr`只要把褪色的符文`)
                    story.spriteSayText(this.playmateSprite, i18n.i18nstr`重新上色`)


                    story.spriteSayText(this.bossSprite, i18n.i18nstr`不!!!!!!`)
                    scene.cameraShake(4, 500)

                    let threeSeal = this.colorSeal(assets.image`threeSeal_fade`, -48)
                    let sixSeal = this.colorSeal(assets.image`sixSeal_fade`, 48)
                    let eightSeal = this.colorSeal(assets.image`eightSeal_fade`, 0)

                    if (threeSeal.color == 3 && sixSeal.color == 6 && eightSeal.color == 4) {
                        story.spriteMoveToLocation(threeSeal.sprite, this.bossSprite.x, this.bossSprite.y, 50)
                        story.spriteSayText(this.bossSprite, i18n.i18nstr`不!!!!!!`)
                        scene.cameraShake(4, 500)
                        story.spriteMoveToLocation(sixSeal.sprite, this.bossSprite.x, this.bossSprite.y, 80)
                        scene.cameraShake(4, 500)
                        story.spriteMoveToLocation(eightSeal.sprite, this.bossSprite.x, this.bossSprite.y, 100)
                        scene.cameraShake(4, 500)

                        multilights.toggleLighting(true)
                        multilights.addLightSource(this.bossSprite, 32)
                        for (let i = 0; i<5;i++) {
                            multilights.bandWidthOf(this.bossSprite, 32 - i*8)
                            pause(1000)
                        }

                        state.doomed = false;

                        villageRoom.enterRoom(this.playmateSprite, throne_chamber.ROOM_NAME)
                    } else {
                        story.spriteSayText(this.bossSprite, i18n.i18nstr`你错了`)
                        story.spriteSayText(this.bossSprite, i18n.i18nstr`这不是封印的颜色`)
                        story.spriteSayText(this.bossSprite, i18n.i18nstr`给我消失吧`)

                        threeSeal.sprite.destroy(effects.rings, 1000)
                        pause(1000)
                        sixSeal.sprite.destroy(effects.rings, 1000)
                        pause(1000)
                        eightSeal.sprite.destroy(effects.rings, 1000)
                        pause(1000)

                        story.printCharacterText(i18n.i18nstr`这就是一个`)
                        story.printCharacterText(i18n.i18nstr`普普通通的勇者故事`)
                        story.printCharacterText(i18n.i18nstr`的结局`)
                        
                        story.printCharacterText(i18n.i18nstr`很遗憾`)
                        story.printCharacterText(i18n.i18nstr`普普通通的勇者`)
                        story.printCharacterText(i18n.i18nstr`未能拯救世界`)

                        story.printCharacterText("Try again.")

                        game.reset()
                    }
                    

                })
            })

            game.onUpdateInterval(2000, ()=> {
                if (bossFightBegin) {
                    let fireballSprite = this.createSprite(assets.image`bossFireball`, SpriteKind.Fireball)
                    meteoroid.launchMeteoroidToPosition(fireballSprite, this.heroSprite.x , this.heroSprite.y, 80, 2000, 0)

                    for (let i = 0; i< 3; i++) {
                        let fireballSprite = this.createSprite(assets.image`bossFireball`, SpriteKind.Fireball)

                        let deltaX = Math.percentChance(50) ? randint(16, 32) : -randint(16,32)
                        let deltaY = Math.percentChance(50) ? randint(16, 32) : -randint(16, 32)

                        meteoroid.launchMeteoroidToPosition(fireballSprite, this.heroSprite.x + deltaX, this.heroSprite.y + deltaY, 80,2000, 0)
                    }
                    

                }

            })

            
            sprites.onOverlap(SpriteKind.Player, SpriteKind.FirstFireball, (sprite:Sprite, otherSprite:Sprite) => {
                otherSprite.setFlag(SpriteFlag.Ghost, true)
                otherSprite.lifespan = 10000
                otherSprite.vx = 0
                otherSprite.vy = 0

                story.startCutscene(()=>{

                    story.printCharacterText(state.playerName + i18n.i18nstr`醒醒`, i18n.i18nstr`封印之剑`)
                    story.printCharacterText(i18n.i18nstr`她已经不是你认识的` + state.playmateName, i18n.i18nstr`封印之剑`)
                    story.printCharacterText(i18n.i18nstr`一起打倒她吧`, i18n.i18nstr`封印之剑`)

                    let isApressed = false

                    info.onCountdownEnd(() => {
                        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {})
                        story.cancelAllCutscenes()
                        if (!isApressed) {
                            otherSprite.destroy()
                            info.changeLifeBy(-1)
                            scene.cameraShake(4, 500)
                            story.startCutscene(()=>{
                                story.printCharacterText(i18n.i18nstr`这样下去，`, i18n.i18nstr`封印之剑`)
                                story.printCharacterText(i18n.i18nstr`没有人能阻止魔王了`, i18n.i18nstr`封印之剑`)

                                let fireballSprite = this.createSprite(assets.image`bossFireball`, SpriteKind.FirstFireball)
                                fireballSprite.x = this.heroSprite.x + 32
                                fireballSprite.y = this.heroSprite.y + 32

                                meteoroid.launchMeteoroidToPosition(fireballSprite, this.heroSprite.x, this.heroSprite.y, 50, 2000, 8)
                            })
                            
                        }
                    })
                    
                    info.startCountdown(1)
                    controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
                        controller.A.onEvent(ControllerButtonEvent.Pressed, () => { })
                        story.startCutscene(()=>{
                            isApressed = true

                            info.stopCountdown()
                            otherSprite.destroy(effects.disintegrate, 500)

                            this.bossSprite.setImage(assets.image`playmate_front_doomed`)
                            this.bossSprite.x -= 5
                            this.bossSprite.y -= 4
                            story.spriteSayText(this.bossSprite, i18n.i18nstr`可恶！`)
                            story.spriteSayText(this.bossSprite, i18n.i18nstr`居然能对青梅竹马`)
                            story.spriteSayText(this.bossSprite, i18n.i18nstr`挥刀相向`)

                            bossFightBegin = true
                            controller.moveSprite(this.heroSprite)
                            story.cancelAllCutscenes()
                        })
                        
                        
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
                story.printText(i18n.i18nstr`你来了`, 120, 120)
                story.printText(i18n.i18nstr`你为什么不早点来!!!`, 120, 120)
                scene.cameraShake(6, 500)
                story.printText(state.playerName, 120, 120)
                story.printText(i18n.i18nstr`你还认得我吗？`, 120, 120)

                story.spriteMoveToLocation(this.heroSprite, 120, 168, 50)

                scene.centerCameraAt(120, 144)

                pause(500)

                story.spriteSayText(this.bossSprite, i18n.i18nstr`停!`)
                scene.cameraShake(8, 500)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`不要再过来了`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`我不想你看到我这个样子`)

                story.printCharacterText(i18n.i18nstr`看来我们还是来晚了`, "???")
                story.printCharacterText(i18n.i18nstr`封印已经解除了`, "???")

                this.bossSprite.setImage(assets.image`playmate_front_doomed`)

                story.spriteSayText(this.bossSprite, i18n.i18nstr`你拿着的是什么？`)
                story.spriteSayText(this.bossSprite, "!!!!!!!!")
                scene.cameraShake(8, 500)

                story.spriteSayText(this.bossSprite, i18n.i18nstr`是封印之剑？`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`没有勇者的血脉`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`怎么能用封印之剑？！`)

                story.printCharacterText(i18n.i18nstr`他就是` + state.papaName() + i18n.i18nstr`的儿子`, i18n.i18nstr`封印之剑`)
                story.printCharacterText(i18n.i18nstr`当然能用挥舞我`, i18n.i18nstr`封印之剑`)
                story.printCharacterText(i18n.i18nstr`还能像以前一样`, i18n.i18nstr`封印之剑`)
                story.printCharacterText(i18n.i18nstr`封印你`, i18n.i18nstr`封印之剑`)

                story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈哈哈`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`哈哈哈哈哈哈`)
                story.spriteSayText(this.bossSprite, i18n.i18nstr`他办得到吗？！`)

                this.bossSprite.setImage(assets.image`playmate_front`)
                this.bossSprite.x += 5
                this.bossSprite.y += 4
                
                story.spriteSayText(this.bossSprite, state.playerName + i18n.i18nstr`,是我`)
                story.spriteSayText(this.bossSprite, state.playerName + i18n.i18nstr`,放下手里的剑`)
                story.spriteSayText(this.bossSprite, state.playerName + i18n.i18nstr`,我是你的青梅竹马`)

                let fireballSprite = this.createSprite(assets.image`bossFireball`, SpriteKind.FirstFireball)
                fireballSprite.x = this.heroSprite.x + 32
                fireballSprite.y = this.heroSprite.y + 32

                meteoroid.launchMeteoroidToPosition(fireballSprite, this.heroSprite.x, this.heroSprite.y, 50, 2000, 8)
                
                scene.cameraFollowSprite(this.heroSprite)
                
            })
        }
        
    }
}   