import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Split } from './split';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ffmpegSplit';
  splits: Split[] = [];
  _startTime = '';
  _endTime = '';
  _fileName = '';
  inputFile = '';
  command = '';

  constructor() { }

  @ViewChild('startTimeTextBox', { static: false }) startTimeTextBox: ElementRef;
  @ViewChild('endTimeTextBox', { static: false }) endTimeTextBox: ElementRef;
  @ViewChild('fileNameTextBox', { static: false }) fileNameTextBox: ElementRef;

  @Input()
  get startTime() {
    return this._startTime;
  }

  set startTime(value) {
    this._startTime = value;
  }

  @Input()
  get endTime() {
    return this._endTime;
  }

  set endTime(value) {
    this._endTime = value;
  }

  @Input()
  get fileName() {
    return this._fileName;
  }

  set fileName(value) {
    this._fileName = value;
  }

  onInputFileKey(event: any) {
    this.inputFile = event.target.value;
  }

  onStartTimeKey(event: any) {
    if (this.endTime === event.target.value) {
      // Do nothing if the user isn't inputting characters.
      return;
    }
    this.startTime = event.target.value;
    if (this.startTime.length === 12) {
      setTimeout(() => this.endTimeTextBox.nativeElement.focus(), 0);
    }
  }

  onEndTimeKey(event: any) {
    if (this.endTime === event.target.value) {
      // Do nothing if the user isn't inputting characters.
      return;
    }
    this.endTime = event.target.value;
    if (this.endTime.length === 12) {
      setTimeout(() => this.fileNameTextBox.nativeElement.focus(), 0);
    }
  }

  onFileNameKey(event: any) {
    if (this.endTime === event.target.value) {
      // Do nothing if the user isn't inputting characters.
      return;
    }
    this.fileName = event.target.value;
  }

  addSplit() {
    this.splits.push(new Split(this.startTime, this.endTime, this.fileName));
    this.startTime = '';
    this.endTime = '';
    this.fileName = '';
    setTimeout(() => this.startTimeTextBox.nativeElement.focus(), 0);
    this.generateCommand();
  }

  deleteSplit(split: Split) {
    let index = this.splits.indexOf(split);
    this.splits.splice(index, 1);
    this.generateCommand();
  }

  up(split: Split) {
    let index = this.splits.indexOf(split);
    let splitAbove: Split = this.splits[index - 1];
    this.splits[index] = splitAbove;
    this.splits[index - 1] = split;

    this.generateCommand();
  }

  down(split: Split) {
    let index = this.splits.indexOf(split);
    let splitBelow: Split = this.splits[index + 1];
    this.splits[index] = splitBelow;
    this.splits[index + 1] = split;

    this.generateCommand();
  }

  generateCommand() {
    this.command = '';
    let finalCommand = '';
    let first = true;
    this.splits.forEach(split => {
      if (first) {
        first = false;
        finalCommand += `ffmpeg -i '${this.inputFile}' -vcodec copy -acodec copy -ss ${split.startTime} -t ${split.endTime} ${split.fileName} `;
      }
      else {
        finalCommand += `-vcodec copy -acodec copy -ss ${split.startTime} -to ${split.endTime} ${split.fileName} `
      }
    });

    this.command = finalCommand;
  }
}
