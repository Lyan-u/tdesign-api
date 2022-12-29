const prettier = require('prettier');
const prettierConfig = require('../config/prettier');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const kebabCase = require('lodash/kebabCase');
const { FRAMEWORK_MAP } = require('../config');
const { parseJSON } = require('./utils');
const { getImportsConfig, getImportsCode } = require('./generate-import');
const { generateClassNameUnitCase } = require('./generate-class-name');
const { generateTNodeElement } = require('./generate-tnode');
const { generateAttributeUnitCase } = require('./generate-attribute');
const { generateDomUnitCase } = require('./generate-dom');
const { generateEventUnitCase } = require('./generate-event');
const { NEED_USE_DEFAULT_OR_USE_VMODEL } = require('./const');

function generateVitestUnitCase(baseData, framework, { component }) {
  let tests = [];
  const configFlag = { hasEvent: false, importedComponents: [], importedMounts: new Set() };
  Object.entries(baseData).forEach(([component, oneComponentApi]) => {
    if (!oneComponentApi) return;
    let oneComponentTests = [];
    oneComponentApi.forEach((oneApiData) => {
      if (!oneApiData.test_description) return;
      const testDescription = parseJSON(oneApiData.test_description, 'test_description must be a JSON.');
      if (!testDescription.PC || framework.indexOf('PC') === -1) return;
      
      // 存在 Web 框架的单测用例，再输出
      // console.log(testDescription.PC);
      let oneApiTestCase = [];
      const generateFunctionsMap = {
        // 元素类名测试
        className: generateClassNameUnitCase,
        // 元素属性测试
        attribute: generateAttributeUnitCase,
        // 检测 DOM 元素是否存在
        dom: generateDomUnitCase,
        // TNode 测试
        tnode: generateTNodeElement,
        // 事件
        event: generateEventUnitCase,
      };
      Object.keys(testDescription.PC).forEach((key) => {
        if (generateFunctionsMap[key]) {
          oneApiTestCase = generateFunctionsMap[key](testDescription.PC, oneApiData, framework, component)
          if (oneApiTestCase && oneApiTestCase.length) {
            oneComponentTests = oneComponentTests.concat([oneApiTestCase.join('\n'), `\n`]);
            if (key === 'event') {
              configFlag.hasEvent = true;
            }
          }
        }
      });

      if (testDescription.PC.wrapper) {
        configFlag.importedMounts.add(testDescription.PC.wrapper);
      }
      if (testDescription.Mobile && testDescription.Mobile.wrapper) {
        configFlag.importedMounts.add(testDescription.Mobile.wrapper);
      }
    });

    if (oneComponentTests.length) {
      oneComponentTests.unshift(`describe('${component} Component', () => {`);
      oneComponentTests.push('});\n');
      tests = tests.concat(oneComponentTests);
      configFlag.importedComponents.push(component);
    }
  });

  const importConfig = getImportsConfig(configFlag);
  const importCodes = getImportsCode(importConfig, framework);

  try {
    const cases = [importCodes].concat(tests).join('\n\n');
    // console.log('>>>>>>>>', cases, '>>>>>>');
    const codeData = prettier.format(cases, prettierConfig);
    const basePath = FRAMEWORK_MAP[framework].apiBasePath;
    const fileName = kebabCase(component);
    const outputPath = path.resolve(basePath, `${fileName}/__tests__/vitest-${fileName}.test.jsx`);
    const useDefault = framework === 'Vue(PC)' && NEED_USE_DEFAULT_OR_USE_VMODEL.includes(component) ? ',useDefault' : '';
    const comment = [
      `/**\n * 该文件由脚本自动生成，如需修改请联系 PMC\n * `,
      `This file generated by scripts of tdesign-api. \`npm run api:docs ${component} ${framework} vitest,finalProject${useDefault}\`\n * `,
      'If you need to modify this file, contact PMC first please.\n */\n',
    ].join('');

    fs.writeFile(outputPath, comment + codeData, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(chalk.green(`unit test cases file: ${outputPath} has been created.`));
    });
  } catch (e) {
    console.log(chalk.red('格式化失败，请检查生成的文件是否存在语法错误\n'));
    console.warn(e);
  }
}

module.exports = {
  generateVitestUnitCase,
};