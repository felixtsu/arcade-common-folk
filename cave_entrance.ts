namespace SpriteKind {
    export const EvilWorshipper = SpriteKind.create()
}

namespace cave_entrance {

    export const ROOM_NAME = "CAVE_ENTRANCE"

    const WORSHIPPER_DIALOGS = ["新王要来了", "大人苏醒了", "魔族的大日子", "来吧，黑暗"]

    export class CaveEntranceRoom extends room.AbstractRoom {
        protected roomTilemap(): tiles.TileMapData {
            return tilemap`caveEntrance`
        }

        protected willLeaveRoom(exit: string): boolean {
            let result = -1
            story.startCutscene(()=> {
                controller.moveSprite(this.heroSprite, 0, 0)
                story.printCharacterText("接下来就是最重决战了")
                story.printCharacterText("一旦开始不能回头")
                story.showPlayerChoices("准备好了", "还是再看看")
                if (story.checkLastAnswer("还是再看看")) {
                    story.spriteMoveToLocation(this.heroSprite, 48, 128, 50)
                    result = 0
                } else {
                    result = 1
                }
                controller.moveSprite(this.heroSprite)
                story.cancelAllCutscenes()
            })

            while (result == -1) pause(10);
            return result == 1? true: false
        }

        didEnterRoom(entrance?: string): void {
            let candidates :tiles.Location[] = []
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath1))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath2))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath3))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath4))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath5))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath6))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath7))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath8))
            candidates = candidates.concat(tiles.getTilesByType(sprites.castle.tilePath9))
            
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

            tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(13, 0))

            controller.moveSprite(this.heroSprite)
            scene.cameraFollowSprite(this.heroSprite)

            for (let i = 0 ; i < 4 ; i++ ) {    
                tiles.placeOnTile(this.createSprite(assets.image`wizard`, SpriteKind.EvilWorshipper), candidates[randint(0, candidates.length - 1)])
            }

            sprites.onOverlap(SpriteKind.Player, SpriteKind.EvilWorshipper, (sprite:Sprite, otherSprite:Sprite)=> {
                story.spriteSayText(otherSprite, WORSHIPPER_DIALOGS[randint(0, WORSHIPPER_DIALOGS.length - 1)])
            })
        }


        constructor() {
            super(ROOM_NAME)
        }
    }
}
