import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'loading-indicator',
  styleUrls: ['./loading-indicator.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
  <div class="alert alert-info">
    <i class="fa fa-circle-o-notch fa-spin"></i> {{ message }}
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {
  @Input() message: string = 'Searching More Videos...';

  @Input()
  @HostBinding('class.indicator-show')
  isLoading: boolean = false;

  constructor() { }
}
