# youwillhireme

Setup:

 0. Be sure to download and install node.js
 1. Clone this repo
 2. Start shell on repo clone folder
 3. Run: npm install
 4. Run: nodemon setup.js
 
Now you should be able to perform HTTP GET call to your service @ localhost:8080/convert

There are 4 arguments that must be passed as input in querystring:
 . amount : a number representing the amount of the src_currency to be converted in the dest_currency;
 . src_currency : 3 char standard for the currency of the give amount
 . dest_currency : 3 char standard for the currency conversion target
 . reference_date : a date in format YYYY-MM-DD for the conversion rates to be applied

