In the current state of the project I have all but one feature implemented and instead I have implemented a feature to take its place.
Right now the letters are randomly selected from the datastructure and put into the rack, you can drag the tiles into the individual scrabble squares,
the program shows what the word you are building currently is and keeps track of which letters are in which slot in the backend, there are two bonus squares,
the score is tallied correctly taking the bonus squares into consideration, you can play untill you wish to quit or you run out of tiles, the slots on the 
board are cleared every round, after every round the rack fills back up with at max 7 tiles, the score is kept untill the user restarts the game, tiles can
be moves enterchangably between the scrabble slots and the rack, the user can restart the game, and tiles only be dragged to the rack or the slots on the board.
I would like to mention that sometimes the program glitches sometimes when dragging and tiles dissapear or show up on other places on the screen or sometimes
are stubborn and wont move out of the slot for a second, however I have done throurough invesigation into this and the conclusion I have come to is that
the jquery UI library is a little buggy sometimes because I have followed the instructions of the documention exactly. The feature that I replaced was
when you place a tile in the board and then do not place the second tile next to it, the tile does not bounce back to your hand it instead prints out an error 
message whenever you submit the word and rejects the word untill changed. I also added an additional feature to improve user experience which was to be able
to reorganize the tiles in your hand so you can hopefully think of words easier. I would also like to note that I used tailwind to assist in writing the 
css.






resources:
Images:
<!--Photo by <a href="https://unsplash.com/@thejmoore?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jon Moore</a> on <a href="https://unsplash.com/s/photos/wood-table?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>-->
the rest were provided by the teacher 

Tools:
jquery - https://jquery.com/
tailwind - https://tailwindcss.com/
jquery ui - https://jqueryui.com/
