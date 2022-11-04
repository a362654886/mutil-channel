# mutil-channel

# Front-end

Front-end structure:

How to run it:


How to test it:


# Back-end

**Back-end structure:**
###########目录结构描述
├── Readme.md                   // help
├── app                         // 应用
├── config                      // 配置
│   ├── default.json
│   ├── dev.json                // 开发环境
│   ├── experiment.json         // 实验
│   ├── index.js                // 配置控制
│   ├── local.json              // 本地
│   ├── production.json         // 生产环境
│   └── test.json               // 测试环境
├── data
├── doc                         // 文档
├── environment
├── gulpfile.js
├── locales
├── logger-service.js           // 启动日志配置
├── node_modules
├── package.json
├── app-service.js              // 启动应用配置
├── static                      // web静态资源加载
│   └── initjson
│       └── config.js         // 提供给前端的配置
├── test
├── test-service.js
└── tools

![image](https://user-images.githubusercontent.com/41553112/199860022-a82ffb76-d10e-408b-b5fa-4f559e2a96b5.png)

dist: TypeScript transpiled javascript file

src/AWS: aws server related functions

src/common: save all common values 

src/handler: used to handle interface logic,format paramaters from frontend and then use realted controller to generate return body

src/controller:: useed to hanle internal logic and then return result to handler

src/service: save all service fucntions, such as connection, add, delete .....

src/tools: helper tools

src/type: all typescript types 

test/jestTest: jest test files

test/playwright: playwright test files

.env.dev/.env.prod: env setting files



**How to run it:**

npm run install

-- run it on local 

serverless offline start

-- deploy it (note: need realted aws role)

serverless deploy -v  

**How to test it:**

jest test: npm run testJest

playwright test: npm run testPlayRight


note: I recommended Jest should be used for functional test and playwright for API test. Now the test files are not completed, only list some examples.


**API Document**: https://app.swaggerhub.com/apis-docs/a362654886/mutil-channel/1.00#/

