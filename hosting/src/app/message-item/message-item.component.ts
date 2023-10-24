import { Component, Input } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
  @Input() message: DocumentData = {};
}
