import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  styleUrls: ['./loading-indicator.scss'],
  template: `
  <div class="alert alert-info">
    <icon name="circle-o-notch spin"></icon> {{ message }}
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
