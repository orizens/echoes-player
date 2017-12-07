## v 3.9.1 (2017/12/07)
* [NEW] - added new dark "bumblebee" theme 
* [NEW] - each media card description (after flip) includes now a link to its YouTube page 
* [FIX] - after log out, menu is closed - fix #30 
* [UPGRADE] - updated favicon 
* [UPGRADE] - updated few colors for themes
* [UPGRADE] - main loading screen colors for Echoes
* [UPGRADE] - app manifest colors for mobile devices 

## v 3.9.0 (2017/12/05)
* [NEW] - added "info" section for each now playlist track to show more information. 
* [UPGRADE] - updated secondary color (now in use) 
* [FIXED] - playlist 'high' thumb sometimes doesn't exist and results in an error - fix #29 
* [UPDATED] - media thumbs defaults to render maxres and gracefully degrades to render standard quality if higher size are not present 
* [REFACTOR] - performance enhancements in rendering media thumbs, extracing cued tracks for playlist tracks 

## v 3.8.0 (2017/11/03)
* [NEW] - Themes are now availabe - the default is 'Arctic' Theme. Themes are applied via the top right app menu. 
* [NEW] - added dark 'Halloween' theme
* [FIXED] - refresh didn't navigate to the same url route
* [UPGRADE] - using ngx-youtube-player now  

## v 3.7.0 (2017/10/30)
* [NEW] - added "Back" (arrow-left) button to Playlist View - returns to the last view 
* [NEW] - added transparent backdrop to side menu on mobile - touch on it closes the menu 
* [UPGRADE] - now using NgRx 4 
* [ADDED] - integration with router-store

## v 3.6.2 (2017/10/26)
* [NEW] - added transitions when youtube media cards are displayed
* [NEW] - added global key: **Escape** to exit fullscreen
* [UPDATE] - responsive design to mobile
* [UPDATE] - sidebar brand smoother transition
* [UPDATE] - enhanced player controls when in full screen:
  * now less transparent when hovered
  * slightly transparent to hint the location on screen
  * widht is shorter (to allow more control on yt player settings menu)

## v 3.6.1 (2017/10/12)
* [FIX] - fixed error in displaying blur image when 'high' quality is missing
* [FIX] - new instance of player results in an Error

## v 3.6 (2017/10/04)
* [NEW] - added html based color theme based tooltip

## v 3.5.1 (2017/09/27) 
* [FIX] - issue with search #16 
* update new version primary color

## v 3.5 (2017/09/27) 
* [NEW] - added search for playlists
* [NEW] - queue and play whole playlist 
* [NEW] - player control bar reflects the current media photo 
* [NEW] - color palette updated to material 
* [UPDATE] - playlist view has been revamped
* preparation for custom themes

## v 3.4.1 (2017/05/06) 
* [UPDATE] - updated album tracks parsing algorithm - now includes more rules for parsing more formats of tracks embeded in media description  
* [UPDATE] - restyled tracks.  

## v 3.4.0 (2017/05/06) 
* [NEW] - album tracks now features track listings in no playing playlist - playing single tracks in a media - click the green playlist icon to see tracks.  
* [UPDATE] - user menu is now animated.   
* [UPDATE] - added icon for reveal playing track in "now-playing" title  

## v 3.3.0 (2017/04/26) 
* Made performance improvments to fullscreen mode
* [UPDATE] - app user menu has been revamped for mobile devices
* [NEW] - now playling playlist style has been upgraded with borders and improved with semantics & animations when toggling the sidebar 
* [UPDATE] - player controls bar resized and enhanced

## v 3.2.4 (2017/04/25) 
### Updates
* [FIX] - brings back uncommented Effect

## v 3.2.3 (2017/04/24) 
### Updates 
* [FIX] - fixed an issue with playing the last track in a playlist

## v 3.2.2 (2017/04/24) 
### Updates
* [FIX] - attempt to catch errors when user's token is updated
* [UPDATED] - new version indicator is now animated with pulse, "update version" is the first item in list now.

## v 3.2.1 (2017/04/23) 
### Updates
* [FIX] - added auto sign in retry (3 times) and app refresh when there's an error (attempt to fix)

## v 3.2.0 (2017/04/23) 
### Updates
* [NEW] - added user menu (top right) with links to source code
* [NEW] - added version checker service for notifying about a new version of echoes
* [UPDATE] - authorization check is done every 5 minutes

## v 3.1.0 (2017/04/16) 
### Updates
* [NEW] - added "repeat" for playlist. now player will stop playing the playlist if repeat is off (default setting).

## v 3.0.1 (2017/04/07) 
### Updates
* fixes app error - "likeCount" form statistics doesn't exist in search results

## v 3.0.0 (2017/04/06) 

### Updates
* now using ng-cli 1.0.0
* Angular 4.0.0
* scss are loaded with styleUrls