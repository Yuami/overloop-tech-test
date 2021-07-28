export const getAuthorFullName = (author) => {
    if (typeof author === 'object') {
        return `${author.firstName} ${author.lastName}`.trim();
    }
    return ''
};