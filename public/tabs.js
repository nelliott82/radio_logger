const registerTab = document.querySelector('#register');
const loginTab = document.querySelector('#login');
const resetTab = document.querySelector('#reset');

const handleTabClick = (tab) => {
  const tabsListElement = document.querySelector('.tabs').children[0];

  for (let i = 0; i < tabsListElement.children.length; i++) {
    let listElement = tabsListElement.children[i];
    let formElement = document.querySelector(`.${listElement.id}`);

    if (listElement.id === tab) {
      formElement.classList.remove('hidden');
      listElement.style.background = 'rgba(255, 255, 255, .8)'
    } else {
      formElement.classList.add('hidden');
      listElement.style.background = 'rgba(51, 78, 153, .8)'
    }
  }
}

registerTab.addEventListener('click', function () {
  handleTabClick('register');
});

loginTab.addEventListener('click', function () {
  handleTabClick('login');
});

resetTab.addEventListener('click', function () {
  handleTabClick('reset');
});