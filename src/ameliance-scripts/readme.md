# Ameliance SkyMusic TypeScript Scripts Collection
A collection of my personal scripts, scripts I found on the Internet, maybe even modified

## Installation
```
npm i ameliance-scripts
```

## Usage
```js
import asm from 'ameliance-scripts'

const randomRGBColor = asm.getRandomRGBColor();
```
or
```js
import { getRandomRGBColor } from 'ameliance-scripts'

const randomRGBColor = getRandomRGBColor();
```

## Functions list
```js
const arr = ['a', 'b', 'c'];
asm.addId(arr);
// [
//    { a: 'a', id: 0 },
//    { b: 'b', id: 0 },
//    { c: 'c', id: 0 }
// ]

const arr = [{ key: 'a' }, { key: 'b' }, { key:'c' }];
asm.addId(arr);
// [
//    { key: 'a', id: 0 },
//    { key: 'b', id: 0 },
//    { key: 'c', id: 0 }
// ]

const arr = [{ key: 'a' }, { key: 'b' }, { key:'c' }];
const ids = [2923, 0292, 8347]
asm.addId(arr, ids);
// [
//    { key: 'a', id: 2923 },
//    { key: 'b', id: 0292 },
//    { key: 'c', id: 8347 }
// ]
```
```js
const someVar = 'class-b'
const someArr = [null, '', 'icon', '', '', undefined, '']
<Component {...asm.className(['class-a', undefined, someVar, someArr.length > 0 && someArr]);}/>
// <Component className='class-a class-b icon'/>
```
```js
asm.createHTMLElem();
```
```js
asm.getCommonValues(['1', '2', '3'], ['3', '4'], ['3', '5'])
// ['3']

asm.getCommonValues([1, 2, 3], [3, 4], [3, 5])
// [3]

asm.getCommonValues(['1', '2', '3', 1], ['3', '4', 1], [1, '3', '5'])
// ['3, 1]
```
```js
asm.getCurrentDateInMs()
// 1675366990061
```
```js
asm.getDifferentValues(['1', '2', '3'], ['3', '4'], ['3', '5'])
// ['1', '2']

asm.getDifferentValues([1, 2, 3], [3, 4], [3, 5])
// [1, 2]

asm.getDifferentValues(['1', '2', '3', 1, 3], ['3', '4', 1], [1, '3', '5'])
// ['1', '2', 3]
```
```js
asm.getIndexesOfNonEmptyElements(['1', '', '3'])
// [0, 2]
```
```js
asm.getRandomHEXColor();
// '#FFAA00'
```
```js
asm.getRandomNumber(0, 7);
// 5
```
```js
asm.getRandomRGBColor();
// [255, 10, 8]
```
```js
asm.getScrollDirection();
// 'UP'
// 'DOWN'
```
```js
asm.groupBy(['aa', 'aq', 'ab', 'bx', 'ba']);
// [
//   [a, ['aa', 'aq', 'ab]],
//   [b, ['bx', ba]]
// ]

asm.groupBy([
   {key1:'aa', key2: 1 },
   {key1:'aq', key2: 3 },
   {key1:'ab', key2: '2' },
   {key1:'bx', key2: '5' },
   {key1:'ba', key2: 4 }
]), 'key1';
//[
//   [a, [
//      {key1:'aa', key2: 1 },
//      {key1:'ab', key2: '2' },
//      {key1:'aq', key2: 3 },
//   ]],
//   [b, [
//      {key1:'ba', key2: 4 }
//      {key1:'bx', key2: '5' },
//   ]]
//]
```
```js
asm.isObject({ a: 'a' });
// true
```
```js
asm.isObjectEmpty({ a: 'a' });
// false
```
```js
const someVar = 'class-b'
const someArr = [null, '', 'icon', '', '', undefined, '']
asm.join(['class-a', undefined, someVar, someVar, someArr.length > 0 && someArr]);
// 'class-a class-b icon'
```
```js
asm.parseCurrentDateFromMs(1675366990061);
// Thu Feb 02 2023 21:43:10 GMT+0200
```
```js
asm.removeEmptyValues(['', '', 'a', '', 'b', '', '']);
// ['a', 'b']

asm.removeEmptyValues([
   {key1: '', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: 'a', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: 'b', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
], 'key1');
// [
//    {key1: 'a', key2: 'someKey'},
//    {key1: 'b', key2: 'someKey'}
// ]
```
```js
asm.setIntervalCounts({ () => console.log('Hello'), 1000, 3 })
// Hello // 1st time after delay 1s
// Hello // 2nd time after delay 2s
// Hello // 3rd time after delay 3s
```
```js
asm.shuffleArray(['a', 'b', 'c']);
// ['b', 'c', 'a']
```
```js
asm.sortArrayLocalCompare(['Яблуко', 'ćma', 'BBC', '10', 'fast']);
// ['10', 'Яблуко', 'BBC', 'ćma', 'fast']

asm.sortArrayLocalCompare([
   {key1: 'Яблуко', key2: 'someKey'},
   {key1: 'ćma', key2: 'someKey'},
   {key1: 'BBC', key2: 'someKey'},
   {key1: '10', key2: 'someKey'},
   {key1: 'fast', key2: 'someKey'},
], 'key1');
// [
//    {key1: '10', key2: 'someKey'},
//    {key1: 'Яблуко', key2: 'someKey'},
//    {key1: 'BBC', key2: 'someKey'},
//    {key1: 'ćma', key2: 'someKey'},
//    {key1: 'fast', key2: 'someKey'},
// ]
```
```js
asm.sortArrayOfObj();
```
```js
asm.stringCut('long string', 5);
// 'long...'

asm.stringCut('long string', 8, '=)');
// 'long str=)'
```
```js
asm.trimEndEmptyValues(['', '', 'a', '', 'b', '', '']);
// ['', '', 'a', '', 'b']

asm.trimEndEmptyValues([
   {key1: '', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: 'a', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: 'b', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
], 'key1');
// [
//    {key1: '', key2: 'someKey'},
//    {key1: '', key2: 'someKey'},
//    {key1: 'a', key2: 'someKey'},
//    {key1: '', key2: 'someKey'},
//    {key1: 'b', key2: 'someKey'}
// ]
```
```js
asm.trimStartEmptyValues(['', '', 'a', '', 'b', '', '']);
// ['a', '', 'b', '', '']

asm.trimStartEmptyValues([
   {key1: 'a', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: 'b', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
   {key1: '', key2: 'someKey'},
], 'key1');
// [
//    {key1: 'a', key2: 'someKey'},
//    {key1: '', key2: 'someKey'},
//    {key1: 'b', key2: 'someKey'},
//    {key1: '', key2: 'someKey'},
//    {key1: '', key2: 'someKey'}
// ]
```

## History
```
0.1.103 [2023_03_06]:
   +: add addId

0.1.102 [2023_02_02]:
   *: rename joinClasses to join
   #: fix join
   +: add className
   +: add setIntervalCounts
   +: add getCurrentDateInMs
   +: add parseCurrentDateFromMs

0.1.101 [2023_01_02]:
   #: fixes

0.1.1 [2023_01_02]:
   +: add isObject
   +: add getCommonValues
   +: add removeEmptyValues
   +: add getDifferentValues
   +: add trimEndEmptyValues
   +: add trimStartEmptyValues
   +: add getIndexesOfNonEmptyElements
   ^: add support sorting objects in groupBy
   ^: add support sorting objects in sortArrayLocalCompare
   *: rename combineListToSortedArray to groupBy
   *: rename sortStringArrayLocalCompare to sortArrayLocalCompare
   *: refactor code

0.0.107 [2022_12_22]:
   ^: update readme file

0.0.106 [2022_12_22]:
   ^: update readme file

0.0.105 [2022_12_22]:
   #: fix export
   ^: update readme file

0.0.104 [2022_12_22]:
   +: add sortStringArrayLocalCompare
   #: fix stringCut
   ^: clean code

0.0.103 [2022_12_22]:
   +: add combineListToSortedArray
   #: fix joinClasses

0.0.102 [2022_12_17]:
   ^: update readme file

0.0.101 [2022_12_17]:
   ^: update readme file

0.0.100 [2022_12_17]:
   +: add createHTMLElem
   +: add getRandomHEXColor
   +: add getRandomNumber
   +: add getRandomRGBColor
   +: add getScrollDirection
   +: add isObjectEmpty
   +: add joinClasses
   +: add shuffleArray
   +: add sortArrayOfObj
   +: add stringCut
```
