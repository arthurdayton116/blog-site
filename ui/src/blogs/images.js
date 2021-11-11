import * as blog2Images from './2/images'
import * as blog3Images from './3/images'

const blogImageContent = (id) => {
    switch(id) {
        case 1:
            return '';
        case 2:
            return blog2Images;
        case 3:
            return blog3Images;
        default:
            return 'problem in blogs/images.js file '
    }
};

export default blogImageContent;
