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
            this.createdSprites = []
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

        protected createdSprites :Sprite[]

        protected createSprite(image:Image, spriteKind?:number):Sprite {

            let result = sprites.create(image, spriteKind)
            // game.currentScene().addSprite(result)
            // game.currentScene().physicsEngine.addSprite(result)

            this.createdSprites.push(result)

            return result;
        }

        protected roomTilemap(): tiles.TileMapData{return null}

        public enterRoom(heroSprite: Sprite,entrance?:string): void {
            game.pushScene()
            game.currentScene().addSprite(heroSprite)
            game.currentScene().physicsEngine.addSprite(heroSprite)
            heroSprite.vx = 0, heroSprite.vy = 0
            this.heroSprite = heroSprite
            tiles.setTilemap(this.roomTilemap())
            this.didEnterRoom(entrance)
        }
        public leaveRoom(name: string = "DEFAULT"): void {
            this.willLeaveRoom()
            let nextRoom = this.exits[name] as Room;
            for(let createdSprite of this.createdSprites) {
                createdSprite.destroy()
            }
            game.popScene()
            nextRoom.enterRoom(this.heroSprite, this.getRoomName());
        }

    }


}