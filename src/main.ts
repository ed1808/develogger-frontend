import { getDate } from "./ui/getDate";
import { hideMainMenu, showMainMenu } from "./ui/mainMenu";
import { setActive } from "./ui/setActive";

import './ui/components/app-window';
import { capitalize } from "./utils/capitalize";

document.addEventListener('DOMContentLoaded', () => {
  let isMenuVisible = false;
  let zCounter = 10;

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

      if (btn.id !== 'menu' && btn.id !== 'logout') {
        createWindow(btn.id);
      }
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

  document.addEventListener('mousedown', (e) => {
    const win = (e.target as HTMLElement).closest('app-window');

    if (!win) return;

    document.querySelectorAll('app-window.active-window').forEach(el => el.classList.remove('active-window'));

    win.classList.add('active-window');
    win.style.zIndex = (++zCounter).toString();
  });
});

function createWindow(elemId: string) {
  const win = document.createElement('app-window') as any;

  win.init(`${capitalize(elemId)}`);
  
  win.style.top = '250px';
  win.style.left = '250px';

  document.querySelector('#desktop')?.appendChild(win);
}
