import {lazy} from "react";
import {importMDX} from "mdx.macro";

const blog1 = lazy(() => importMDX('../blogs/1/index.mdx'))
const blog2 = lazy(() => importMDX('../blogs/2/index.mdx'))
const blog3 = lazy(() => importMDX('../blogs/3/index.mdx'))
const blog4 = lazy(() => importMDX('../blogs/4/index.mdx'))
const blog5 = lazy(() => importMDX('../blogs/5/index.mdx'))
const blog6 = lazy(() => importMDX('../blogs/6/index.mdx'))
const blog7 = lazy(() => importMDX('../blogs/7/index.mdx'))

const blogContent = (id) => {
    switch(id) {
        case 1:
            return blog1;
        case 2:
            return blog2;
        case 3:
            return blog3;
        case 4:
            return blog4;
        case 5:
            return blog5;
        case 6:
            return blog6;
        case 7:
            return blog7;
        default:
            return 'YOU FORGOT TO ADD BLOG TO Blog.MDX.js'
    }
};

export default blogContent;
