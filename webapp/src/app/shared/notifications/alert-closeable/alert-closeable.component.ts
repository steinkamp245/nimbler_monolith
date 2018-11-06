import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert-closeable',
  templateUrl: './alert-closeable.component.html',
  styleUrls: ['./alert-closeable.component.scss']
})
export class AlertCloseableComponent implements OnInit {
  @Input() message: string;
  @Input() style: string;
  constructor() {
  }

  ngOnInit() {
  }

  closeAlert() {
    this.message = "";
  }

  setMessage(message: string) {
    this.message = message;
  }
}
