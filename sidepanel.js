document.addEventListener('DOMContentLoaded', () => {
  const mainMenu = document.getElementById('main-menu');
  const playerPanel = document.getElementById('player-panel');
    const fetchPanel = document.getElementById('fetch-panel');

  // menu_1 kattintás: váltás a lejátszó panelre
  document.getElementById('menu_1').addEventListener('click', () => {
    mainMenu.classList.remove('active');
    playerPanel.classList.add('active');
  });

  // menu_2 kattintás: egyelőre semmi, de kattintható (később fejleszthető)
  document.getElementById('menu_2').addEventListener('click', () => {
    mainMenu.classList.remove('active');
    fetchPanel.classList.add('active');
    // Üresen hagyva, későbbi fejlesztéshez
    console.log('menu_2 kattintva');
  });

  // back to main: vissza a főmenübe
  document.getElementById('back-to-main').addEventListener('click', () => {
    playerPanel.classList.remove('active');
    mainMenu.classList.add('active');
  });

    // back to main: vissza a főmenübe
  document.getElementById('back-to-main1').addEventListener('click', () => {
     fetchPanel.classList.remove('active');
    mainMenu.classList.add('active');
  });


  // play, pause, reset: egyelőre üresen (később fejleszthető)
  document.getElementById('play').addEventListener('click', () => {
    // Üresen hagyva
    console.log('play kattintva');
  });

  document.getElementById('pause').addEventListener('click', () => {
    // Üresen hagyva
    console.log('pause kattintva');
  });

  document.getElementById('reset').addEventListener('click', () => {
    // Üresen hagyva
    console.log('reset kattintva');
  });
});