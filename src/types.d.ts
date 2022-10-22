declare namespace Library {
    type Config = {
        themesPath: string
    }
    
    type Themes = {
        [key: string]: Setup.Theme
    }

	type Theme = {
		[key: string]: string
	}

    type Vars = {
        [key: string]: string
    }
}