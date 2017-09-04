import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

// import './button-group.component.scss';

export interface ButtonGroupButton {
  label: string;
  value: any;
}
@Component({
  selector: 'button-group',
  styleUrls: [ './button-group.component.scss' ],
  template: `
    <div class="btn-group btn-group-sm navbar-btn">
      <button class="btn btn-default"
        *ngFor="let button of buttons"
        [class.active]="isSelectedButton(button.value)"
        (click)="buttonClick.next(button)">
        {{ button.label }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ButtonGroupComponent implements OnInit {
  @Input() buttons: ButtonGroupButton[];
  @Input() selectedButton: string;

  @Output() buttonClick = new EventEmitter<ButtonGroupButton>();

  ngOnInit() { }

  isSelectedButton(buttonValue: string) {
    return buttonValue === this.selectedButton;
  }
}
