namespace SpriteKind {
    export const House = SpriteKind.create()
    export const PlayMate = SpriteKind.create()
    export const PlayMateCutsceneTrigger = SpriteKind.create()
    export const GuidBoard = SpriteKind.create()
    export const TrailEntranceFromVillage = SpriteKind.create()
}

namespace village{

    export const ROOM_NAME = "VILLAGE"

    export class VillageRoom extends room.AbstractRoom {

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`village`
        }
 
        constructor() {
            super(ROOM_NAME)
        }
    

        willLeaveRoom(exit: string) :boolean{
            if (exit == trail.ROOM_NAME) {
                if (!state.playmateCapturedByBat) {
                    let backToLocation = tiles.getTileLocation(13, 14)
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        story.spriteSayText(this.heroSprite, "现在还是先别下山吧")
                        story.spriteMoveToLocation(this.heroSprite, backToLocation.x, backToLocation.y, 32)
                        controller.moveSprite(this.heroSprite)
                        story.cancelAllCutscenes()
                    })
                    return false
                } else if (!state.rustySwordGet) {
                    let backToLocation = tiles.getTileLocation(13, 14)
                    story.startCutscene(() => {
                        controller.moveSprite(this.heroSprite, 0, 0)
                        story.spriteSayText(this.heroSprite, "把衣柜里的武器带上吧")
                        story.spriteMoveToLocation(this.heroSprite, backToLocation.x, backToLocation.y, 32)
                        controller.moveSprite(this.heroSprite)
                        story.cancelAllCutscenes()
                    })
                    return false
                }
            }
            scene.setBackgroundImage(img`.`)
            return true
        }

        preparesceneSprites() {
            let houseSprite = this.createSprite(img`
                ....................e2e22e2e....................
                .................222eee22e2e222.................
                ..............222e22e2e22eee22e222..............
                ...........e22e22eeee2e22e2eeee22e22e...........
                ........eeee22e22e22e2e22e2e22e22e22eeee........
                .....222e22e22eeee22e2e22e2e22eeee22e22e222.....
                ...22eeee22e22e22e22eee22eee22e22e22e22eeee22...
                4cc22e22e22eeee22e22e2e22e2e22e22eeee22e22e22cc4
                6c6eee22e22e22e22e22e2e22e2e22e22e22e22e22eee6c6
                46622e22eeee22e22eeee2e22e2eeee22e22eeee22e22664
                46622e22e22e22eeee22e2e22e2e22eeee22e22e22e22664
                4cc22eeee22e22e22e22eee22eee22e22e22e22eeee22cc4
                6c622e22e22eeee22e22e2e22e2e22e22eeee22e22e226c6
                466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
                46622e22eeee22e22e22e2e22e2e22e22e22eeee22e22664
                4cc22e22e22e22e22eeee2e22e2eeee22e22e22e22e22cc4
                6c622eeee22e22eeee22eee22eee22eeee22e22eeee226c6
                46622e22e22eeee22e22e2e22e2e22e22eeee22e22e22664
                466eee22e22e22e22e22e2e22e2e22e22e22e22e22eee664
                4cc22e22eeee22e22e22e2e22e2e22e22e22eeee22e22cc4
                6c622e22e22e22e22e22eee22eee22e22e22e22e22e226c6
                46622eeee22e22e22eeecc6666cceee22e22e22eeee22664
                46622e22e22e22eeecc6666666666cceee22e22e22e22664
                4cceee22e22eeecc66666cccccc66666cceee22e22eeecc4
                6c622e22eeecc66666cc64444446cc66666cceee22e226c6
                46622e22cc66666cc64444444444446cc66666cc22e22664
                46622cc6666ccc64444444444444444446ccc6666cc22664
                4ccc6666ccc6444bcc666666666666ccb4446ccc6666ccc4
                cccccccc6666666cb44444444444444bc6666666cccccccc
                64444444444446c444444444444444444c64444444444446
                66cb444444444cb411111111111111114bc444444444bc66
                666cccccccccccd166666666666666661dccccccccccc666
                6666444444444c116eeeeeeeeeeeeee611c4444444446666
                666e2222222e4c16e4e44e44e44e44ee61c4e2222222e666
                666eeeeeeeee4c16e4e44e44e44e44ee61c4eeeeeeeee666
                666eddddddde4c66f4e4effffffe44ee66c4eddddddde666
                666edffdffde4c66f4effffffffff4ee66c4edffdffde666
                666edccdccde4c66f4effffffffffeee66c4edccdccde666
                666eddddddde4c66f4eeeeeeeeeeeeee66c4eddddddde666
                c66edffdffde4c66e4e44e44e44e44ee66c4edffdffde66c
                c66edccdccde4c66e4e44e44e44e44ee66c4edccdccde66c
                cc66666666664c66e4e44e44e44feeee66c46666666666cc
                .c66444444444c66e4e44e44e44ffffe66c44444444466c.
                ..c64eee4eee4c66f4e44e44e44f44fe66c4eee4eee46c..
                ...c4eee4eee4c66f4e44e44e44effee66c4eee4eee4c...
                ....644444444c66f4e44e44e44e44ee66c444444446....
                .....64eee444c66f4e44e44e44e44ee66c444eee46.....
                ......6ccc666c66e4e44e44e44e44ee66c666ccc6......
            `, SpriteKind.House)
            tiles.placeOnTile(houseSprite, tiles.getTileLocation(2, 5))
            sprites.onOverlap(SpriteKind.Player, SpriteKind.House, (sprite: Sprite, otherSprite: Sprite) => {
                this.leaveRoom(house.ROOM_NAME)
            })

            let guideboardSprite = this.createSprite(assets.image`路牌`, SpriteKind.GuidBoard)
            tiles.placeOnTile(guideboardSprite, tiles.getTileLocation(10,12))

            sprites.onOverlap(SpriteKind.Player, SpriteKind.GuidBoard, (sprite: Sprite, otherSprite: Sprite) => {
                otherSprite.sayText("A", 500)
                if (controller.A.isPressed()) {
                    story.printCharacterText("左:观景台\n右:下山")
                }
            })

            sprites.onOverlap(SpriteKind.Player, SpriteKind.TrailEntranceFromVillage, (sprite: Sprite, otherSprite: Sprite) => {
                
                
            })
        }

        didEnterRoom(entrance?:string) {
            scene.setBackgroundImage(assets.image`villageView`)

            this.preparesceneSprites()
            
            scene.cameraFollowSprite(this.heroSprite)
            controller.moveSprite(this.heroSprite)

            if (entrance == house.ROOM_NAME) {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(2, 8))
            } else {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(14, 14))
            }

            if (!state.playmateCapturedByBat) {
                controller.moveSprite(this.heroSprite, 0, 0)

                story.startCutscene(() => {
                    story.printText("马克", 150, 110)
                    story.printText("马克...", 150, 110)
                    story.printText("你快过来看", 150, 110)
                    controller.moveSprite(this.heroSprite)
                })

                let playmateSprite = this.createSprite(img`
                . f f f . f f f f . f f f .
                f f f f f c c c c f f f f f
                f f f f b c c c c b f f f f
                f f f c 3 c c c c 3 c f f f
                . f 3 3 c c c c c c 3 3 f .
                . f c c c c c c c c c c f .
                . f f c c c c c c c c f f .
                . f f f c c c c c c f f f .
                . f f f f f f f f f f f f .
                . . f f f f f f f f f f . .
                . . e f f f f f f f f e . .
                . e 4 f f f f f f f f 4 e .
                . 4 d f 3 3 3 3 3 3 c d 4 .
                . 4 4 f 6 6 6 6 6 6 f 4 4 .
                . . . . f f f f f f . . . .
                . . . . f f . . f f . . . .
            `, SpriteKind.PlayMate)
                tiles.placeOnTile(playmateSprite, tiles.getTileLocation(13, 6))


                let playmateCutSceneTriggerSprite = this.createSprite(img`
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
                `, SpriteKind.PlayMateCutsceneTrigger)
                tiles.placeOnTile(playmateCutSceneTriggerSprite, tiles.getTileLocation(13, 7))
                playmateCutSceneTriggerSprite.setFlag(SpriteFlag.Invisible, true)

                sprites.onOverlap(SpriteKind.Player, SpriteKind.PlayMateCutsceneTrigger, (sprite:Sprite, otherSprite:Sprite) => {
                    otherSprite.destroy()
                    state.playmateCapturedByBat = true
                    controller.moveSprite(this.heroSprite, 0, 0)
                    story.startCutscene(()=> {
                        playmateSprite.setImage(img`
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
                        pause(500)
                        story.spriteSayText(playmateSprite, "马克,你看")
                        pause(500)
                        playmateSprite.setImage(img`
                            . f f f . f f f f . f f f .
                            f f f f f c c c c f f f f f
                            f f f f b c c c c b f f f f
                            f f f c 3 c c c c 3 c f f f
                            . f 3 3 c c c c c c 3 3 f .
                            . f c c c c c c c c c c f .
                            . f f c c c c c c c c f f .
                            . f f f c c c c c c f f f .
                            . f f f f f f f f f f f f .
                            . . f f f f f f f f f f . .
                            . . e f f f f f f f f e . .
                            . e 4 f f f f f f f f 4 e .
                            . 4 d f 3 3 3 3 3 3 c d 4 .
                            . 4 4 f 6 6 6 6 6 6 f 4 4 .
                            . . . . f f f f f f . . . .
                            . . . . f f . . f f . . . .
                        `)
                        story.spriteSayText(playmateSprite, "雪融了")
                        pause(500)

                        scene.cameraFollowSprite(playmateSprite)
                        let edgeLoaction = tiles.getTileLocation(13,3)
                        story.spriteMoveToLocation(playmateSprite, edgeLoaction.x, edgeLoaction.y, 16)

                        pause(500)
                        story.spriteSayText(playmateSprite, "啊!!!!!!!!!!!")

                        playmateSprite.vy = 16

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
                        scene.cameraFollowSprite(batSprite)
                        tiles.placeOnTile(batSprite, tiles.getTileLocation(13, 1))
                        animation.runImageAnimation(batSprite, [img`
    . . f f f . . . . . . . . f f f 
    . f f c c . . . . . . f c b b c 
    f f c c . . . . . . f c b b c . 
    f c f c . . . . . . f b c c c . 
    f f f c c . c c . f c b b c c . 
    f f c 3 c c 3 c c f b c b b c . 
    f f b 3 b c 3 b c f b c c b c . 
    . c 1 b b b 1 b c b b c c c . . 
    . c 1 b b b 1 b b c c c c . . . 
    c b b b b b b b b b c c . . . . 
    c b 1 f f 1 c b b b b f . . . . 
    f f 1 f f 1 f b b b b f c . . . 
    f f 2 2 2 2 f b b b b f c c . . 
    . f 2 2 2 2 b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
                                                `, img`
                                                . . f f f . . . . . . . . . . . 
                                                f f f c c . . . . . . . . f f f 
                                                f f c c c . c c . . . f c b b c 
                                                f f c 3 c c 3 c c f f b b b c . 
                                                f f c 3 b c 3 b c f b b c c c . 
                                                f c b b b b b b c f b c b c c . 
                                                c c 1 b b b 1 b c b b c b b c . 
                                                c b b b b b b b b b c c c b c . 
                                                c b 1 f f 1 c b b c c c c c . . 
                                                c f 1 f f 1 f b b b b f c . . . 
                                                f f f f f f f b b b b f c . . . 
                                                f f 2 2 2 2 f b b b b f c c . . 
                                                . f 2 2 2 2 2 b b b c f . . . . 
                                                . . f 2 2 2 b b b c f . . . . . 
                                                . . . f f f f f f f . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                `, img`
                                                . . . . . . . . . . . . . . . . 
                                                . . . . . . . . . . . . . . . . 
                                                . . . c c . c c . . . . . . . . 
                                                . . f 3 c c 3 c c c . . . . . . 
                                                . f c 3 b c 3 b c c c . . . . . 
                                                f c b b b b b b b b f f . . . . 
                                                c c 1 b b b 1 b b b f f . . . . 
                                                c b b b b b b b b c f f f . . . 
                                                c b 1 f f 1 c b b f f f f . . . 
                                                f f 1 f f 1 f b c c b b b . . . 
                                                f f f f f f f b f c c c c . . . 
                                                f f 2 2 2 2 f b f b b c c c . . 
                                                . f 2 2 2 2 2 b c c b b c . . . 
                                                . . f 2 2 2 b f f c c b b c . . 
                                                . . . f f f f f f f c c c c c . 
                                                . . . . . . . . . . . . c c c c 
                                                `, img`
                                                . f f f . . . . . . . . f f f . 
                                                f f c . . . . . . . f c b b c . 
                                                f c c . . . . . . f c b b c . . 
                                                c f . . . . . . . f b c c c . . 
                                                c f f . . . . . f f b b c c . . 
                                                f f f c c . c c f b c b b c . . 
                                                f f f c c c c c f b c c b c . . 
                                                . f c 3 c c 3 b c b c c c . . . 
                                                . c b 3 b c 3 b b c c c c . . . 
                                                c c b b b b b b b b c c . . . . 
                                                c 1 1 b b b 1 1 b b b f c . . . 
                                                f b b b b b b b b b b f c c . . 
                                                f b c b b b c b b b b f . . . . 
                                                . f 1 f f f 1 b b b c f . . . . 
                                                . . f b b b b b b c f . . . . . 
                                                . . . f f f f f f f . . . . . . 
                                                `], 200, true)

                        story.spriteMoveToLocation(batSprite, edgeLoaction.x, edgeLoaction.y + 16, 48)

                        playmateSprite.destroy()
                        batSprite.setFlag(SpriteFlag.Ghost, true)
                        story.spriteSayText(batSprite, "sss...")
                        story.spriteMoveToLocation(batSprite, 16*16+8, 3*16, 32)

                        scene.cameraFollowSprite(this.heroSprite)
                        controller.moveSprite(this.heroSprite)
                    })
                })
            }
               
        }

    }

}