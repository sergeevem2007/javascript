'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import validateForm from './modules/validateForm';
import hoverImage from './modules/hoverImage';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import validateInput from './modules/validateInput';

// Timer
countTimer('1 May 2020');
// Menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
// slider
slider();
// validate form
validateForm();
// hover image
hoverImage();
//calculator
calc(100);
// send-ajax-form
sendForm();
//validate input
validateInput();
