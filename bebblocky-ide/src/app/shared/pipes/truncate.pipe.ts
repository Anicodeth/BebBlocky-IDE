import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: String, words: number): String {
    if (!value) {
      return '';
    }

    const wordArray = value.split(' ');
    if (wordArray.length <= words) {
      return value;
    }

    const truncatedArray = wordArray.slice(0, words);
    const truncatedString = truncatedArray.join(' ');

    return truncatedString + '...';
  }
}