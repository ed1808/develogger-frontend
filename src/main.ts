import { getDate } from "./ui/getDate";
import { hideMainMenu, showMainMenu } from "./ui/mainMenu";
import { setActive } from "./ui/setActive";

document.addEventListener('DOMContentLoaded', () => {
  let isMenuVisible = false;

  const displayDate = document.querySelector<HTMLSpanElement>('#date-display');
  const buttons = document.querySelectorAll<HTMLButtonElement>('nav button');
  const menuBtn = Array.from(buttons).find(btn => btn.id === 'menu');
  
  displayDate!.textContent = getDate();

  menuBtn!.addEventListener('click', (e) => {
    e.stopPropagation();

    if (!isMenuVisible) {
      showMainMenu();
    } else {
      hideMainMenu();
    }

    isMenuVisible = !isMenuVisible;
  });

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(button => button.classList.remove('active'));
      setActive(btn);
    });
  });

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const clickedInsideNav = target.closest('nav');
    const clickedInsideMenu = target.closest('.app-menu');

    if (!clickedInsideNav && !clickedInsideMenu) {
      buttons.forEach(btn => btn.classList.remove('active'));

      if (isMenuVisible) {
        hideMainMenu();
        isMenuVisible = !isMenuVisible;
      }
    }
  });
})
