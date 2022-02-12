// https://coolors.co/993955-ae76a6-a3c3d9-ccd6eb-e9ecf5
// const primarybackground = '#a3c3d9'
const primarybackground = 'black'
const primarydarkshade1 = '#305873'
const primarydarkshade2 = '#6EA2C4'
const primarytextdarkshade1 = '#566DB3'
const primarytext = '#e9ecf5'
const primarytexthover = '#ccd6eb'
const primaryFontFamily = 'Arial, sans-serif'
const commentBG = '#c7e8f3'

const pw = 27.2
const ph = 18.5

const theme_config =  {
    breakpoints: ['599px','900px','1200px'],
    detail: {
        paddingLeft: '1em'
    },
    fontSizes: [
        12, 14, 16, 24, 32, 48, 64
    ],
    fontFamily: primaryFontFamily,
    colors: {
        primary: '#007bff',
        background: '#e9ecf5',
        primaryBackground: primarybackground,
        commentBG: commentBG,
    },
    navbar: {
        background: primarybackground,
        text: primarytext,
        hover: primarytexthover,
        imageHeight: [(ph*2),(ph*4),(ph*5)],
        imageWidth: [(pw*2),(pw*4),(pw*5)],
    },
    linkSX: {
        color: primarytext,
        fontWeight: 'bold',
        fontSize: '1.5em',
        textDecoration: 'none',
        padding: [1,3,3],
        ':hover': {
            color: primarytexthover,
            fontWeight: 900,
        }
    },
    linkSXAlt1: {
        color: primarybackground,
        fontWeight: 'bold',
        fontSize: ['1em','1em','1.5em'],
        textDecoration: 'none',
        p: [1,2,3],
        ':hover': {
            color: primarytexthover,
            fontWeight: 900,
        }
    },
    linkSXAlt2: {
        color: primarytextdarkshade1,
        fontWeight: 'bold',
        fontSize: '1em',
        textDecoration: 'none',
        padding: 3,
        ':hover': {
            color: primarytexthover,
            fontWeight: 900,
        }
    },
    menuIcon: {
        size: ['20','30','40'],
    },
    h1: {
        text: primarydarkshade2,
    },
    h1Sx: {
        // color: primarydarkshade1,
        color: primarybackground,
        fontFamily: primaryFontFamily,
    },
    h5Sx: {
        // color: primarydarkshade2,
        color: primarybackground,
        fontFamily: primaryFontFamily,
        fontSize: '.75em',
    },
    h4: {
        text: primarydarkshade1,
    },
    h4Sx: {
        color: primarybackground,
        fontFamily: primaryFontFamily,
    },
    text: {
        primary: '#007bff',
        background: '#e9ecf5',
    },
    textArea: {
        fontFamily: primaryFontFamily,
    },
    buttons: {
        background: primarybackground,
        text: primarytext,
        ':hover': {
            color: "black",
            background: "white",
            borderRadius: 9,
            border: "2px solid black",
            fontWeight: 900,
        }
        // primary: {
        //     color: 'blue',
        //     bg: 'primary',
        // },
        // outline: {
        //     color: 'primary',
        //     bg: 'transparent',
        //     boxShadow: 'inset 0 0 0 2px'
        // },
    },
    variants : {
        avatar: {
            width: 48,
            height: 48,
            borderRadius: 9999,
        }
    }
}

export default theme_config;
