import { animate, state, style, transition, trigger } from '@angular/core';

/**
 * @param duration - in any string format - '0.3s' , '3000' 
 */
interface IfadeOutAnimation {
  duration?: string;
  animationTimingFunction?: string;
}
export function fadeOutAnimation(options: IfadeOutAnimation = {
  duration: '0.3s',
  animationTimingFunction: 'linear'
}) {
  const animationRule = [options.duration, options.animationTimingFunction].join(' ');
  return trigger('fadeIn', [
    state('void', style({ opacity: 0, transform: 'translateY(-30%)' })),
    transition(':enter', [
      animate(animationRule, style({
        opacity: 1,
        transform: 'translateY(0%)'
      }))
    ]),
    transition(':leave', [
      animate(animationRule, style({
        opacity: 0,
        transform: 'translatex(-80%)'
      }))
    ])
  ]);
}
