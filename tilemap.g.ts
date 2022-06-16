// 自动生成的代码。请勿编辑。
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile14 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile15 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "village":
            case "village1":return tiles.createTilemap(hex`10001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b0000000000000000000000000000030a0400000000000000000000000000080a0600030505050505050400000000080a0600080a0a0a0a0a0a0a04000000080a0600080a0a0a0a0a0a0a0a0400030a0a0600080a0a0a0a0a0a0a0a0a050a0a0a0c00080a0a0a0a0a0a0a0a0a0a090a0c0e00080a0a0a0a0a0a0a0a0a0c02100e0e0e070909090909090a0a060202080f0e0e020202020102020709090d0506020202020202020202020202020207090d0d0d02020202020202020202020202020202`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 . . . 2 
. 2 . 2 . . . . 2 2 2 2 . . . 2 
. . . . . . . . . 2 2 2 . . . 2 
. . . . . . . . . . 2 . . . . 2 
. . . . . . . . . . . . . . . 2 
. . . . . . . . . . . . . . 2 2 
. . . . . . . . . . . . . 2 2 2 
. . . . . . . . . . . . . . 2 2 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.castle.tileGrass1,sprites.castle.tilePath1,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath6,sprites.castle.tilePath7,sprites.castle.tilePath4,sprites.castle.tilePath8,sprites.castle.tilePath5,myTiles.tile3,sprites.castle.tilePath9,myTiles.tile4,myTiles.tile5,myTiles.tile6,myTiles.tile7], TileScale.Sixteen);
            case "trail":
            case "trail1":return tiles.createTilemap(hex`1000140000000000000000000000000000000000060500000000000000000000000000000202050000000000000000000000000003070205000000080605000000000000010103020606060202020606060500000101010307070202020207070202050001010101010103070704010103020a0001010805010101010101010101090a000108020205010101010101010802040001030702020606060606060602040100010101030702020707070707040101000101010101090a01010101010101010001010108060204010101010101010100010108020704010101010101010101010101090a01010101010101010101010101010302060605010101010101010101010101030707020606060501010101010101010101010307070702060501010101010101010101010101030702050101010101010101010101010101090a0101`, img`
2222222222222222
..22222222222222
...2222222222222
....222...222222
22............22
222............2
222222....22...2
22..222222222..2
2....2222222...2
2.............22
222..........222
22222..222222222
222....222222222
22....2222222222
22..222222222222
22.....222222222
222........22222
222222.......222
2222222222....22
222222222222..22
`, [myTiles.transparency16,myTiles.tile5,sprites.castle.tilePath5,sprites.castle.tilePath7,sprites.castle.tilePath9,sprites.castle.tilePath3,sprites.castle.tilePath2,sprites.castle.tilePath8,sprites.castle.tilePath1,sprites.castle.tilePath4,sprites.castle.tilePath6], TileScale.Sixteen);
            case "house":
            case "level1":return tiles.createTilemap(hex`0a00080001020202020202020203040a0b0909090909090704090909090909090907040909090909090909070409090909090909090704090909090909090907050606060c0c0606060800000000000000000000`, img`
2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 . . . . . . . . 2 
2 2 2 2 . . 2 2 2 2 
. . . . . . . . . . 
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.floorLight2,myTiles.tile1,myTiles.tile2,sprites.dungeon.collectibleInsignia], TileScale.Sixteen);
            case "dungeon":
            case "dungeonTilemap1":return tiles.createTilemap(hex`2800100000000006000d001000000000000000151b1b1b221b1b1b1b1b270000000000000000000000000000000207080708070807120000000000161c1c1c231c1c1c1c1c280000000000000000000000000000000308080808080808130000000000161c1c1c1c1c1c1c1c1c28000000151b1b1b1b1b1b1b1b1b27000308080808080808130000000000161c1c1c1c1c1c1c1c0028000000161c1c1c1c1c1c1c1c1c28000308080808080808130000000000161c1c1c1c1c1c1c000029000000161c1c1c1c1c1c1c1c1c2800030809080e081108130000000000161c1c1c1c1c1c00002628000000161c1c00000000001c1c2800040a0a0a0a0a0a0a140000000000171d211d1d1d1d1d251d2a000000161c1c001c1c1c001c1c280000000000000000000000000000000000000000000000000000000000161c1c001c1c1c001c1c280000000000000000000000000000000000000000000000000000000000161c1c001c1c1c001c1c28000000000000000000000000000000181e1e1e1e1e1e1e1e1e2b000000160000001c0000001c1c28000000000000000000000000000000191f1f1f1f1f1f1f1f1f2c00000016001c1c1c001c2e1c1c28000000000000000000000000000000191f1f1f1f1f1f1f1f1f2c00000016001c0000001c1c1c1c28000000000000000000000000000000191f1f1f1f1f241f1f1f2c000000171d211d1d1d1d1d1d1d2a000000000000000000000000000000191f1f1f1f1f1f1f1f1f2c0000000000000000000000000000000000000000000000000000000000191f1f1f1f1f1f1f1f1f2c000000000000000000000000000001050b0c0f000000000000000000001a2021202020202020202d0000000000000000000000000000`, img`
222.2.2.222....22222222222..............
2.........2....2.........2..............
2.........2....2.........2...22222222222
2.........2....2........22...2.........2
2.........2....2.......2.2...2.........2
2.........2....2......2..2...2..22222..2
2.........2....22.22222222...2..2...2..2
22222222222..................2..2...2..2
.............................2..2...2..2
...............22222222222...2222.222..2
...............2.........2...22...2....2
...............2.........2...22.222....2
...............2.........2...22.22222222
...............2.........2..............
...............2.........2..............
...............22.22222222..............
`, [myTiles.transparency16,sprites.dungeon.buttonOrangeDepressed,sprites.dungeon.darkGroundNorthWest0,sprites.dungeon.darkGroundWest,sprites.dungeon.darkGroundSouthWest0,sprites.dungeon.buttonTealDepressed,myTiles.tile8,sprites.dungeon.darkGroundNorth,sprites.dungeon.darkGroundCenter,sprites.dungeon.buttonOrange,sprites.dungeon.darkGroundSouth,sprites.dungeon.buttonPinkDepressed,sprites.dungeon.chestClosed,sprites.dungeon.doorOpenNorth,sprites.dungeon.buttonTeal,sprites.dungeon.chestOpen,myTiles.tile9,sprites.dungeon.buttonPink,sprites.dungeon.darkGroundNorthEast0,sprites.dungeon.darkGroundEast,sprites.dungeon.darkGroundSouthEast0,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.purpleOuterNorthWest,sprites.dungeon.purpleOuterWest0,sprites.dungeon.purpleOuterSouthEast,sprites.dungeon.greenOuterNorth0,sprites.dungeon.floorLight2,sprites.dungeon.greenOuterSouth1,sprites.dungeon.purpleOuterNorth0,sprites.dungeon.floorDark2,sprites.dungeon.purpleOuterSouth1,sprites.dungeon.stairNorth,sprites.dungeon.greenSwitchUp,myTiles.tile10,myTiles.tile11,sprites.dungeon.greenOuterSouth2,myTiles.tile12,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.greenOuterEast2,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.purpleOuterNorthEast,sprites.dungeon.purpleOuterEast1,sprites.dungeon.purpleOuterSouthWest,myTiles.tile13], TileScale.Sixteen);
            case "caveEntrance":
            case "trail2":return tiles.createTilemap(hex`100010000101010101010101010101010304010101010101010101010101010103040101010101010101010101010101030401010101050c0601010101010101030401010101070b080101010101010d020401010101070a0901010101010103020f010101010302040101010101010304010101010103020401010101010d020f0101010101030204010101010103040101010101010302020e0101010d020f01010101010110020204010d12020f01010101010101011002040103020f0101010101010101010103021202040101010101010101010101100202020f01010101010101010101010110110f010101010101010101010101010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 . . 2 2 
2 2 . . . 2 2 2 2 2 2 2 . . 2 2 
2 2 . . . 2 2 2 2 2 2 . . . 2 2 
2 2 . . . 2 2 2 2 2 2 . . . 2 2 
2 2 . . . 2 2 2 2 2 2 . . 2 2 2 
2 2 . . . 2 2 2 2 2 . . . 2 2 2 
2 2 . . . 2 2 2 2 2 . . 2 2 2 2 
2 2 . . . . 2 2 2 . . . 2 2 2 2 
2 2 . . . . 2 . . . . 2 2 2 2 2 
2 2 2 . . . 2 . . . 2 2 2 2 2 2 
2 2 2 2 . . . . . 2 2 2 2 2 2 2 
2 2 2 2 . . . . . 2 2 2 2 2 2 2 
2 2 2 2 2 . . . 2 2 2 2 2 2 2 2 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile5,sprites.castle.tilePath5,sprites.castle.tilePath4,sprites.castle.tilePath6,sprites.builtin.forestTiles5,sprites.builtin.forestTiles7,sprites.builtin.forestTiles9,sprites.builtin.forestTiles11,sprites.builtin.forestTiles15,sprites.builtin.forestTiles14,sprites.builtin.forestTiles10,sprites.builtin.forestTiles6,sprites.castle.tilePath1,sprites.castle.tilePath3,sprites.castle.tilePath9,sprites.castle.tilePath7,sprites.castle.tilePath8,sprites.castle.tilePath2], TileScale.Sixteen);
            case "cave":
            case "级别1":return tiles.createTilemap(hex`0b000e0006060606060606060606060606060606060606060606060600000000000000060606060002010101050006060606000109070101000606060600010908010100060606060004010101030006060606000001010100000606060606000101010006060606060600010101000606060606060001010100060606060606000101010006060606060600010101000606060606060001010100060606`, img`
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
`, [myTiles.transparency16,sprites.swamp.swampTile9,sprites.swamp.swampTile6,sprites.swamp.swampTile14,sprites.swamp.swampTile12,sprites.swamp.swampTile8,sprites.swamp.swampTile16,myTiles.tile14,myTiles.tile15,myTiles.tile16], TileScale.Sixteen);
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
            case "myTile":
            case "tile3":return tile3;
            case "myTile0":
            case "tile4":return tile4;
            case "myTile1":
            case "tile5":return tile5;
            case "myTile2":
            case "tile6":return tile6;
            case "myTile3":
            case "tile7":return tile7;
            case "dungeonRoom1":
            case "tile8":return tile8;
            case "dungeonRoom3":
            case "tile9":return tile9;
            case "dungeonLeverTile":
            case "tile10":return tile10;
            case "dungeonCode1":
            case "tile11":return tile11;
            case "dungeonCode2":
            case "tile12":return tile12;
            case "dungeonCode3":
            case "tile13":return tile13;
            case "myTile6":
            case "tile16":return tile16;
            case "myTile4":
            case "tile14":return tile14;
            case "myTile5":
            case "tile15":return tile15;
        }
        return null;
    })

}
// 自动生成的代码。请勿编辑。
