namespace SpriteKind {
    export const Door = SpriteKind.create()
    export const Open_Door = SpriteKind.create()
    export const Closed_Door = SpriteKind.create()
    export const Door_Key = SpriteKind.create()
}
/**
 * NOTE: 1. I have added notes to all blocks in this program, click on the text icon in the upper left corner to see note. Please read them so you can better understand what is going on with the code.
 * 
 *             2. By right clicking on any block an action menu will appear. On that menu is a help selection that will tell you more about the block and how it works.
 * 
 * You can also txt, or email me with questions. 
 * 
 * Thanks Mr. Griffin
 */
// fix Bob dances
// 
function DancingBob2 () {
    Count = 0
    ImagePause = 500
    Bob.sayText("Array away")
    pause(500)
    for (let value of DancingBobArray) {
        Bob.sayText("In array")
        Bob.sayText(convertToText(Count))
        Count += 1
        pause(500)
    }
}
// When Bob overlaps door key sprite He changes image and BobHasKey is set to 1
sprites.onOverlap(SpriteKind.Player, SpriteKind.Door_Key, function (sprite, otherSprite) {
    Bob.sayText("Got it!", 750, false)
    Bob.setImage(assets.image`BobWithKey`)
    sprites.destroy(Key_01)
    BobHasKey = 1
})
function Dance () {
    Bob.sayText(":)")
    ImagePause = 500
    Bob = sprites.create(assets.image`BobSward00`, SpriteKind.Player)
    for (let index = 0; index < 4; index++) {
        tiles.placeOnTile(Bob, tiles.getTileLocation(3, 3))
        pause(ImagePause)
        Bob.setImage(assets.image`BobSward01`)
        tiles.placeOnTile(Bob, tiles.getTileLocation(3, 3))
        pause(ImagePause)
        Bob.setImage(assets.image`BobSward03`)
        tiles.placeOnTile(Bob, tiles.getTileLocation(3, 3))
    }
}
// fx to run when game starts. Bob is placed in the opening room and a message is displayed until the user pushes the A button. Then the room is cleared (fx clearRoom) 
function Game_Introduction () {
    tiles.setCurrentTilemap(tilemap`Intro Screen`)
    Bob = sprites.create(assets.image`Bob0`, SpriteKind.Player)
    tiles.placeOnTile(Bob, tiles.getTileLocation(4, 5))
    Bob.sayText("Dude, Press A")
    while (!(controller.A.isPressed())) {
        pause(100)
    }
    ClearRoom()
}
// fx to place the key (Key_01, a sprite) on a random tile of the type shown in the "place" block. The "place" block creates an array of all the tiles of the type selected then randomly selects one of them, and then moves the sprite to that location
function PlaceKey () {
    Key_01 = sprites.create(assets.image`Key_0`, SpriteKind.Door_Key)
    tiles.placeOnRandomTile(Key_01, sprites.dungeon.floorLight2)
}
// fx to run when game starts. Bob is placed in the opening room and a message is displayed until the user pushes the A button. Then the room is cleared (fx clearRoom) 
function Game_Init_2 () {
    tiles.setCurrentTilemap(tilemap`Intro Screen`)
    Bob = sprites.create(assets.image`Bob0`, SpriteKind.Player)
    tiles.placeOnTile(Bob, tiles.getTileLocation(4, 5))
    Bob.sayText("Dude, Intro 2")
    DancingBobArray = [
    assets.image`BobSward00`,
    assets.image`BobSward01`,
    assets.image`BobSward03`,
    assets.image`BobSward02`
    ]
}
// fx selects a random room from the array of tilemaps (GameRooms), sets it to the current room and updates CurentGameRoom with the element number for the selected room. (remember the element number of an array is the location of the element in the array, starting with 0. So the "T" shaped room in this array will set CurrentGameRoom to  a value of 1 since it is the second* element in the array (0,1*,2,3). This is also why the "set" block uses the values of 0 to 3 to pick a random room in the array.
function SelectRandomGameRoom () {
    GameRooms = [
    tilemap`Rm05 The Pit4 srairs`,
    tilemap`Rm04 Terrible Tee`,
    tilemap`Rm02 Blakes Hall`
    ]
    CurrentGameRoom = randint(0, 2)
    tiles.setCurrentTilemap(GameRooms[CurrentGameRoom])
}
// fix Bob dances
// 
function DancingBob () {
    ImagePause = 500
    Bob.sayText("2")
    for (let value of DancingBobArray) {
        Bob.sayText("In array")
        DancingBobArray = [
        assets.image`BobSward00`,
        assets.image`BobSward01`,
        assets.image`BobSward03`,
        assets.image`BobSward02`
        ]
        Bob.sayText("In array")
        Bob.setImage(DancingBobArray[2])
        tiles.placeOnTile(Bob, tiles.getTileLocation(3, 3))
        pause(ImagePause)
    }
}
// When Bob overlaps the door tile (set when the tilemap was created) the IF statement checks to see if Bob has the key (BobHasKey has a value of 1) is so the current room is cleared of all sprites (so they don't show up on the next room) a random room is selected (fx SelectRandomGameRoom) and Bob is moved to that room (fx MoveBobToRoom)     If Bob does NOT have key then the message "you don't have a key" is displayed and game play continues
scene.onOverlapTile(SpriteKind.Player, assets.tile`Door Tile 01`, function (sprite2, location) {
    if (BobHasKey == 1) {
        ClearRoom()
        SelectRandomGameRoom()
        MoveBobToRoom()
    } else {
        Bob.sayText("You don't have a key")
    }
})
function GoToLobbyRoom () {
    Bob = sprites.create(assets.image`Bob0`, SpriteKind.Player)
    tiles.setCurrentTilemap(tilemap`Rm00 Lobby`)
    tiles.placeOnRandomTile(Bob, sprites.dungeon.floorLight2)
    scene.cameraFollowSprite(Bob)
    controller.moveSprite(Bob)
    PlaceKey()
}
// fx to prepare the game. The only thing so far is setting BobHasKey to 0 to indicate Bob does not have the key.
function InitializeGame () {
    BobHasKey = 0
}
// fx clears all sprites from room so they do not show up in the next room
function ClearRoom () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Door_Key)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
}
// fx moves bob to CurrentGameRoom and displays what room and tile he is on
// 
function MoveBobToRoom () {
    Bob.setImage(assets.image`Bob0`)
    Bob = sprites.create(assets.image`Bob0`, SpriteKind.Player)
    BobHasKey = 0
    controller.moveSprite(Bob)
    scene.cameraFollowSprite(Bob)
    tiles.placeOnRandomTile(Bob, assets.tile`Room Start Tile 01`)
    BobsLocation = Bob.tilemapLocation()
    Bob.sayText("Room " + convertToText(CurrentGameRoom) + "\\n Col " + ("" + BobsLocation.column) + " Row " + ("" + BobsLocation.column), 2000, false)
    PlaceKey()
}
// The "on start" block is the first block to run in the program. I have used it to divide the program into separate  functions (fx) that contain all the game code. One could put ALL the game code into the on start block but the game would be very hard to read, debug, and change. By using fx calls you can run only the functions you want, in the order you want. One can also run each function (fx) by its self to test it.
// 
// Note: each block in this program has notes attached to it, please read them to better understand the code.
let BobsLocation: tiles.Location = null
let CurrentGameRoom = 0
let GameRooms: tiles.TileMapData[] = []
let BobHasKey = 0
let Key_01: Sprite = null
let DancingBobArray: Image[] = []
let Bob: Sprite = null
let ImagePause = 0
let Count = 0
Game_Init_2()
DancingBob2()
