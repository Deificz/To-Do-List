import _ from 'lodash';
import './style.css';
import iconLogo from '../src/assets/images/logo.png';
import favicon from '../src/assets/images/favicon.ico';
import { Model } from './Model';
import { View } from './View';
import { Controller } from './Controller';

window.addEventListener('load', function() {
    const icon = document.querySelector(`.logo`);
    icon.setAttribute(`src`,`${iconLogo}`);
    const head = document.querySelector(`head`);
    const link = document.createElement('link');
    
    link.rel = 'icon';
    link.type = 'image/ico';
    link.href = favicon;

    head.appendChild(link);
    View.displayPlanList();
    View.displayAllTask();
});

Model();
View();
Controller();
