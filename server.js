
// Constants
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const xmlParser = require('xml2js');
const request = require('request');
const PORT = 8080;
const HOST = "127.0.0.1";

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var conversionRates = {};
request.get('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml', 
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var xml = body;
			xmlParser.parseString(xml, function (err, result) {
				
				var dataArr = result['gesmes:Envelope'].Cube[0].Cube;
				
				for(var i = 0; i < dataArr.length; i++){
					var dayrates = dataArr[i];
					
					var time = dayrates['$'].time;
					
					conversionRates[time] = {};
					
					for(var r = 0; r < dayrates.Cube.length; r++){
						var singleRate = dayrates.Cube[r]['$'];
						conversionRates[time][singleRate.currency] = singleRate.rate;
					}
					
				}
			});
		}
	});

// App
app.get('/convert', (req, res) => {
  
  try {
	var amount = req.query.amount;
	var src_currency = req.query.src_currency;
	var dest_currency = req.query.dest_currency;
	var reference_date = req.query.reference_date;
	
	if(!amount)
		res.status(400).json({
			message: "Amount not specified.",
		});
	else {
	
		var dayRates = conversionRates[reference_date];
		
		if(!dayRates)
			res.status(400).json({
				message: "Date not found. Please try a more recent date.",
			});
		else{
			var srcRate = src_currency == 'EUR' ? 1 : dayRates[src_currency];
			var destRate = dest_currency == 'EUR' ? 1 : dayRates[dest_currency];
			
			if(!srcRate || !destRate)
				res.status(400).json({
					message: "Rates not available for conversion",
				});
			else{
				var result = amount * destRate / srcRate
				res.status(200).json({
				  data: { amount : result, currency : dest_currency }
				});
			}
			
		}
	}
	
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
  
});

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;