// 在此处添加您的代码
namespace trail {

    export const ROOM_NAME = "TRAIL"

    export class TrailRoom extends room.AbstractRoom {

        private enterTimes = 0

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
                // first time
                controller.moveSprite(this.heroSprite)
                scene.cameraFollowSprite(this.heroSprite)
                if (this.enterTimes == 0) {
                    
                }
            }
        }

        willLeaveRoom(): void {
        }
    }
}