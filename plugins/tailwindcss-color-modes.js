module.exports = function () {
  return function ({ addVariant, theme, e }) {
    const colorModes = theme('colorModes', [])
    colorModes.forEach((mode) => {
      const modeSelector = `.${mode}-mode`
      addVariant(`${mode}`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}${separator}${className}`)}, ${modeSelector}.${e(`${mode}${separator}${className}`)}`
        })
      })

      addVariant(`${mode}-hover`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-hover${separator}${className}`)}:hover, ${modeSelector}.${e(`${mode}-hover${separator}${className}`)}:hover`
        })
      })

      addVariant(`${mode}-focus`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-focus${separator}${className}`)}:focus, ${modeSelector}.${e(`${mode}-focus${separator}${className}`)}:focus`
        })
      })

      addVariant(`${mode}-active`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-active${separator}${className}`)}:active, ${modeSelector}.${e(`${mode}-active${separator}${className}`)}:active`
        })
      })

      addVariant(`${mode}-disabled`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-disabled${separator}${className}`)}:disabled, ${modeSelector}.${e(`${mode}-disabled${separator}${className}`)}:disabled`
        })
      })

      addVariant(`${mode}-group-hover`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .group:hover .${e(`${mode}-group-hover${separator}${className}`)}, ${modeSelector}.group:hover .${e(`${mode}-group-hover${separator}${className}`)}`
        })
      })

      addVariant(`${mode}-focus-within`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-focus-within${separator}${className}`)}:focus-within, ${modeSelector}.${e(`${mode}-focus-within${separator}${className}`)}:focus-within`
        })
      })

      addVariant(`${mode}-even`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-even${separator}${className}`)}:nth-child(even), ${modeSelector}.${e(`${mode}-even${separator}${className}`)}:nth-child(even)`
        })
      })

      addVariant(`${mode}-odd`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-odd${separator}${className}`)}:nth-child(odd), ${modeSelector}.${e(`${mode}-odd${separator}${className}`)}:nth-child(odd)`
        })
      })

      addVariant(`${mode}-placeholder`, ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `${modeSelector} .${e(`${mode}-placeholder${separator}${className}`)}::placeholder, ${modeSelector}.${e(`${mode}-placeholder${separator}${className}`)}::placeholder`
        })
      })
    })
  }
}
