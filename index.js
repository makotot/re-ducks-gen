#!/usr/bin/env node

const path = require('path')
const fs = require('fs')
const async = require('async')
const mkdir = require('make-dir')
const inquirer = require('inquirer')
const commander = require('commander')
const cosmicconfig = require('cosmiconfig')
const { version, name } = require('./package.json')

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'What is duck name?',
    default: 'duck',
  },
  {
    type: 'confirm',
    name: 'isUsingTemplate',
    message: 'Do you want to use template?',
    default: true,
  },
]

const loadConfig = () => {
  const explorer = cosmicconfig(name)

  return explorer.search()
}

const add = () => {
  loadConfig()
    .then(({ config }) => {
      const rootDir =
        config && config.root
          ? path.resolve(process.cwd(), config.root)
          : process.cwd()

      inquirer.prompt(questions).then(answers => {
        const duckDir = path.resolve(rootDir, answers['name'])
        const templateDir = path.resolve(__dirname, '.templates')

        mkdir.sync(duckDir)

        const fileTypes = [
          'index',
          'actions',
          'operations',
          'reducers',
          'selectors',
          'types',
          'tests',
        ]
        const files = fileTypes.map(name => {
          return {
            input: path.resolve(templateDir, `${name}.js`),
            output: path.resolve(duckDir, `${name}.js`),
          }
        })

        async.each(
          files,
          (file, cb) => {
            if (answers['isUsingTemplate']) {
              fs.copyFile(file.input, file.output, () => {
                console.log(file.output)
                cb()
              })
            } else {
              fs.writeFile(file.output, '', () => {
                console.log(file.output)
                cb()
              })
            }
          },
          () => {
            console.log('Duck files are generated!')
          },
        )
      })
    })
    .catch(err => {
      console.error(err)
    })
}

commander.description('Add new duck files').action(() => add())

commander.version(version).parse(process.argv)
