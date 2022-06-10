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

        didEnterRoom(entrance?: string): void {
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
                tiles.placeOnRandomTile(this.createSprite(assets.image`wizard`, SpriteKind.EvilWorshipper), sprites.castle.tilePath5)
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
