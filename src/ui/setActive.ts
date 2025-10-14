export const setActive = (elem: string | HTMLElement): void => {
    if (typeof elem === 'string') {
        const element = document.querySelector(`${elem}`);
        element?.classList.add('active');
    } else {
        elem.classList.add('active')
    }
}