/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');
const {APP_LANGUAGES} = require('../../../app/config/constants');

module.exports = {
  description: 'Add an connected module',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Home',
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or module with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'input',
      name: 'defaultName',
      message: 'What default name do you want to use for i18n, context and routes?',
      default: '{{properCase name}}',
    },
    {
      type: 'confirm',
      name: 'memo',
      default: true,
      message: 'Do you want to wrap your module in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: false,
      message: 'Do you want i18n messages (i.e. will this module use text)?',
    },
    {
      type: 'confirm',
      name: 'wantInnerRoutes',
      default: true,
      message: 'Do you want to manage inner routes?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load the module asynchronously?',
    },
  ],
  actions: data => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{properCase name}}.js',
        templateFile: './module/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/tests/index.test.js',
        templateFile: './module/test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{properCase defaultName}}Context/index.js',
        templateFile: './module/context.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{properCase defaultName}}Context/{{camelCase defaultName}}Reducer.js',
        templateFile: './module/reducer.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{properCase defaultName}}Context/reducer.test.js',
        templateFile: './module/reducer.test.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../app/modules/{{properCase name}}/{{properCase defaultName}}Context/actions.test.js',
        templateFile: './module/actions.test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If the user wants i18n messages
    if (data.wantMessages) {
      APP_LANGUAGES.forEach(lang => {
        actions.push({
          type: 'add',
          path: `../../app/locales/${lang}/{{ camelCase defaultName }}.json`,
          templateFile: './module/messages.js.hbs',
          abortOnFail: true,
        });
      })
    }

    // If the user wants Loadable.js to load the module asynchronously
    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../app/modules/{{properCase name}}/index.js',
        templateFile: './module/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/modules/',
    });

    return actions;
  },
};
