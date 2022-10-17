import ThemeGenerator from "./generator";

function initialize() {
    const theme = new ThemeGenerator()
    
    return {
        vars: theme.vars,
        css: theme.css,
    }
}

export const theme = initialize()

export default theme