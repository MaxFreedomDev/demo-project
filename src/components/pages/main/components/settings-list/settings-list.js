import React, { useEffect, useState } from "react";
import "./settings-list.scss";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../../../../use-table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TextField from "@material-ui/core/TextField/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@material-ui/icons";
import CustomButton from "../../../../controls/custom-button";
import { CREATE_PROPERTY_ROUTE } from "../../../../../utils/const";
import { handleSearch } from "../product-list/product-list";
import { withRouter } from "react-router-dom";
import { deleteProperty, getProperties } from "../../../../../actions/property";
import DeleteConfirm from "../../../../modal/delete-confirm";
import Loader from "../../../../loader/loader";

const headCells = [
  {
    id: "name",
    disablePadding: true,
    label: "Перечень проперти",
  },
  { id: "type", disablePadding: false, label: "Тип" },
  { id: "control", disablePadding: false, label: "Управление" },
];

const SettingsList = (props) => {
  const { mainPage } = props;
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.property.properties);
  const loading = useSelector((state) => state.property.loading);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    document.title = "Список свойств";
    dispatch(getProperties());
  }, [dispatch]);

  const deleteItem = () => {
    dispatch(deleteProperty(itemId));
    setOpen(!open);
  };
  const openDeleteDialog = (id) => {
    setOpen(!open);
    setItemId(id);
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(properties, headCells, filterFn);

  if (loading) {
    return (
      <div className="contentWrapper">
        <Loader height={"50vh"} />
      </div>
    );
  }

  return (
    <div className="contentWrapper">
      <div className="tableListHeaderActions">
        <TextField
          label={"Поиск"}
          onChange={(e) => handleSearch(e, setFilterFn)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <CustomButton
          onClick={() =>
            props.history.push({
              pathname: CREATE_PROPERTY_ROUTE,
              state: { page: mainPage },
            })
          }
          label={"Добавить проперти"}
        />
      </div>
      <TblContainer>
        <TblHead />
        <TableBody>
          {recordsAfterPagingAndSorting().map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell style={{ textTransform: "capitalize" }}>
                {row.type}{" "}
              </TableCell>
              <TableCell>
                <span
                  onClick={() => openDeleteDialog(row.id)}
                  className="deleteBtn"
                >
                  Удалить
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TblContainer>
      <TblPagination />
      <DeleteConfirm
        label={"проперти"}
        onClose={setOpen}
        open={open}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default withRouter(SettingsList);
