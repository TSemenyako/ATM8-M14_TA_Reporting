"use strict"
const path = require('path');
const yargs = require('yargs');
const htmlReporter = require('cucumber-html-reporter');
const htmlReporterOptions = {
    theme: 'bootstrap',
    jsonFile: path.join(__dirname, '../reports/report.json'),
    output: path.join(__dirname, '../reports/cucumber_html_report.html'),
    reportSuiteAsScenarios: true,       //Reports total number of passed/failed scenarios as HEADER
    launchReport: true      //Automatically launch HTML report at the end of test suite in the default browser
}
const junitReporter = require('cucumber-junit-convert');
const junitReporterOptions = {
    inputJsonFile: path.join(__dirname, '../reports/report.json'),
    outputXmlFile: path.join(__dirname, '../reports/cucumber_junit_report.xml')
}

exports.config = {
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
    },

    //baseUrl: 'https://qa.aws.cpaglobal.com/tipms2/ATDV',
    baseUrl: 'https://qa.aws.cpaglobal.com/tipms3/Q491',
    disableChecks: true,
    directConnect: true,
    allScriptsTimeout: 120000,
    capabilities: {
        'browserName': 'chrome',
        shardTestFiles: yargs.instances > 1,
        maxInstances: yargs.instances || 1
    },

    specs: [path.resolve('./tests/features/*.feature')],
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        ignoreUncaughtExceptions: true,     //to not stop other tests when 1 test failed
        format: ['json:./reports/report.json', './node_modules/cucumber-pretty'],  //output file and console output format
        tags: yargs.tag || '@all'
    },

    onPrepare: function () {
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(false);
    },
    //generate report via cucumber-html-reporter
    afterLaunch: function () {
        htmlReporter.generate(htmlReporterOptions);
        junitReporter.convert(junitReporterOptions);
    }
}
