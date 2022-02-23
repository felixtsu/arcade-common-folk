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


}