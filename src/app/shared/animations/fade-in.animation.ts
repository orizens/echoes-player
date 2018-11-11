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
    animate(300)
  ]),
  transition('* => void', [
    animate(300, style({ transform: 'translateX(100%)' }))
  ])
]);
export const heightReveal = trigger('flyInOut', [
  state('in', style({ height: 0, overflow: 'hidden' })),
  transition('void => *', [style({ height: 0 }), animate(300)]),
  transition('* => void', [animate(300, style({ height: 100 }))])
]);

export const expandFadeInAnimation = trigger('expandFadeIn', [
  // state('void', style({ top: '-35rem' })),
  state(
    'show',
    style({
      opacity: 1,
      transform: 'scale(1)'
    })
  ),
  state(
    'hide',
    style({
      opacity: 0,
      transform: 'scale(0.4)'
    })
  ),
  transition('show => hide', animate('300ms ease-in')),
  transition('hide => show', animate('300ms ease-in'))
]);
