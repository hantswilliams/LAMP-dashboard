import React, { useEffect, useState } from "react"
import {
  MenuItem,
  Icon,
  IconButton,
  TableCell,
  TableRow,
  Select,
  Button,
  FormControl,
  FormHelperText,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core"
import { KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers"
import { useTranslation } from "react-i18next"
import InlineMenu from "./InlineMenu"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    datePicker: {
      "& div": { paddingRight: 0, maxWidth: 175 },
    },
    error: {
      color: "red",
    },
  })
)

export const getDate = (val) => {
  if ((val || "").length > 0) {
    const dateVal = val.split("T")[0].split("-")
    const timeVal = val.split("T")[1].split(":")
    const newDate = new Date()
    newDate.setFullYear(parseInt(dateVal[0]))
    newDate.setMonth(parseInt(dateVal[1]) - 1)
    newDate.setDate(parseInt(dateVal[2]))
    newDate.setHours(timeVal[0])
    newDate.setMinutes(timeVal[1])
    newDate.setSeconds(0)
    return newDate
  }
  return new Date()
}

export const manyDates = (items) =>
  items?.length > 0
    ? items
        ?.slice(0, 3)
        .map((x) => getDate(x).toLocaleString("en-US", Date.formatStyle("timeOnly")))
        .join(", ") + (items?.length > 3 ? ", ..." : "")
    : "No custom times"

export const dateInUTCformat = (val) => {
  let month =
    (val || new Date()).getMonth() + 1 > 9
      ? (val || new Date()).getMonth() + 1
      : "0" + ((val || new Date()).getMonth() + 1)
  let date = (val || new Date()).getDate() > 9 ? (val || new Date()).getDate() : "0" + (val || new Date()).getDate()
  const dateVal =
    (val || new Date()).getFullYear() +
    "-" +
    month +
    "-" +
    date +
    "T" +
    ((val || new Date()).getHours() > 9 ? (val || new Date()).getHours() : "0" + (val || new Date()).getHours()) +
    ":" +
    ((val || new Date()).getMinutes() > 9 ? (val || new Date()).getMinutes() : "0" + (val || new Date()).getMinutes()) +
    ":" +
    ((val || new Date()).getSeconds() > 9 ? (val || new Date()).getSeconds() : "0" + (val || new Date()).getSeconds()) +
    ".000Z"
  return dateVal
}

export default function ScheduleRow({
  scheduleRow,
  index,
  updateActivitySchedule,
  ...props
}: {
  scheduleRow: any
  index: number
  updateActivitySchedule: Function
}) {
  const classes = useStyles()
  const [isEdit, setEdit] = useState(!!scheduleRow.start_date ? false : true)
  const { t } = useTranslation()
  const [data, setData] = useState(scheduleRow)
  const intervals = [
    { key: "hourly", value: `${t("Every hour")}` },
    { key: "every3h", value: `${t("Every number hours", { number: 3 })}` },
    { key: "every6h", value: `${t("Every number hours", { number: 6 })}` },
    { key: "every12h", value: `${t("Every number hours", { number: 12 })}` },
    { key: "daily", value: `${t("Every day")}` },
    { key: "biweekly", value: `${t("Two times every week (Tue, Thurs)")}` },
    { key: "triweekly", value: `${t("Three times every week (Mon, Wed, Fri)")}` },
    { key: "weekly", value: `${t("Every week")}` },
    { key: "bimonthly", value: `${t("Two times every month")}` },
    { key: "fortnightly", value: `${t("Every 2 weeks")}` },
    { key: "monthly", value: `${t("Every month")}` },
    { key: "custom", value: `${t("Use custom times instead")}` },
    { key: "none", value: `${t("Do not repeat")}` },
  ]

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    return !(
      data.start_date === null ||
      data.time === null ||
      data.repeat_interval === "" ||
      data.repeat_interval === null
    )
  }

  return (
    <TableRow key={index} style={{ verticalAlign: !isEdit ? "middle" : "top" }}>
      <TableCell component="th" scope="row">
        {!isEdit ? (
          <span>{getDate(data.start_date ?? "").toLocaleString("en-US", Date.formatStyle("dateOnly"))}</span>
        ) : (
          <KeyboardDatePicker
            clearable
            value={data?.start_date ? getDate(data.start_date ?? "") : ""}
            onBlur={(event) => {
              const date = new Date(event.target.value)
              if (!!date) {
                date.setHours(1)
                date.setMinutes(0)
                date.setSeconds(0)
              }
              setData({
                ...data,
                start_date: date?.isValid() ? dateInUTCformat(date) : null,
                time: date?.isValid() ? dateInUTCformat(date) : null,
              })
            }}
            onChange={(date) => {
              if (!!date) {
                date.setHours(1)
                date.setMinutes(0)
                date.setSeconds(0)
              }
              setData({
                ...data,
                start_date: date?.isValid() ? dateInUTCformat(date) : null,
                time: date?.isValid() ? dateInUTCformat(date) : null,
              })
            }}
            format="MM/dd/yyyy"
            animateYearScrolling
            variant="inline"
            inputVariant="outlined"
            className={classes.datePicker}
            helperText={`${t("Select the start date.")}`}
            size="small"
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit ? (
          <span>{getDate(data.time ?? "").toLocaleString("en-US", Date.formatStyle("timeOnly"))}</span>
        ) : (
          <KeyboardTimePicker
            className={classes.datePicker}
            size="small"
            autoOk
            variant="inline"
            inputVariant="outlined"
            format="hh:mm a"
            mask="__:__ _M"
            placeholder="HH:MM AM"
            error={data.time === "" || data.time === null}
            helperText={`${t("Select the start time.")}`}
            InputAdornmentProps={{ position: "end" }}
            value={data.time ? getDate(data.time ?? "") : ""}
            defaultValue={data.time ? getDate(data.time ?? "") : ""}
            onChange={(date) => {
              setData({ ...data, time: date?.isValid() ? dateInUTCformat(date) : null })
            }}
            onBlur={(event) => {
              const date = data?.start_date ? new Date(data?.start_date) : new Date()

              const value = event.target.value
              const parts = value.match(/(\d+)\:(\d+) (\w+)/)
              const hours =
                /am/i.test(parts[3]) || /AM/i.test(parts[3])
                  ? parseInt(parts[1], 10) === 12
                    ? 0
                    : parseInt(parts[1], 10)
                  : parseInt(parts[1], 10) === 12
                  ? parseInt(parts[1], 10) + 0
                  : parseInt(parts[1], 10) + 12
              const minutes = parseInt(parts[2], 10)
              date.setHours(hours)
              date.setMinutes(minutes)
              setData({ ...data, time: date?.isValid() ? dateInUTCformat(date) : null })
            }}
          />
        )}
      </TableCell>
      <TableCell>
        {!isEdit ? (
          data.repeat_interval
        ) : (
          <FormControl variant="outlined" size="small">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={data.repeat_interval}
              error={data.repeat_interval === "" || data.repeat_interval === null}
              onChange={(event) => {
                setData({ ...data, repeat_interval: event.target.value })
              }}
              style={{ width: "100%", maxWidth: 175 }}
            >
              {intervals.map((interval, index) => (
                <MenuItem key={interval.key} value={interval.key}>
                  {interval.value}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              className={data.repeat_interval === "" || data.repeat_interval === null ? classes.error : ""}
            >
              {`${t("Select the Repeat interval.")}`}
            </FormHelperText>
          </FormControl>
        )}
      </TableCell>
      <TableCell>
        {!isEdit ? (
          <span>
            {data.repeat_interval === "custom" ? <span>{manyDates(data.custom_time)}</span> : `${t("No custom times")}`}
          </span>
        ) : (
          <span>
            {data.repeat_interval !== "custom" ? (
              <Button variant="outlined" disabled>
                {`${t("No custom times")}`}
              </Button>
            ) : (
              <InlineMenu customTimes={data.custom_time} onChange={(x) => setData({ ...data, custom_time: x })} />
            )}
          </span>
        )}
      </TableCell>
      <TableCell>
        {!isEdit ? (
          <IconButton onClick={() => setEdit(true)}>
            <Icon>edit</Icon>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              if (validate()) {
                updateActivitySchedule(data, index, "edit")
                setEdit(false)
              }
            }}
          >
            <Icon>done</Icon>
          </IconButton>
        )}
        {!isEdit ? (
          <IconButton onClick={() => updateActivitySchedule(null, index, "delete")}>
            <Icon>delete</Icon>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => (!!scheduleRow.start_date ? setEdit(false) : updateActivitySchedule(null, index, "delete"))}
          >
            <Icon>close</Icon>
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  )
}
