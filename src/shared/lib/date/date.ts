export const formattedDate = (toDate: string | undefined) => {
    const dateObject = toDate ? new Date(toDate) : null;
    const day = dateObject?.getDate().toString().padStart(2, '0');
    const month = dateObject?.getMonth()?.toString().padStart(2, '0');
    const year = dateObject?.getFullYear();
    const date = `${day}.${month}.${year}`;
    return date;
};
