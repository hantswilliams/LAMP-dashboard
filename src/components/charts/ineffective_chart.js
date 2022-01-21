export const ineffective = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "A basic line chart example.",
  width: 440,
  height: 224,
  padding: 5,
  title: "Urges (Ineffective)",
  data: {
    values: [
      { value: 1, date: "2020-09-20", symbol: "Punching self" },
      { value: 3, date: "2020-09-20", symbol: "Self-harm / cutting" },
      { value: 2, date: "2020-09-20", symbol: "Binging" },
      { value: 0, date: "2020-09-20", symbol: "Violence towards others" },
      { value: 2, date: "2020-09-20", symbol: "Verbal assualts to others" },
      { value: 3, date: "2020-09-20", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-20", symbol: "Substance abuse" },
      { value: 2, date: "2020-09-21", symbol: "Punching self" },
      { value: 3, date: "2020-09-21", symbol: "Self-harm / cutting" },
      { value: 4, date: "2020-09-21", symbol: "Binging" },
      { value: 0, date: "2020-09-21", symbol: "Violence towards others" },
      { value: 3, date: "2020-09-21", symbol: "Verbal assualts to others" },
      { value: 2, date: "2020-09-21", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-21", symbol: "Substance abuse" },
      { value: 2, date: "2020-09-22", symbol: "Punching self" },
      { value: 2, date: "2020-09-22", symbol: "Self-harm / cutting" },
      { value: 3, date: "2020-09-22", symbol: "Binging" },
      { value: 1, date: "2020-09-22", symbol: "Violence towards others" },
      { value: 3, date: "2020-09-22", symbol: "Verbal assualts to others" },
      { value: 3, date: "2020-09-22", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-22", symbol: "Substance abuse" },
      { value: 3, date: "2020-09-23", symbol: "Punching self" },
      { value: 1, date: "2020-09-23", symbol: "Self-harm / cutting" },
      { value: 5, date: "2020-09-23", symbol: "Binging" },
      { value: 0, date: "2020-09-23", symbol: "Violence towards others" },
      { value: 4, date: "2020-09-23", symbol: "Verbal assualts to others" },
      { value: 3, date: "2020-09-23", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-23", symbol: "Substance abuse" },
      { value: 1, date: "2020-09-24", symbol: "Punching self" },
      { value: 1, date: "2020-09-24", symbol: "Self-harm / cutting" },
      { value: 4, date: "2020-09-24", symbol: "Binging" },
      { value: 1, date: "2020-09-24", symbol: "Violence towards others" },
      { value: 2, date: "2020-09-24", symbol: "Verbal assualts to others" },
      { value: 4, date: "2020-09-24", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-24", symbol: "Substance abuse" },
      { value: 0, date: "2020-09-25", symbol: "Punching self" },
      { value: 1, date: "2020-09-25", symbol: "Self-harm / cutting" },
      { value: 3, date: "2020-09-25", symbol: "Binging" },
      { value: 1, date: "2020-09-25", symbol: "Violence towards others" },
      { value: 1, date: "2020-09-25", symbol: "Verbal assualts to others" },
      { value: 2, date: "2020-09-25", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-25", symbol: "Substance abuse" },
      { value: 1, date: "2020-09-26", symbol: "Punching self" },
      { value: 2, date: "2020-09-26", symbol: "Self-harm / cutting" },
      { value: 4, date: "2020-09-26", symbol: "Binging" },
      { value: 0, date: "2020-09-26", symbol: "Violence towards others" },
      { value: 2, date: "2020-09-26", symbol: "Verbal assualts to others" },
      { value: 2, date: "2020-09-26", symbol: "Compare self to others" },
      { value: 0, date: "2020-09-26", symbol: "Substance abuse" },
    ],
  },
  config: {
    view: { stroke: "transparent" },
    title: {
      color: "rgba(0, 0, 0, 0.75)",
      fontSize: 25,
      font: "Inter",
      fontWeight: 600,
      align: "left",
      anchor: "start",
      dy: -40,
    },
    legend: {
      title: null,
      orient: "bottom",
      columns: 2,
      labelColor: "rgba(0, 0, 0, 0.75)",
      labelFont: "Inter",
      labelFontSize: 14,
      labelFontWeight: 600,
      rowPadding: 20,
      columnPadding: 30,
      symbolStrokeWidth: 12,
      symbolSize: 150,
      symbolType: "circle",
      offset: 30,
    },
    axisX: {
      orient: "bottom",
      format: "%b %d %a",
      labelColor: "rgba(0, 0, 0, 0.4)",
      labelFont: "Inter",
      labelFontWeight: 500,
      labelFontSize: 12,
      ticks: false,
      labelExpr: "substring(datum.label, 0, 9)",
      labelPadding: 32,
      title: "Date",
      grid: false,
    },
    axisY: {
      orient: "left",
      tickCount: 5,
      labelColor: "rgba(0, 0, 0, 0.4)",
      labelFont: "Inter",
      labelFontWeight: 500,
      labelFontSize: 12,
      ticks: false,
      labelPadding: 10,
      title: null,
      grid: false,
    },
  },
  mark: {
    type: "line",
    interpolate: "cardinal",
    tension: 0.9,
  },
  selection: {
    symbol: { type: "multi", fields: ["symbol"], bind: "legend", toggle: "true" },
  },
  encoding: {
    x: { field: "date", axis: { labelAngle: 65 }, timeUnit: "utcyearmonthdate" },
    y: { field: "value", title: "Intensity", type: "quantitative" },
    color: { field: "symbol", type: "nominal" },
    strokeWidth: { value: 2.7 },
    opacity: {
      condition: { selection: "symbol", value: 1 },
      value: 0,
    },
  },
}
