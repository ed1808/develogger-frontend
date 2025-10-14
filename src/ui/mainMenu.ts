export const showMainMenu = (): boolean => {
    const menu = document.querySelector<HTMLDivElement>('.app-menu');
    menu?.classList.add('show');

    return true;
}

export const hideMainMenu = (): boolean => {
    const menu = document.querySelector<HTMLDivElement>('.app-menu');
    menu?.classList.remove('show');

    return false;
}