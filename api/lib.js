class Range {
  constructor(start, end, score) {
    this.start = start;
    this.end = end;
    this.score = score;
  }
}

class ParseResult {
  constructor(result, isValid) {
    this.result = result;
    this.isValid = isValid;
  }
}

class Measurement {
  constructor(type, ranges) {
    this.type = type;
    this.ranges = ranges;    
    this.start = Math.min(...ranges.map((r) => r.start));
    this.end = Math.max(...ranges.map((r) => r.end));
  }

  parse(measurement) {
    if (
      measurement &&
      typeof measurement.value === "number" &&
      measurement.value > this.start &&
      measurement.value <= this.end
    ) {
      return new ParseResult(measurement, true);
    }

    return new ParseResult(
      {
        name: this.type,
        reason: `must be in range (${this.start} - ${this.end})`,
      },
      false
    );
  }

  score(parsedMeasurment) {
    const measurement = parsedMeasurment.result;
    return this.ranges.find(
      (range) =>
        range.start < measurement.value && range.end >= measurement.value
    ).score;
  }
}

const Temperature = new Measurement("TEMP", [
  new Range(31, 35, 3),
  new Range(35, 36, 1),
  new Range(36, 38, 0),
  new Range(38, 39, 1),
  new Range(39, 42, 3),
]);
const HeartRate = new Measurement("HR", [
  new Range(25, 40, 3),
  new Range(40, 50, 1),
  new Range(50, 90, 0),
  new Range(90, 110, 1),
  new Range(110, 130, 2),
  new Range(130, 220, 3),
]);
const RespiratoryRate = new Measurement("RR", [
  new Range(3, 8, 3),
  new Range(8, 11, 1),
  new Range(11, 20, 0),
  new Range(20, 24, 2),
  new Range(24, 60, 3),
]);

const Measurements = {
  TEMP: Temperature,
  HR: HeartRate,
  RR: RespiratoryRate,
};

const parseMeasurements = (body) => {
  const measurements = body.measurements;

  if (!measurements) {
    return [
      new ParseResult(
        {
          name: "measurements",
          reason: "measurements is required",
        },
        false
      ),
    ];
  }

  const parsedTemp = Measurements.TEMP.parse(
    measurements.find((m) => m.type === Temperature.type)
  );
  const parsedHeartRate = Measurements.HR.parse(
    measurements.find((m) => m.type === HeartRate.type)
  );
  const parsedRespiratoryRate = Measurements.RR.parse(
    measurements.find((m) => m.type === RespiratoryRate.type)
  );

  return [parsedTemp, parsedHeartRate, parsedRespiratoryRate];
};

const calculateScore = (parsedMeasurements) => {
  return {
    score: parsedMeasurements.reduce(
      (acc, parsedMeasurement) =>
        acc +
        Measurements[parsedMeasurement.result.type].score(parsedMeasurement),
      0
    ),
  };
};

module.exports = { parse: parseMeasurements, score: calculateScore };
