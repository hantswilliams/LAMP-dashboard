import React, { useState } from "react"
import {
  Box,
  IconButton,
  Button,
  TextField,
  Popover,
  MenuItem,
  Tooltip,
  Grid,
  Fab,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  Icon,
  DialogContentText,
} from "@material-ui/core"

import { useSnackbar } from "notistack"
import { ReactComponent as AddIcon } from "../../../icons/plus.svg"

import CloseIcon from "@material-ui/icons/Close"

import QRCode from "qrcode.react"
// Local Imports
import LAMP, { Study } from "lamp-core"

import SnackMessage from "../../SnackMessage"
import { makeStyles, Theme, createStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import { useTranslation } from "react-i18next"

import SensorDialog from "./SensorDialog"
const _qrLink = (credID, password) =>
  window.location.href.split("#")[0] +
  "#/?a=" +
  btoa([credID, password, LAMP.Auth._auth.serverAddress].filter((x) => !!x).join(":"))

const theme = createMuiTheme({
  overrides: {
    MuiFilledInput: {
      root: {
        border: 0,
        backgroundColor: "#f4f4f4",
        borderRadius: "10px !important",
      },
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
    },
    MuiTextField: {
      root: { width: "100%" },
    },
    MuiDivider: {
      root: { margin: "25px 0" },
    },
  },
})

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    backdrop: {
      zIndex: 111111,
      color: "#fff",
    },

    buttonContainer: {
      width: 200,
      height: 50,
      marginTop: 91,
      background: "#7599FF",
      boxShadow: "0px 10px 15px rgba(96, 131, 231, 0.2)",
      borderRadius: 25,
    },
    buttonText: {
      fontWeight: "bold",
      fontSize: 16,
      color: "white",
    },
    padding20: {
      padding: "20px",
    },
    backContainer: {
      width: 200,
      height: 50,
      borderRadius: 25,
      backgroundColor: "transparent",
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    },
    backText: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#4C66D6",
    },
    buttonsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      marginTop: 55,
      marginBottom: 55,
      alignItems: "center",
      justifyContent: "center",
    },
    headerButton: {
      position: "absolute",
      width: 105,
      height: 50,
      right: 60,
      top: 25,
      background: "#7599FF",
      boxShadow: "0px 10px 15px rgba(96, 131, 231, 0.2)",
      borderRadius: 25,
      zIndex: 1111,
      "&:hover": { background: "#5680f9" },
    },

    PopupButton: {
      marginTop: 35,
      width: 168,
      height: 50,
      background: "#7599FF",
      boxShadow: "0px 10px 15px rgba(96, 131, 231, 0.2)",
      borderRadius: 25,
      marginBottom: 40,
      "&:hover": { background: "#5680f9" },
    },
    sectionTitle: {
      color: "rgba(0, 0, 0, 0.75)",
      fontSize: 25,
      fontWeight: "bold",
      marginTop: 50,
    },
    inputContainer: {
      backgroundColor: "#F5F5F5",
      borderRadius: 10,
      marginTop: 17,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      paddingRight: 20,
      paddingLeft: 20,
    },
    inputDescription: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.5)",
      fontWeight: "bold",
      width: "100%",
      textAlign: "right",
    },
    contentContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },
    groupTitle: {
      fontSize: 12,
      color: "rgba(0, 0, 0, 0.4)",
      textTransform: "uppercase",
    },
    rowContainer: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      height: 36,
      fontWeight: 600,
    },
    contentText: {
      color: "rgba(0, 0, 0, 0.75)",
      fontWeight: "bold",
      fontSize: 14,
      marginLeft: 10,
    },
    deleteButton: {
      width: 16,
      height: 16,
      color: "rgba(0, 0, 0, 0.45)",
      marginRight: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    addContainer: {
      display: "flex",
      alignItems: "center",
    },
    addButtonTitle: {
      color: "#5784EE",
      fontWeight: 600,
      fontSize: 14,
    },
    addButton: {
      marginRight: 19,
      color: "#5784EE",
      width: 22,
      height: 22,
      marginLeft: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    popWidth: { width: "95%", maxWidth: "500px", padding: "0 40px" },
    containerWidth: { maxWidth: 1055 },
    inputWidth: { width: "100%" },
    linkBtn: { color: "#6083E7", fontSize: 14, fontWeight: 500, "& svg": { marginRight: 15 } },
    chatDrawerCustom: { minWidth: 411 },
    profileMessage: {
      background: "#7599FF",
      bottom: 30,
      right: 40,
      "&:hover": { background: "#5680f9" },
      "& svg": {
        "& path": { fill: "#fff", fillOpacity: 1 },
      },
    },
    customPopover: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
    customPaper: {
      maxWidth: 380,
      maxHeight: 500,

      marginLeft: 100,
      borderRadius: 10,
      padding: "10px 0",
      "& h6": { fontSize: 16 },
      "& li": {
        display: "inline-block",
        width: "100%",
        padding: "15px 30px",
        "&:hover": { backgroundColor: "#ECF4FF" },
      },
      "& *": { cursor: "pointer" },
    },
    toolbardashboard: {
      minHeight: 100,
      padding: "0 10px",
      "& h5": {
        color: "rgba(0, 0, 0, 0.75)",
        textAlign: "left",
        fontWeight: "600",
        fontSize: 30,
        width: "calc(100% - 96px)",
      },
    },
    dialogTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 0.75)",
      marginTop: 30,
    },
  })
)

export default function UpdateSensor({ studies, sensor, ...props }) {
  const [selectedItem, setSelectedItem] = useState(null)
  const [confirmationDialog, setConfirmationDialog] = React.useState(0)
  const [sensorDialog, setSensorDialog] = useState(false)
  const { t, i18n } = useTranslation()

  const { enqueueSnackbar } = useSnackbar()

  const deleteSensor = async (sensorId) => {
    await LAMP.Sensor.delete(sensorId)
    enqueueSnackbar(t("Successfully deleted the sensor."), {
      variant: "success",
    })
    // onChangeSensors()
  }

  const confirmAction = () => {
    switch (confirmationDialog) {
      case 1:
        setSensorDialog(true)
        break
      case 2:
        deleteSensor(selectedItem.id)
        break
    }
    setConfirmationDialog(0)
  }
  return (
    <Box>
      <IconButton
        onClick={() => {
          setSelectedItem(sensor)
          setConfirmationDialog(1)
        }}
        color="default"
        aria-label="Menu"
      >
        <Icon>edit</Icon>
      </IconButton>
      <IconButton
        onClick={() => {
          setSelectedItem(sensor)
          setConfirmationDialog(2)
        }}
        color="default"
        aria-label="Menu"
      >
        <Icon>close</Icon>
      </IconButton>

      <Dialog
        open={confirmationDialog > 0 ? true : false}
        onClose={() => setConfirmationDialog(0)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmationDialog === 1
              ? "Changes done to this sensor will reflect for all the participants under the study. Are you sure you want proceed?."
              : "This sensor will be deleted for all the participants under this study. Are you sure you want to proceed?."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(0)} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              confirmAction()
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <SensorDialog
        sensor={selectedItem}
        onClose={() => setSensorDialog(false)}
        studies={studies}
        open={sensorDialog}
      />
    </Box>
  )
}
