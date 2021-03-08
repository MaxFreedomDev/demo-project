import React, { useEffect, useState } from "react";
import "./product-list.scss";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../../../../actions/products";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableBody from "@material-ui/core/TableBody";
import { Link, withRouter } from "react-router-dom";
import { CREATE_PRODUCT_ROUTE } from "../../../../../utils/const";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Search } from "@material-ui/icons";
import useTable from "../../../../use-table";
import CustomButton from "../../../../controls/custom-button";
import DeleteConfirm from "../../../../modal/delete-confirm";
import Loader from "../../../../loader/loader";

const headCells = [
  {
    id: "name",
    disablePadding: true,
    label: "Перечень товаров",
  },
  { id: "price", disablePadding: false, label: "Стоимость" },
  { id: "date", disablePadding: false, label: "Дата изменения" },
  { id: "control", disablePadding: false, label: "Управление" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export const handleSearch = (e, func) => {
  let target = e.target;
  func({
    fn: (items) => {
      if (target.value === "") return items;
      else
        return items.filter((x) => x.name.toLowerCase().includes(target.value));
    },
  });
};

const ProductList = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.products.items);
  const loading = useSelector((state) => state.products.loading);
  const [open, setOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(items, headCells, filterFn);

  useEffect(() => {
    document.title = "Список товаров";
    dispatch(getProducts());
  }, [dispatch]);

  const openDeleteDialog = (id) => {
    setOpen(!open);
    setItemId(id);
  };
  const deleteItem = () => {
    dispatch(deleteProduct(itemId));
    setOpen(!open);
  };

  if (loading) {
    return (
      <div className="contentWrapper">
        <Loader height="50vh" />
      </div>
    );
  }

  return (
    <div className="contentWrapper">
      <div className={classes.root}>
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
            onClick={() => props.history.push(CREATE_PRODUCT_ROUTE)}
            label={"Добавить товар"}
          />
        </div>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Link to={`/product/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell>{row.price} $</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <div className="itemListActions">
                    <Link
                      to={{
                        pathname: CREATE_PRODUCT_ROUTE,
                        state: row,
                      }}
                    >
                      Ред.
                    </Link>
                    <span onClick={() => openDeleteDialog(row.id)}>
                      Удалить
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </div>
      <DeleteConfirm
        label={"товар"}
        onClose={setOpen}
        open={open}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default withRouter(ProductList);
