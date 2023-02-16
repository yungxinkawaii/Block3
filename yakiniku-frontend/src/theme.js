// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
	initialColorMode: 'dark',
	useSystemColorMode: false,
	colors: {
		primary: {
			main: '#e53170',
			50: '#ffe4f0',
			100: '#fbb9d1',
			200: '#f38db0',
			300: '#ec6091',
			400: '#e53372',
			500: '#cc1a58',
			600: '#9f1144',
			700: '#730a31',
			800: '#47041d',
			900: '#1e000b',
		},
		secondary: {
			main: '#f25f4c',
			50: '#ffe7e2',
			100: '#febeb6',
			200: '#f79487',
			300: '#f36a59',
			400: '#ee412a',
			500: '#d52811',
			600: '#a61e0c',
			700: '#781408',
			800: '#490a02',
			900: '#1f0000',
		},
	},
	components: {
		FormLabel: {
			baseStyle: {
				mt: '1em',
			},
		},
	},
}

// 3. extend the theme
const theme = extendTheme(config)

export default theme
