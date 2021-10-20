import data from '../blogs/data.json';

export const postData = (postID) => {
    return data.filter((obj) => {
        // eslint-disable-next-line
        return obj.id === postID
    })[0]
}

