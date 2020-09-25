const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: [],
  theme: {
    colorModes: ['dark', 'rainbow'],
    extend: {
      colors: {
        text: {
          default: 'var(--color)',
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)'
        },
        btn: {
          text: 'var(--btn-text-color)',
          bg: 'var(--btn-color)',
          hover: 'var(--btn-color-hover)'
        },
        bg: {
          default: 'var(--bg)',
          light: 'var(--bg-light)',
          primary: 'var(--bg-primary)'
        },
        border: {
          default: 'var(--border-color)'
        }
      },
      borderWidth: {
        3: '3px'
      },
      fontFamily: {
        header: ['Rubik', 'sans-serif']
      },
      strokeWidth: {
        3: '3',
        4: '4'
      },
      boxShadow: {
        light: '0 0 15px 0 rgba(255,255,255, .1)',
        dark: '0 0 15px 0 #ababab'
      }
    }
  },
  variants: {
    // backgroundColor: ({ after }) => after(['dark', 'rainbow']),
    backgroundColor: [
      'dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd',
      'rainbow', 'rainbow-hover', 'rainbow-group-hover', 'rainbow-even', 'rainbow-odd',
      'hover', 'responsive'
    ],
    borderColor: [
      'dark', 'dark-focus', 'dark-focus-within',
      'rainbow', 'rainbow-focus', 'rainbow-focus-within',
      'hover', 'responsive'
    ],
    textColor: [
      'dark', 'dark-hover', 'dark-active',
      'rainbow', 'rainbow-hover', 'rainbow-active',
      'hover', 'responsive'
    ],
    margin: [
      'responsive', 'hover', 'focus', 'important'
    ],
    padding: [
      'responsive', 'hover', 'focus', 'important'
    ],
    borderWidth: [
      'responsive', 'hover', 'focus', 'important'
    ]
  },
  plugins: [
    require('./plugins/tailwindcss-color-modes.js')(),
    plugin(function ({ addVariant, e }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls((decl) => {
            decl.important = true
          })
        })
      })
    })
  ]
}
