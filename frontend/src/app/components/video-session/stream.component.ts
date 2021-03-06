import {Component, ElementRef, Input, SimpleChanges, ViewChild} from '@angular/core';
import {Stream} from 'openvidu-browser';

@Component({
  selector: 'stream',
  styleUrls: ['./stream.component.css'],
  template: `
    <div class='participant' [class.participant-small]="this.small">
      <div *ngIf="this.stream" class="name-div"><p class="name-p">{{this.getName()}}</p></div>
      <video #videoElement autoplay="true" [muted]="this.muted" [attr.title]="getVideoNameFromStream()"></video>
    </div>`
})
export class StreamComponent {

  @ViewChild('videoElement') elementRef: ElementRef;
  videoElement: HTMLVideoElement;

  @Input()
  stream: Stream;

  @Input()
  small: boolean;

  @Input()
  muted: boolean;

  constructor() {
  }

  ngAfterViewInit() { // Get HTMLVideoElement from the view
    this.videoElement = this.elementRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) { // Listen to 'muted' property changes
    if (changes['muted']) {
      this.muted = changes['muted'].currentValue;
      console.warn("Small: " + this.small + " | Muted: " + this.muted);
    }
  }

  ngDoCheck() { // Detect any change in 'stream' property (specifically in its 'srcObject' property)
    if (this.videoElement && this.stream &&
      ((this.videoElement.srcObject == null) ||
        (!(this.stream.getMediaStream() == null) && (this.videoElement.id !== this.stream.getMediaStream().id)))
    ) {
      this.videoElement.srcObject = this.stream.getMediaStream();
      console.warn("Stream updated");
    }
  }

  getName() {
    // @ts-ignore
    return ((JSON.parse(this.stream.connection.data))['name']);
  }

  getVideoNameFromStream(): string {
    return (this.stream != null) ? 'VIDEO-' + this.getName() : 'VIDEO';
  }

}
