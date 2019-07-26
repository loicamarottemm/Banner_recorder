url="$1"
width="$2"
height="$3"
filename="$4"
fpsV="$5"
fpsG="$6"
node recorder-gsap $url $width $height $filename $fpsV
ffmpeg-gif $filename.mov $filename.gif --fps=$fpsG