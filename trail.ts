namespace trail {

    export const ROOM_NAME = "TRAIL"

    class MonsterLocation {
        location:number[]
        triggerLocations:number[][]

        constructor(location:number[]) {
            this.location = location
            this.triggerLocations = []
        }

        static on(location:number[]) :MonsterLocation{
            return new MonsterLocation(location)
        }

        addTrigger(triggerLocation:number[]) :MonsterLocation{
            this.triggerLocations.push(triggerLocation)
            return this;
        }

        getLocation() :tiles.Location {
            return tiles.getTileLocation(this.location[0], this.location[1])
        }

        getTriggerLocations() : tiles.Location[] {
            return this.triggerLocations.map(loc=>tiles.getTileLocation(loc[0], loc[1]))
        }

        
    }

    export class TrailRoom extends room.AbstractRoom {

        private enterTimes = 1

        private monsterLocations: MonsterLocation[] = [
            MonsterLocation.on([8,4]).addTrigger([6,4]).addTrigger([6,5]),
            MonsterLocation.on([12, 9]).addTrigger([13,8]),
            MonsterLocation.on([10, 17]).addTrigger([8, 16]).addTrigger([8, 17])
        ]

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

            this.monsterLocations.forEach(monsterLocation => {
                monster.createWizard(monsterLocation.getLocation(), monsterLocation.getTriggerLocations())
            })

            sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, (sprite: Sprite, otherSprite: Sprite) => {

                if (state.soulBound) {
                    sprite.sayText("A", 50)
                    if (controller.A.isPressed()) {
                        story.startCutscene(()=>{
                            controller.moveSprite(sprite, 0, 0)
                            
                            music.smallCrash.playUntilDone()
                            music.smallCrash.playUntilDone()
                            music.smallCrash.playUntilDone()

                            otherSprite.destroy()

                            info.changeLifeBy(-1)

                            sprite.setImage(img`
                                . . . . . . . . . . . . . . . .
                                . . . . . . . . . . . . . . . .
                                . . . . . . . f f f . . . . . .
                                . . . . . . f e f f f f f f . .
                                . . . . . f e e e f e f e f f .
                                . . f e 4 f e 4 4 f 2 f e e f .
                                . f e d d e e d 4 f 2 f e e e f
                                f f e d d e 4 4 e f 2 e f e e f
                                f f f e e 4 d 1 b f f e f e e f
                                f f 4 2 2 4 d f f e f 2 e f e f
                                . f 5 2 2 4 d d 4 e f 2 e 2 f f
                                . f 5 2 2 e d d 4 e f 2 e 2 2 f
                                . . f f f f f e e f e 2 e 2 f .
                                . . . . . . . f e f 2 e f f . .
                                . . . . . . . . f f f f . . . .
                                . . . . . . . . . . . . . . . .
                            `)

                        })
                    }
                } else {

                    
                }
            })


            // first time
            if (this.enterTimes == 0) {
                story.startCutscene(function () {
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
            } else {
                controller.moveSprite(this.heroSprite)
                scene.cameraFollowSprite(this.heroSprite)
            }


            this.enterTimes += 1
        }

    }
}