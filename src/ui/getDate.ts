export const getDate = (): string => {
    const currentDate = new Date();
    
    const month = (currentDate.getMonth() + 1) < 10 ? `0${currentDate.getMonth() + 1}` : (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate().toString();
    const year = currentDate.getFullYear().toString();

    return `${year}-${month}-${day}`;
}