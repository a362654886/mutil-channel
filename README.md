# mutil-channel

## Front-end

LINK: https://master.d1svl08733sozm.amplifyapp.com/

### Front-end structure:
![image](https://user-images.githubusercontent.com/41553112/199976031-e9976951-6329-441a-9e78-5fb907f24815.png)

-src/common: save all common values

-src/hooks: save all hooks functions 

-src/pages: all web pages

--src/pages/HomePage singal page

---src/pages/HomePage/components: singal page's publich component

---src/pages/HomePage/components/NewChannel/index.ts: singal page's component

---src/pages/HomePage/components/NewChannel/style.ts: singal page's css file

---src/pages/HomePage/components/NewChannel/index.test.ts: singal page's jest file

-src/service: all API files 

-src/store: redux store/reducers 

-src/tools: all helper functions 

-src/types: all types 

-test: playwright test file

-playwright.config.ts: playwright config file

-tsconfig.json: typescript config file


### How to run it:

![image](https://user-images.githubusercontent.com/41553112/199978243-33a806b8-a7f4-4c94-8ddd-58dadbdac2bf.png)

npm install. 

then

npm run start/yarn start: run it on local and connect local backend

npm run srart:prod/yarn start:prod: run it on local and connect prod backend


### How to test it:

npm run test/yarn test: run all jest tests

npm run test:playwright /yarn test:playwright: run all playwright tests

npm run test:debug /yarn test:debug: debug all playwright tests

note: I recommended Jest should be used for functional test and playwright for UI test. Now the test files are not completed, only list some examples.


## Back-end

### BackEnd Structure

![image](https://user-images.githubusercontent.com/41553112/199860022-a82ffb76-d10e-408b-b5fa-4f559e2a96b5.png)

-dist: TypeScript transpiled javascript file

-src/AWS: aws server related functions

-src/common: save all common values 

-src/handler: used to handle interface logic,format paramaters from frontend and then use realted controller to generate return body

-src/controller:: useed to hanle internal logic and then return result to handler

-src/service: save all service fucntions, such as connection, add, delete .....

-src/tools: helper tools

-src/type: all typescript types 

-test/jestTest: jest test files

-test/playwright: playwright test files

.env.dev/.env.prod: env setting files

-swagger.yml:  swagger file

-serverless.yml: serverless config file



### **How to run it:**

npm run install

-- run it on local 

serverless offline start

-- deploy it (note: need realted aws role)

serverless deploy -v  

### **How to test it:**

jest test: npm run testJest

playwright test: npm run testPlayRight


note: I recommended Jest should be used for functional test and playwright for API test. Now the test files are not completed, only list some examples.


**API Document**: https://app.swaggerhub.com/apis-docs/a362654886/mutil-channel/1.00#/

