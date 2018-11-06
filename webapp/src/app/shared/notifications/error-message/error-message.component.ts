import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  @Input() error: string;
  @Input() control: NgModel;
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
