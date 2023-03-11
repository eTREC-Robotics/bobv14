@namespace
class SpriteKind:
    Door = SpriteKind.create()
    Open_Door = SpriteKind.create()
    Closed_Door = SpriteKind.create()
    Door_Key = SpriteKind.create()
list2: List[Sprite] = []
# When Bob overlaps door key sprite He changes image and BobHasKey is set to 1

def on_on_overlap(sprite, otherSprite):
    global BobHasKey
    Bob.say_text("Got it!", 750, False)
    Bob.set_image(assets.image("""
        BobWithKey
    """))
    sprites.destroy(Key_01)
    BobHasKey = 1
sprites.on_overlap(SpriteKind.player, SpriteKind.Door_Key, on_on_overlap)

# fx to run when game starts. Bob is placed in the opening room and a message is displayed until the user pushes the A button. Then the room is cleared (fx clearRoom) 
def Game_Introduction():
    global Bob
    tiles.set_current_tilemap(tilemap("""
        Intro Screen
    """))
    Bob = sprites.create(assets.image("""
        Bob0
    """), SpriteKind.player)
    tiles.place_on_tile(Bob, tiles.get_tile_location(4, 5))
    Bob.say_text("Dude, Press A")
    while not (controller.A.is_pressed()):
        pause(100)
        DancingBob()
    ClearRoom()
# fx to place the key (Key_01, a sprite) on a random tile of the type shown in the "place" block. The "place" block creates an array of all the tiles of the type selected then randomly selects one of them, and then moves the sprite to that location
def PlaceKey():
    global Key_01
    Key_01 = sprites.create(assets.image("""
        Key_0
    """), SpriteKind.Door_Key)
    tiles.place_on_random_tile(Key_01, sprites.dungeon.floor_light2)
# fx selects a random room from the array of tilemaps (GameRooms), sets it to the current room and updates CurentGameRoom with the element number for the selected room. (remember the element number of an array is the location of the element in the array, starting with 0. So the "T" shaped room in this array will set CurrentGameRoom to  a value of 1 since it is the second* element in the array (0,1*,2,3). This is also why the "set" block uses the values of 0 to 3 to pick a random room in the array.
def SelectRandomGameRoom():
    global GameRooms, CurrentGameRoom
    GameRooms = [tilemap("""
            Rm05 The Pit4 srairs
        """),
        tilemap("""
            Rm04 Terrible Tee
        """),
        tilemap("""
            Rm02 Blakes Hall
        """)]
    CurrentGameRoom = randint(0, 2)
    tiles.set_current_tilemap(GameRooms[CurrentGameRoom])
# fix Bob dances
# 
def DancingBob():
    global ImagePause, DancingBobArray, Bob
    ImagePause = 500
    for value in list2:
        DancingBobArray = [assets.image("""
                BobSward00
            """),
            assets.image("""
                BobSward01
            """),
            assets.image("""
                BobSward03
            """),
            assets.image("""
                BobSward02
            """)]
        Bob = value
        tiles.place_on_tile(Bob, tiles.get_tile_location(3, 3))
        pause(ImagePause)
# When Bob overlaps the door tile (set when the tilemap was created) the IF statement checks to see if Bob has the key (BobHasKey has a value of 1) is so the current room is cleared of all sprites (so they don't show up on the next room) a random room is selected (fx SelectRandomGameRoom) and Bob is moved to that room (fx MoveBobToRoom)     If Bob does NOT have key then the message "you don't have a key" is displayed and game play continues

def on_overlap_tile(sprite2, location):
    if BobHasKey == 1:
        ClearRoom()
        SelectRandomGameRoom()
        MoveBobToRoom()
    else:
        Bob.say_text("You don't have a key")
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        Door Tile 01
    """),
    on_overlap_tile)

def GoToLobbyRoom():
    global Bob
    Bob = sprites.create(assets.image("""
        Bob0
    """), SpriteKind.player)
    tiles.set_current_tilemap(tilemap("""
        Rm00 Lobby
    """))
    tiles.place_on_random_tile(Bob, sprites.dungeon.floor_light2)
    scene.camera_follow_sprite(Bob)
    controller.move_sprite(Bob)
    PlaceKey()
# fx to prepare the game. The only thing so far is setting BobHasKey to 0 to indicate Bob does not have the key.
def InitializeGame():
    global BobHasKey
    BobHasKey = 0
# fx clears all sprites from room so they do not show up in the next room
def ClearRoom():
    sprites.destroy_all_sprites_of_kind(SpriteKind.Door_Key)
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
# fx moves bob to CurrentGameRoom and displays what room and tile he is on
# 
def MoveBobToRoom():
    global Bob, BobHasKey, BobsLocation
    Bob.set_image(assets.image("""
        Bob0
    """))
    Bob = sprites.create(assets.image("""
        Bob0
    """), SpriteKind.player)
    BobHasKey = 0
    controller.move_sprite(Bob)
    scene.camera_follow_sprite(Bob)
    tiles.place_on_random_tile(Bob, assets.tile("""
        Room Start Tile 01
    """))
    BobsLocation = Bob.tilemap_location()
    Bob.say_text("Room " + convert_to_text(CurrentGameRoom) + "\\n Col " + ("" + str(BobsLocation.column)) + " Row " + ("" + str(BobsLocation.column)),
        2000,
        False)
    PlaceKey()
"""

NOTE: 1. I have added notes to all blocks in this program, click on the text icon in the upper left corner to see note. Please read them so you can better understand what is going on with the code.

2. By right clicking on any block an action menu will appear. On that menu is a help selection that will tell you more about the block and how it works.

You can also txt, or email me with questions. 

Thanks Mr. Griffin

"""
# The "on start" block is the first block to run in the program. I have used it to divide the program into separate  functions (fx) that contain all the game code. One could put ALL the game code into the on start block but the game would be very hard to read, debug, and change. By using fx calls you can run only the functions you want, in the order you want. One can also run each function (fx) by its self to test it.
# 
# Note: each block in this program has notes attached to it, please read them to better understand the code.
BobsLocation: tiles.Location = None
DancingBobArray: List[Image] = []
ImagePause = 0
CurrentGameRoom = 0
GameRooms: List[tiles.TileMapData] = []
BobHasKey = 0
Key_01: Sprite = None
Bob: Sprite = None
Game_Introduction()
InitializeGame()
DancingBob()