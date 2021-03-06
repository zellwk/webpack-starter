// Test for hot-reload
require('../scss/styles.scss');

document.getElementById('content').textContent = 'BOOYAH!'

// Tests for ES6
document.addEventListener('click', e => {
  console.log(e.target);
})

// Required on main file to accept hot reload
if (module.hot) {
  module.hot.accept();
}