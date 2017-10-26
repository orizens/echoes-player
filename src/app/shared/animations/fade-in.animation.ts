import {
  animate,
  state,
  style,
  transition,
  trigger,
  group
} from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  state('void', style({ opacity: 0, transform: 'translateY(-2rem)' })),
  transition('void => *', [
    animate(
      '300ms ease-in',
      style({
        opacity: 1,
        transform: 'translateY(0rem)'
      })
    )
  ]),
  transition('* => void', [
    animate(
      '300ms ease-out',
      style({
        opacity: 0,
        transform: 'translateY(-2rem)'
      })
    )
  ])
]);

export const flyOut = trigger('flyOut', [
  state('void', style({ opacity: 0, transform: 'translateY(-30%)' })),
  transition('void => *', [
    animate(
      '300ms ease-out',
      style({
        opacity: 1,
        transform: 'translateY(0%)'
      })
    )
  ]),
  transition('* => void', [
    animate(
      '300ms ease-out',
      style({
        opacity: 0,
        transform: 'translateX(-80%)'
      })
    )
  ])
]);

export const flyInOut = trigger('flyInOut', [
  state('in', style({ transform: 'translateX(0)' })),
  transition('void => *', [
    style({ transform: 'translateX(-100%)' }),
    animate(100)
  ]),
  transition('* => void', [
    animate(100, style({ transform: 'translateX(100%)' }))
  ])
]);
