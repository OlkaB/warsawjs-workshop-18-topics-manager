/*jshint esversion: 6 */
import Helpers from './helper';
import hellojs from 'hellojs';
import config from './config';
require('bulma'); //dawna notacja


const helpers = new Helpers();

hellojs.init({
    github: config.client_id
}, {
    redirect_uri: config.redirect_uri
});

console.log("Hello js", hellojs);

/* ustawiam, jak będzie przebiegało logowanie.*/
const github = hellojs('github');
console.log("github", github);

/* poniżej jest akcja logowania, którą trzeba podpiąć pod jakiś bttn click czy coś */
const login = function() {
    github.login().then(function(evnt) {
        console.log('login event: ', evnt);
    }, function(error) {
        console.log('error: ', error);
    });
};

/* event wywołujący akcję logowania */
const githubAuthLink = document.querySelector('#GitHub-login');
githubAuthLink.addEventListener('click', () => {
    event.preventDefault();
    login();
});

let userData;
hellojs.on('auth.login', function(auth) {
    // Call user information, for the given network
    hellojs(auth.network).api('me').then(function(r) {
        // Inject it into the container
        var label = document.getElementById('user-panel');
        if (!label) {
            label = document.createElement('div');
            label.id = 'profile_' + auth.network;
            document.getElementById('profile').appendChild(label);
        }
        userData = r;
        console.log("user data: ", r);
        label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
    });
});


/* adding topics */
let topics = [];
document.querySelector('.js-cancel-adding-topic').addEventListener('click', clearForm);
document.querySelector('.js-add-topic').addEventListener('click', addTopic);

function addTopic(event) {
    event.preventDefault();
    const topicTitle = document.querySelector;
    if (topicTitle) {
        const addedTopicData = {
            topicId: Date.now(),
            topicTitle: document.querySelector('.js-topic-title').value,
            topicDescr: document.querySelector('.js-topic-descr').value,
            userName: userData.name,
            userAvatar: userData.avatar_url,
            userEmail: userData.email
        }
        topics.push(addedTopicData);
        saveInLocalStorage();
        clearForm();
        renderTopic(addedTopicData);
    }
    return;
}

function saveInLocalStorage() {
    window.localStorage.setItem('WawJsTopics', JSON.stringify(topics));
}

function clearForm() {
    var formInputs = document.querySelectorAll('.js-form-add-topic input, .js-form-add-topic textarea');
    for (var i = 0, max = formInputs.length; i < max; i++) {
        formInputs[i].value = null;
    }
}

(function readTopicsFromStorage() {
    topics = JSON.parse(window.localStorage.getItem('WawJsTopics')) || [];
    console.log('topics on init: ', topics);
    if (topics.length > 0) {
        console.log('rendering init topics: ', topics);
        for (var i = 0, max = topics.length; i < max; i++) {
            renderTopic(topics[i]);
        }
    }
}());

function renderTopic(addedTopicData) {
    const topicHTML =
        `<div class="column is-3">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    ${addedTopicData.topicTitle}
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    ${addedTopicData.topicDescr}
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">Zagłosuj</a>
                <a href="#" class="card-footer-item">Chcę być trenerem</a>
            </footer>
        </div>
    </div>`;
    document.querySelector('.js-topics-list').insertAdjacentHTML('beforeend', topicHTML);
}

new Promise((resolved, reject) => {

})