import React, { useEffect } from "react";
import "./main.scss";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import ProductList from "./components/product-list/product-list";
import SettingsList from "./components/settings-list/settings-list";
import { withRouter } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={1}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "inherit",
    boxShadow: "none",
  },
  tabs: {
    color: "black",
  },
  indicator: {
    backgroundColor: "#0258FF",
    height: "2px",
    top: 0,
  },
  tab: {
    color: "black",
    fontSize: "22px",
    fontWeight: 300,
    textTransform: "inherit",
    width: 255,
    [theme.breakpoints.down("xs")]: {
      width: 160,
      fontSize: "15px",
    },
  },
  selected: {
    color: "#0258FF",
    backgroundImage:
      "linear-gradient(180deg, rgba(2,88,255,0.10407913165266103) 0%, rgba(2,88,255,0) 100%)",
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const page = props.location.state?.page;

  useEffect(() => {
    if (page) {
      return setValue(page);
    }
  }, [page]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          classes={{ root: classes.tabs, indicator: classes.indicator }}
        >
          <Tab
            label="Листинг товаров"
            {...a11yProps(0)}
            className={classes.tab}
            classes={{
              selected: classes.selected,
            }}
          />
          <Tab
            label="Листинг проперти"
            {...a11yProps(1)}
            className={classes.tab}
            classes={{
              selected: classes.selected,
            }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProductList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SettingsList mainPage={value} />
      </TabPanel>
    </div>
  );
};

export default withRouter(Main);
