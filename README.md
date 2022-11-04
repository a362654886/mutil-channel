# mutil-channel

# Front-end

Front-end structure:

How to run it:


How to test it:


# Back-end

Back-end structure:
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


How to run it:

npm run install

-- run it on local 
serverless offline start
-- deploy it (note: need realted aws role)
serverless deploy -v  

How to test it:
jest test: npm run testJest
playwright test: npm run testPlayRight

note: I recommended Jest should be used for functional test and playwright for API test. Now the test files are not completed, only list some examples.


API Document: https://app.swaggerhub.com/apis-docs/a362654886/mutil-channel/1.00#/

