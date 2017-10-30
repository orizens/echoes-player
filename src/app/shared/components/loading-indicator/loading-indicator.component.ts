import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  styleUrls: ['./loading-indicator.scss'],
  template: `
  <div class="alert alert-info">
    <i class="fa fa-circle-o-notch fa-spin"></i> {{ message }}
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent {
  @Input() message = '';
  @Input() loading = false;

  @HostBinding('class.show-loader')
  get show() {
    return this.loading;
  }
}
