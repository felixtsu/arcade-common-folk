// 在此处添加您的代码
namespace room {
    export interface Room {
        enterRoom(heroSprite: Sprite, entrance?:string): void
        leaveRoom(name: string): void
        getRoomName():string
    }

    export abstract class AbstractRoom implements Room {

        protected exits: { [key: string]: Room }
        protected heroSprite: Sprite

        protected name:string
        
        constructor(name:string) {
            this.name = name
        }

        getRoomName():string {
            return this.name
        }
 
        addExit(nextRoom: Room, name?: string) {
            if (this.exits == undefined) {
                this.exits = {}
            }
            if (!name) {
                name = nextRoom.getRoomName()
            }
            this.exits[name] = nextRoom
        }

        protected didEnterRoom(entrance:string): void {
        }

        protected willLeaveRoom(): void {
        }

        protected roomTilemap(): tiles.TileMapData{return null}

        public enterRoom(heroSprite: Sprite,entrance?:string): void {
            this.heroSprite = heroSprite
            tiles.setTilemap(this.roomTilemap())
            this.didEnterRoom(entrance)
        }
        public leaveRoom(name: string = "DEFAULT"): void {
            this.willLeaveRoom()
            let nextRoom = this.exits[name] as Room;
            nextRoom.enterRoom(this.heroSprite, this.getRoomName());
        }

    }


}