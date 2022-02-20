// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "house":
            case "level1":return tiles.createTilemap(hex`0a00080001020202020202020203040a0b0909090909090704090909090909090907040909090909090909070409090909090909090704090909090909090907050606060c0c0606060800000000000000000000`, img`
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.floorLight2,myTiles.tile1,myTiles.tile2,sprites.dungeon.collectibleInsignia], TileScale.Sixteen);
            case "cave":
            case "级别1":return tiles.createTilemap(hex`0b000e0006060606060606060606060606060606060606060606060600000000000000060606060002010101050006060606000101010101000606060600010101010100060606060004010101030006060606000001010100000606060606000101010006060606060600010101000606060606060001010100060606060606000101010006060606060600010101000606060606060001010100060606`, img`
. . . . . . . . . . . 
. . . . . . . . . . . 
. . 2 2 2 2 2 2 2 . . 
. . 2 . . . . . 2 . . 
. . 2 . . . . . 2 . . 
. . 2 . . . . . 2 . . 
. . 2 . . . . . 2 . . 
. . 2 2 . . . 2 2 . . 
. . . 2 . . . 2 . . . 
. . . 2 . . . 2 . . . 
. . . 2 . . . 2 . . . 
. . . 2 . . . 2 . . . 
. . . 2 . . . 2 . . . 
. . . 2 . . . 2 . . . 
`, [myTiles.transparency16,sprites.swamp.swampTile9,sprites.swamp.swampTile6,sprites.swamp.swampTile14,sprites.swamp.swampTile12,sprites.swamp.swampTile8,sprites.swamp.swampTile16], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "bed1":
            case "tile1":return tile1;
            case "bed2":
            case "tile2":return tile2;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
