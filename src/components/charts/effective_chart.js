export const effective = {
  $schema: "https://vega.github.io/schema/vega-lite/v4.json",
  description: "A basic line chart example.",
  width: 440,
  height: 224,
  padding: 5,
  title: "Urges (Effective)",
  data: {
    values: [
      { value: 1, date: "2020-09-20", symbol: "Self-care" },
      { value: 3, date: "2020-09-20", symbol: "Mastery" },
      { value: 2, date: "2020-09-21", symbol: "Self-care" },
      { value: 3, date: "2020-09-21", symbol: "Mastery" },
      { value: 2, date: "2020-09-22", symbol: "Self-care" },
      { value: 2, date: "2020-09-22", symbol: "Mastery" },
      { value: 3, date: "2020-09-23", symbol: "Self-care" },
      { value: 1, date: "2020-09-23", symbol: "Mastery" },
      { value: 1, date: "2020-09-24", symbol: "Self-care" },
      { value: 1, date: "2020-09-24", symbol: "Mastery" },
      { value: 0, date: "2020-09-25", symbol: "Self-care" },
      { value: 1, date: "2020-09-25", symbol: "Mastery" },
      { value: 1, date: "2020-09-26", symbol: "Self-care" },
      { value: 2, date: "2020-09-26", symbol: "Mastery" },
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
      columnPadding: 50,
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
      title: "Intensity",
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
    x: { field: "date", axis: { labelAngle: 65 },type: "ordinal", timeUnit: "yearmonthdate" },
    y: { field: "value", title: "Intensity", type: "quantitative" },
    color: { field: "symbol", type: "nominal" },
    strokeWidth: { value: 2.7 },
    opacity: {
      condition: { selection: "symbol", value: 1 },
      value: 0,
    },
  },
}
