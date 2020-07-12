const path = require('path');

module.exports = {
  plugins: process.env.NODE_ENV === 'production'
  ? {
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, 'styles'),
    },
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'nesting-rules': true,
      },
      importFrom: [
        path.join(__dirname, 'styles/typeElements.css'),
      ],
      stage: 3,
    },
  } : {
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, 'styles'),
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'nesting-rules': true,
      },
      importFrom: [
        path.join(__dirname, 'styles/typeElements.css'),
      ],
      stage: 3,
    },
  },
};
