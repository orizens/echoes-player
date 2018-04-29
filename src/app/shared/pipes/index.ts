import { SearchPipe } from './search.pipe';
import { ToFriendlyDurationPipe } from './toFriendlyDuration.pipe';
import { VideoToThumbPipe } from './videoToThumb.pipe';
import { ParseTracksPipe } from './parseTracks.pipe';
import { IsInQueuePipe } from './isInQueue.pipe';

export const PIPES = [
  SearchPipe,
  ToFriendlyDurationPipe,
  VideoToThumbPipe,
  ParseTracksPipe,
  IsInQueuePipe
];
