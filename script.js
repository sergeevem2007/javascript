'use strict';

let collection = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    body = document.querySelector('body'),
    titleBook = document.querySelectorAll('a'),
    advertising = document.querySelector('.adv'),
    chapter = document.querySelectorAll('li'),
    newChapter = document.createElement('li');

    console.log(chapter);
    
    collection.prepend(book[1]);
    book[0].after(book[4]);
    book[5].after(book[2]);

    body.style.backgroundImage = "url('../image/you-dont-know-js.jpg')";

    titleBook[4].textContent = 'Книга 3. this и Прототипы Объектов';

    advertising.remove();

    chapter[3].after(chapter[6]);
    chapter[6].after(chapter[8]);
    chapter[50].after(chapter[48]);
    chapter[49].before(chapter[55]);
    chapter[7].after(chapter[2]);
    chapter[54].before(chapter[51]);

    newChapter.textContent = 'Глава 8: За пределами ES6';
    chapter[25].append(newChapter);