# ffmpegSplit

A small tool to help generate `ffmpeg` commands for splitting a video file into multiple files.

Ex:

```
ffmpeg -i 'test.avi' -vcodec copy -acodec copy -ss 00:00:01.123 -t 00:00:02.567 output1.avi -vcodec copy -acodec copy -ss 00:00:03.890 -to 00:01:00.123 output2.avi 
```

## Requirements

`ffmpeg` installed and on your `PATH`.

## Building

1. Clone repo
1. `npm install`
1. Two options for building and running
   1. `npm run build:{OS TYPE}` or `npm run build:all` (Note this command will take a long time).
      * `OS TYPE` values:  `win64`, `win86`, `linux64`, `linux86`, `mac64`
   1. `npm run start` to quickly run the program in a browser tab at <http://localhost:4200>

## Quesitons?

Create an issue or send a pull request :)

## Notes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.
