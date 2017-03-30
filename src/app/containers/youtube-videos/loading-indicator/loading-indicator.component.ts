import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input
} from '@angular/core';

import './loading-indicator.scss';

@Component({
  selector: 'loading-indicator',
  template: `
  <div class="alert alert-info">
    <i class="fa fa-circle-o-notch fa-spin"></i> {{ message }}
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {
  @Input() message = 'Searching More Videos...';

  @Input()
  @HostBinding('class.indicator-show')
  isLoading = false;

  constructor() { }
}
