/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'blockquote p:first-of-type::before': {
							content: 'none'
						},
						'blockquote p:last-of-type::after': {
							content: 'none'
						},
						'code::before': {
							content: ''
						},
						'code::after': {
							content: ''
						}
					}
				}
			}
		}
	}
};
