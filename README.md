# youwillhireme

Setup:

 0. Be sure to download and install node.js
 1. Clone this repo
 2. Start shell on repo clone folder
 3. Run: npm install
 4. Run: nodemon setup.js
 
Now you should be able to perform HTTP GET call to your service @ localhost:8080/convert

There are 4 arguments that must be passed as input in querystring:
 1. amount : a number representing the amount in the src_currency to be converted in the dest_currency;
 2. src_currency : 3 char standard for the currency related to the amount to be converted
 3. dest_currency : 3 char standard for the target currency
 4. reference_date : a date in format YYYY-MM-DD for the actual rates to be applied (conversion rates source: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml)

Some call examples:
 - http://localhost:8080/convert?amount=10&src_currency=JPY&dest_currency=RON&reference_date=2019-07-22
 - http://localhost:8080/convert?amount=100&src_currency=EUR&dest_currency=RON&reference_date=2019-07-23
 - http://localhost:8080/convert?amount=10&src_currency=JPY&dest_currency=EUR&reference_date=2019-07-24 
 
Enjoy!