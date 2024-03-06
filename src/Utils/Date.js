// Dans un fichier appelé dateUtils.js

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Options de formatage
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Utiliser la méthode toLocaleDateString pour formater la date
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};
