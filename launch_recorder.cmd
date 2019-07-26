set url=%~1
set width=%~2
set height=%~3
set filename=%~4
set fpsV=%~5
set fpsG=%~6
node recorder-gsap %url% %width% %height% %filename% %fpsV%
ffmpeg-gif %filename%.mov %filename%.gif --fps=%fpsG%