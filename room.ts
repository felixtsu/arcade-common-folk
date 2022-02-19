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
            multilights.removeLightSource(heroSprite)
            tiles.placeOnTile(heroSprite, tiles.getTileLocation(2, 2))
        }

    }

    export class CaveRoom extends AbstractRoom {

        private swordInStone: Sprite

        protected roomTilemap(): tiles.TileMapData {
            return tilemap`cave`
        }

        didEnterRoom(): void {
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