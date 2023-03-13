const functions = require("@google-cloud/functions-framework");
const calculator = require("./lib");
/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http("calculateNewsScore", (req, res) => {
  try {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "POST");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    res.append("Content-Type", "application/json");
    switch (req.method) {
      case "OPTIONS": {
        res.send();
        break;
      }
      case "POST":
        const parsedMeasurements = calculator.parse(req.body);
        if (parsedMeasurements.some((measurement) => !measurement.isValid)) {
          res.status(400).send({
            type: "https://example.net/validation-error",
            title: "Invalid request",
            "invalid-params": parsedMeasurements
              .filter((p) => !p.isValid)
              .map((p) => p.result),
          });
        } else {
          res.send(calculator.score(parsedMeasurements));
        }
        break;
      default:
        return res.status(405).send("Unsupported method");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("An internal error occurred");
  }  
});
