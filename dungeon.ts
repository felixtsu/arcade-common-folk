namespace SpriteKind {
    export const Firewood = SpriteKind.create()
    export const Candle = SpriteKind.create()
    export const OrbBase = SpriteKind.create()
    export const Orb = SpriteKind.create()
}

namespace dungeon {
    
    export const ROOM_NAME = "DUNGEON"

    let orbSprite: Sprite = null
    let aimingLine: aiming.AimingLine = null
    let aimingOrb = false
    let torchOn = false
    let orbBase: Sprite = null
    let firewoodSprite: Sprite = null
    let lightFirewoodShown = false
    let torchIndicatorShown = false
    let activatedButton = 0
    let currentRoomNumber = 0
    let leverUp = false
    leverUp = true
    currentRoomNumber = 1
    activatedButton = 0
    torchIndicatorShown = false
    lightFirewoodShown = false

    function revealTreasureIfAllButtonActivated() {
        if (activatedButton == 3) {
            tiles.setTileAt(tiles.getTileLocation(7, 1), sprites.dungeon.chestClosed)
        }
    }
   
    function toggleLever() {
        if (leverUp) {
            tiles.setTileAt(tiles.getTileLocation(17, 0), sprites.dungeon.greenSwitchDown)
            for (let 值 of sprites.allOfKind(SpriteKind.Candle)) {
                multilights.addLightSource(值, 10)
            }
        } else {
            tiles.setTileAt(tiles.getTileLocation(17, 0), sprites.dungeon.greenSwitchUp)
            for (let 值2 of sprites.allOfKind(SpriteKind.Candle)) {
                multilights.removeLightSource(值2)
            }
        }
        leverUp = !(leverUp)
    }

    
    function pressButton(answer: number) {
        if (game.askForNumber("?", 1) == answer) {
            activatedButton += 1
            return true
        } else {
            return false
        }
    }
    

    export class DungeonRoom extends room.AbstractRoom {

        private toggleLight() {
        if (currentRoomNumber != 1) {
            if (torchOn) {
                multilights.removeLightSource(this.heroSprite)
            } else {
                torchIndicatorShown = true
                multilights.addLightSource(this.heroSprite, 12)
            }
            torchOn = !(torchOn)
        }
    }

         private enterRoom1() {
        tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(4, 1))
        multilights.toggleLighting(false)
    }
        private enterRoom4() {
        currentRoomNumber = 4
        multilights.toggleLighting(true)
        tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(31, 11))
    }

        private enterRoom3() {
        currentRoomNumber = 3
        multilights.toggleLighting(true)
        tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(17, 14))
    }

    private enterRoom2() {
        currentRoomNumber = 2
        multilights.toggleLighting(true)
        tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(17, 5))
    }

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`dungeon`
        }

        public constructor() {
            super(ROOM_NAME)
        }

        didEnterRoom(entrance?: string): void {
            story.startCutscene(()=> {
                pause(500)
                story.printCharacterText(i18n.i18nstr`与此同时...`, i18n.i18nstr`旁白`)
                story.printCharacterText(i18n.i18nstr`被带走的` + state.playmateName, i18n.i18nstr`旁白`)
                let batSprite = this.createSprite(img`
                            . . f f f . . . . . . . . f f f
                            . f f c c . . . . . . f c b b c
                            f f c c . . . . . . f c b b c .
                            f c f c . . . . . . f b c c c .
                            f f f c c . c c . f c b b c c .
                            f f c 3 c c 3 c c f b c b b c .
                            f f b 3 b c 3 b c f b c c b c .
                            . c b b b b b b c b b c c c . .
                            . c 1 b b b 1 b b c c c c . . .
                            c b b b b b b b b b c c . . . .
                            c b c b b b c b b b b f . . . .
                            f b 1 f f f 1 b b b b f c . . .
                            f b b b b b b b b b b f c c . .
                            . f b b b b b b b b c f . . . .
                            . . f b b b b b b c f . . . . .
                            . . . f f f f f f f . . . . . .
                        `)
                batSprite.x = -8
                batSprite.y = -8
                batSprite.setFlag(SpriteFlag.Ghost, true)

                scene.cameraFollowSprite(batSprite)
                story.spriteMoveToLocation(batSprite, 88, 8, 50)

                this.heroSprite.setImage(img`
                    . f f f . f f f f . f f f .
                    f f f f f c c c c f f f f f
                    f f f f b c c c c b f f f f
                    f f f c 3 c c c c 3 c f f f
                    . f 3 3 c c c c c c 3 3 f .
                    . f c c c c 4 4 c c c c f .
                    . f f c c 4 4 4 4 c c f f .
                    . f f f b f 4 4 f b f f f .
                    . f f 4 1 f d d f 1 4 f f .
                    . . f f d d d d d d f f . .
                    . . e f e 4 4 4 4 e f e . .
                    . e 4 f b 3 3 3 3 b f 4 e .
                    . 4 d f 3 3 3 3 3 3 c d 4 .
                    . 4 4 f 6 6 6 6 6 6 f 4 4 .
                    . . . . f f f f f f . . . .
                    . . . . f f . . f f . . . .
                `)
                scene.cameraFollowSprite(this.heroSprite)
                meteoroid.launchMeteoroidToPosition(this.heroSprite, 88, 40, 100, 1000)

                story.spriteMoveToLocation(this.heroSprite, 88, 40, 100)
                scene.cameraShake(4, 500)
                music.knock.playUntilDone()
                
                this.heroSprite.sayText(i18n.i18nstr`啊！！！！！！`, 2000, true)

                story.spriteMoveToLocation(batSprite, 172, 24, 50)
                batSprite.destroy()

                story.printCharacterText(i18n.i18nstr`这是哪里？`, state.playmateName)
                controller.moveSprite(this.heroSprite)
            })

            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonPink, function (sprite, location) {
                if (pressButton(3)) {
                    music.playTone(262, music.beat(BeatFraction.Quarter))
                    tiles.setTileAt(location, sprites.dungeon.buttonPinkDepressed)
                    revealTreasureIfAllButtonActivated()
                } else {
                    tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(4, 1))
                    scene.cameraShake(4, 500)
                    info.changeLifeBy(-1)
                }
            })
         
            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.stairNorth, function (sprite, location) {
                this.enterRoom1()
            })
         
            sprites.onOverlap(SpriteKind.Player, SpriteKind.Firewood, function (sprite, otherSprite) {
                otherSprite.sayText("A", 500, false)
                if (controller.A.isPressed()) {
                    if (lightFirewoodShown || game.ask(i18n.i18nstr`点燃柴火？`)) {
                        lightFirewoodShown = true
                        otherSprite.destroy(effects.fire, 2000)
                        multilights.addLightSource(otherSprite, 6)
                    }
                }
            })
  
            sprites.onOverlap(SpriteKind.Player, SpriteKind.OrbBase, function (sprite, otherSprite) {
                if (controller.A.isPressed()) {
                    aimingOrb = true
                    aimingLine = aiming.createAimingLine(this.heroSprite, otherSprite)
                }
            })
            scene.onOverlapTile(SpriteKind.Player, assets.tile`dungeonRoom3`, function (sprite, location) {
                this.enterRoom4()
            })
          
            controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
                if (this.heroSprite.tileKindAt(TileDirection.Top, sprites.dungeon.greenSwitchUp) || this.heroSprite.tileKindAt(TileDirection.Top, sprites.dungeon.greenSwitchDown)) {
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        story.printCharacterText(i18n.i18nstr`墙上有一个拉杆`)
                        story.showPlayerChoices(i18n.i18nstr`拉`, i18n.i18nstr`还是算了`)
                        if (story.checkLastAnswer(i18n.i18nstr`拉`)) {
                            music.thump.play()
                            toggleLever()
                        } 
                        controller.moveSprite(this.heroSprite)
                        story.cancelAllCutscenes()
                    })
                    
                }
                if (this.heroSprite.tileKindAt(TileDirection.Center, sprites.dungeon.chestClosed)) {
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        story.showPlayerChoices(i18n.i18nstr`打开宝箱`, i18n.i18nstr`还是算了`)
                        if (story.checkLastAnswer(i18n.i18nstr`打开宝箱`)) {
                            music.wawawawaa.play()    
                        } else {
                            music.spooky.play()
                            story.printCharacterText(i18n.i18nstr`但是宝箱竟然自己打开了`)
                        }
                        tiles.setTileAt(tiles.getTileLocation(7, 1), sprites.dungeon.chestOpen)
                        story.printCharacterText(i18n.i18nstr`一股邪恶的诅咒落到了` + state.playmateName + i18n.i18nstr`的头上`)
                        music.knock.play()
                        story.printCharacterText(state.playmateName + i18n.i18nstr`晕了过去`)
                        multilights.toggleLighting(true)

                        story.cancelAllCutscenes()
                        caveEntranceRoom.enterRoom(this.heroSprite, dungeonRoom.getRoomName())                        
                    })
                }
            })
      
            scene.onOverlapTile(SpriteKind.Player, assets.tile`dungeonRoom1`, function (sprite, location) {
                this.enterRoom3()
            })
          
            controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
                this.toggleLight()
            })
            scene.onOverlapTile(SpriteKind.Player, assets.tile`dungeonLeverTile`, function (sprite, location) {
                sprite.sayText("?", 100, false)
            })
            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonOrange, function (sprite, location) {
                if (pressButton(8)) {
                    music.playTone(262, music.beat(BeatFraction.Quarter))
                    tiles.setTileAt(location, sprites.dungeon.buttonOrangeDepressed)
                    revealTreasureIfAllButtonActivated()
                } else {
                    tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(4, 1))
                    scene.cameraShake(4, 500)
                    info.changeLifeBy(-1)
                }
            })
           
            controller.A.onEvent(ControllerButtonEvent.Released, function () {
                if (aimingOrb) {
                    orbSprite = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 2 2 2 . . . . . . . 
            . . . . . 2 2 3 2 2 . . . . . . 
            . . . . 2 2 3 1 3 2 2 . . . . . 
            . . . . 2 3 1 1 1 3 2 . . . . . 
            . . . . 2 2 3 1 3 2 2 . . . . . 
            . . . . . 2 2 3 2 2 . . . . . . 
            . . . . . . 2 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Orb)
                    multilights.addLightSource(orbSprite, 8)
                    orbSprite.lifespan = 2000
                    orbSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
                    orbSprite.setPosition(this.heroSprite.x, this.heroSprite.y)
                    spriteutils.setVelocityAtAngle(orbSprite, spriteutils.angleFrom(orbSprite, orbBase), 80)
                    aiming.destroy(aimingLine)
                    aimingOrb = false
                }
            })
            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.doorOpenNorth, function (sprite, location) {
                this.enterRoom2()
            })
            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.buttonTeal, function (sprite, location) {
                if (pressButton(6)) {
                    music.playTone(262, music.beat(BeatFraction.Quarter))
                    tiles.setTileAt(location, sprites.dungeon.buttonTealDepressed)
                    revealTreasureIfAllButtonActivated()
                } else {
                    tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(4, 1))
                    scene.cameraShake(4, 500)
                    info.changeLifeBy(-1)
                }
            })

            for (let index = 0; index < 8; index++) {
                firewoodSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . e . . . . . . 
        . . e e . . . . e e . . . . . . 
        . . . e e d d e d . . . . . . . 
        . . . . d e d e d d d e . e . . 
        . . e . d d e e d e e e d e . . 
        . . e e e e e e d e e . d e . . 
        . . . f f e d e e e d d d f f . 
        . . f . e d d e d e e d d e f . 
        . . f f f f e e . e d e f f f . 
        . . . e . f f f f f f f f . . . 
        . . . e d e d e d e e e e e . . 
        . . e . d . . e d e . e e e . . 
        . . . . . . . e . e . . e . . . 
        . . . . . . . . . e . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Firewood)
                tiles.placeOnRandomTile(firewoodSprite, sprites.dungeon.floorDark2)
            }
            firewoodSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . e . . . . . . 
    . . e e . . . . e e . . . . . . 
    . . . e e d d e d . . . . . . . 
    . . . . d e d e d d d e . e . . 
    . . e . d d e e d e e e d e . . 
    . . e e e e e e d e e . d e . . 
    . . . f f e d e e e d d d f f . 
    . . f . e d d e d e e d d e f . 
    . . f f f f e e . e d e f f f . 
    . . . e . f f f f f f f f . . . 
    . . . e d e d e d e e e e e . . 
    . . e . d . . e d e . e e e . . 
    . . . . . . . e . e . . e . . . 
    . . . . . . . . . e . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Firewood)
            tiles.placeOnRandomTile(firewoodSprite, assets.tile`dungeonCode1`)

            let candleSprite = sprites.create(img`
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
    `, SpriteKind.Candle)
            tiles.placeOnRandomTile(candleSprite, sprites.dungeon.greenOuterEast2)
            candleSprite = sprites.create(img`
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
`, SpriteKind.Candle)
            tiles.placeOnRandomTile(candleSprite, sprites.dungeon.greenOuterSouth2)
            orbBase = sprites.create(assets.image`fireAlter`, SpriteKind.OrbBase)
            multilights.addLightSource(orbBase, 16)
            tiles.placeOnTile(orbBase, tiles.getTileLocation(34, 7))

            game.onUpdateInterval(2000, function () {
                if (currentRoomNumber != 1 && !(torchOn)) {
                    if (!(torchIndicatorShown)) {
                        game.splash(i18n.i18nstr`B使用火把`)
                    }
                }
            })

        }
        
        
    }

}