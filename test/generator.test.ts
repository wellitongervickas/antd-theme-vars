import { ThemeGenerator } from '../src/generator'

describe('ThemeGenerator', () => {
    it('should install themes', () => {
        const setup = new ThemeGenerator()

        expect(setup.themes).toMatchObject({
            light: {
                'primary-color': 'red'
            }
        })
    })

    it('should generate css vars', () => {
        const setup = new ThemeGenerator()

        expect(setup.vars).toMatchObject({
            'primary-color': 'var(--primary-color)'
        }) 
    })

    it('should generate less vars', () => {
        const setup = new ThemeGenerator()

        expect(setup.vars).toMatchObject({
            'primary-color': 'var(--primary-color)'
        }) 
    })

    it('should generate css vars', () => {
        const setup = new ThemeGenerator()

        expect(setup.css).toBe(
            `.light{--primary-color: red;}`
        )
    })
})