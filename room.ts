// 在此处添加您的代码
namespace room {
    export interface Room {
        enterRoom(heroSprite: Sprite): void
        leaveRoom(name: string): void
    }

    export abstract class AbstractRoom implements Room {

        protected exits: { [key: string]: Room }
        protected heroSprite: Sprite

        addExit(nextRoom: Room, name: string) {
            if (this.exits == undefined) {
                this.exits = {}
            }
            this.exits[name] = nextRoom
        }

        protected didEnterRoom(): void {
        }

        protected willLeaveRoom(): void {
        }

        protected roomTilemap(): tiles.TileMapData{return null}

        public enterRoom(heroSprite: Sprite): void {
            this.heroSprite = heroSprite
            tiles.setTilemap(this.roomTilemap())
            this.didEnterRoom()
        }
        public leaveRoom(name: string = "DEFAULT"): void {
            this.willLeaveRoom()
            let nextRoom = this.exits[name] as Room;
            nextRoom.enterRoom(this.heroSprite);
        }

    }

    export class HouseRoom extends AbstractRoom {
        protected roomTilemap(): tiles.TileMapData {
            return tilemap`house`
        }

        didEnterRoom(): void {
            multilights.toggleLighting(false)
            multilights.removeLightSource(this.heroSprite)
            tiles.placeOnTile(this.heroSprite, tiles.getTileLocation(2, 2))
            this.heroSprite.x -= 8 // move left a little bit to center of the bed
            controller.moveSprite(this.heroSprite)
            story.startCutscene(function() {
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
            })
        }

    }

    export class CaveRoom extends AbstractRoom {

        private swordInStone: Sprite

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`cave`
        }

        didEnterRoom(): void {
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
            this.swordInStone = sprites.create(img`  
    c c c c c c c c c 5 b b b c c c 
    c c c c c c b b b 5 d d d b c c 
    c c c c c c b d 5 8 5 d d b c c 
    c c c c b b d d d 1 d b b d c c 
    c c c c b d d d d 1 d b b d b c 
    c c c c c d d d d 1 b b d b c c 
    c c c b c c b b b 1 d d b c c c 
    c c b b c c c b d 1 b c c c c c 
    c b b d d d b b b b b b c c c c 
    c c d d d d d d b d b c c c b c 
    c c b d d d b b d b c c c b b c 
    c b c c c c b d d b b b b b c c 
    c c b b b d d b c c b b b b c c 
    c c c c c c c c c b b b b c c c 
    c c c c c b b b b b b b c c c c 
    c c c c c c c c c c c c c c c c 
    `, SpriteKind.SWORD_IN_STONE_KIND)
            multilights.toggleLighting(true)
            multilights.addLightSource(this.swordInStone, 16)
            tiles.placeOnTile(this.swordInStone, tiles.getTileLocation(5, 4))
            let notFinished = true
            story.startCutscene(function () {
                story.printText("勇者.", 80, 80)
                story.printText("勇者..", 80, 80)
                story.printText("勇者...", 80, 80)
                story.printText("到我跟前来...", 80, 80)
                story.spriteMoveToLocation(this.heroSprite, 88, 96, 40)
                story.printCharacterText("这世界面临灾难...", "???")
                story.printCharacterText("你愿意和我缔结链接吗？", "???")
                story.showPlayerChoices("愿意", "不愿意")
                if (story.getLastAnswer() == "愿意") {
                    willingToBind = true
                    story.printCharacterText("等待合适的时机吧", "???")
                } else {
                    story.printCharacterText("...", "???")
                }
                notFinished = false
            })

            while (notFinished) {
                pause(1)
            }
            this.leaveRoom("DEFAULT")
        }

        willLeaveRoom(): void {
            this.swordInStone.destroy()
            multilights.removeLightSource(this.heroSprite)
        }
    }
}