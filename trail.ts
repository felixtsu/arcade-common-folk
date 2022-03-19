// 在此处添加您的代码
namespace trail {

    export const ROOM_NAME = "TRAIL"

    export class TrailRoom extends room.AbstractRoom {

        private enterTimes = 0

        private monsterLocations: number[][] = [[8,4], [12,9], [10,17]]

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`trail`
        }
        constructor() {
            super(ROOM_NAME)
        }

        didEnterRoom(entrance?: string): void {
            scene.setBackgroundImage(assets.image`villageView`)
            if (entrance == villageRoom.getRoomName()) {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(1, 1))
            }
            for (let monsterLocation of this.monsterLocations) {
                let monsterSprite = this.createSprite(img`
.......ccc......
......cb5c......
....ccceeccc....
..ccbceee5cccc..
.cbb5b5eeeb5bbc.
.cb5ebbe5bb55bc.
..fee5bbbbeeec..
..fceeeeee5ecf..
..fcbe2ee2bacf..
..ffaafbbfabff..
...ffbbbbbbff...
...eefeeeefee...
..eecbbbb5bfee..
..eef5eeeebfee..
....cbbeb5bc....
.....eaaaae.....
`, SpriteKind.Enemy);
                tiles.placeOnTile(monsterSprite, tiles.getTileLocation(monsterLocation[0], monsterLocation[1]))
            }
            
            sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, (sprite:Sprite, otherSprite:Sprite)=>{
                story.startCutscene(() => {
                    controller.moveSprite(sprite, 0, 0)
                    story.spriteSayText(otherSprite, "手无寸铁的小子")
                    story.spriteSayText(otherSprite, "去死吧")
                    let attackSprite = this.createSprite(img`
                        . . . . . . . . . . . . . . . .
                        . . . . . . . 4 c . . . . . . .
                        . . . . . . . 2 c . . . . . . .
                        . . . . . . 2 5 2 c . . . . . .
                        . . . . . . e e e c . . . . . .
                        . . . . . . d d d 1 . . . . . .
                        . . . . . . d b d 1 . . . . . .
                        . . . . . d d b d 1 1 . . . . .
                        . . . . . d d b d d 1 . . . . .
                        . . . . . d d b d d 1 . . . . .
                        . . . . d d d b d d d 1 . . . .
                        . . . . d d d b d d d 1 . . . .
                        . . . . . d d b d d 1 . . . . .
                        . . . . . . d d d 1 . . . . . .
                        . . . . . . . . . . . . . . . .
                        . . . . . . . . . . . . . . . .
                    `)
                    attackSprite.x = sprite.x
                    attackSprite.y = sprite.y - 32
                    story.spriteMoveToLocation(attackSprite, heroSprite.x, heroSprite.y, 32)
                    
                    if (!willingToBind) {
                        story.spriteSayText(sprite, "啊...")
                        multilights.toggleLighting(true)
                        multilights.addLightSource(heroSprite, 20)
                        for (let i = 20; i >= 0; i -= 5) {
                            multilights.bandWidthOf(heroSprite, i)
                            pause(1000)
                        }
                        story.printCharacterText("谁让你那时候说不愿意", "???")
                        story.printCharacterText("你有能力对抗魔王吗", "???")
                        story.printCharacterText("不自量力的家伙", "???")
                        story.printCharacterText("只能等待下一个天选之人了", "???")
                        pause(2000)
                        game.reset()
                    } else {
                        story.printCharacterText("时候到了...", "???")
                        story.printCharacterText("和我建立连接吧...", "???")
                        game.splash("获得了A的攻击能力")
                        controller.moveSprite(sprite)
                    }
                })
            })
            
            // first time
            if (this.enterTimes == 0) {
                story.startCutscene(function() {
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
                    batSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
                    scene.cameraFollowSprite(batSprite)

                    tiles.placeOnTile(batSprite, tiles.getTileLocation(7, 5))

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


                    let endLocation = tiles.getTileLocation(12, 19)
                    story.spriteMoveToLocation(batSprite, endLocation.x, endLocation.y, 64)
                    batSprite.destroy()
                    controller.moveSprite(this.heroSprite)
                    scene.cameraFollowSprite(this.heroSprite)
                })
            }
        }

        willLeaveRoom(): void {
        }
    }
}