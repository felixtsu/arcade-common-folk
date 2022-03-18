
let willingToBind = false
let houseRoom = new house.HouseRoom()
let caveRoom = new cave.CaveRoom()
let villageRoom = new village.VillageRoom()
let trailRoom = new trail.TrailRoom()
caveRoom.addExit(houseRoom)
houseRoom.addExit(villageRoom)
villageRoom.addExit(houseRoom)
villageRoom.addExitOnLocation(trailRoom, 15, 14)
trailRoom.addExitOnLocation(villageRoom, 0, 1)
let heroSprite = sprites.create(img`
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
    `, SpriteKind.Player)
heroSprite.z = scene.HUD_Z - 5
caveRoom.enterRoom(heroSprite, houseRoom.getRoomName())
// trailRoom.enterRoom(heroSprite, villageRoom.getRoomName())
