// Add your code here
namespace house {

    export const ROOM_NAME = "HOUSE"

    export class HouseRoom extends room.AbstractRoom {
        protected roomTilemap(): tiles.TileMapData {
           return tilemap`house`
        }

        private closetSprite:Sprite

        willLeaveRoom() :void{
            this.closetSprite.destroy()
        }

        constructor() {
            super(ROOM_NAME)

            scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.collectibleInsignia, (sprite: Sprite, location: tiles.Location) => {
                this.leaveRoom(village.ROOM_NAME)
            })
        }

        placeFurniture() {
            this.closetSprite = sprites.create(assets.image`衣柜`, SpriteKind.Enemy)
            tiles.placeOnTile(this.closetSprite, tiles.getTileLocation(7, 1))
            this.closetSprite.x += 8
            this.closetSprite.y -= 8
        }

        fromCave() {
            multilights.toggleLighting(false)
            multilights.removeLightSource(this.heroSprite)
            tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(2, 2))
            this.heroSprite.x -= 8 // move left a little bit to center of the bed
            
            story.startCutscene(function () {
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
                story.printCharacterText("又是这个梦", "???")
                if (willingToBind) {
                    story.printCharacterText("每次说了愿意又要我等", "???")
                    story.printCharacterText("下次就说不愿意好了", "???")
                } else {
                    story.printCharacterText("每次说了不愿意就不说话", "???")
                    story.printCharacterText("下次就说愿意好了", "???")
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

        didEnterRoom(entrance?:string): void {
            this.placeFurniture()
            if (entrance == cave.ROOM_NAME) { 
                this.fromCave()
            } else if (entrance == village.ROOM_NAME) {
                tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(5,4))
            }

            
        }

    }
}