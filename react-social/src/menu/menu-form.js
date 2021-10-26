import * as React from 'react';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import {API_BASE_URL} from "../constants";
import Alert from "react-s-alert";
import DateFnsUtils from '@date-io/date-fns';

class MenuForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false, dishName: "", orderQuantity: 0, date: new Date(), orderID: "", restaurantID: "", dishID: ""}

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoughtDateChange = this.handleBoughtDateChange.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  };

  handleOpen() {
    this.setState({open: true});
  };

  handleChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName] : inputValue
    });
  };

  handleBoughtDateChange(date) {
    this.setState({dateBought : date});
  }

  generateRandomOrderID(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var chaactersLength = characters.length;

    for ( var i = 0; i < 3 ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    this.setState({orderID : result.toString()});
  }
  generateRandomRestaurantID(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var chaactersLength = characters.length;

    for ( var i = 0; i < 3 ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    this.setState({restaurantID : result.toString()});
  }
  generateRandomDishID(){
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var result = ""
    var chaactersLength = characters.length;

    for ( var i = 0; i < 3 ; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * chaactersLength));
    }
    this.setState({dishID : result.toString()});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.generateRandomOrderID();
    this.generateRandomRestaurantID();
    this.generateRandomDishID();

    fetch(API_BASE_URL + '/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId : this.state.orderID,
        dishId : this.state.dishID,
        restaurantId : this.state.restaurantID,
        orderQuantity : this.state.orderQuantity,
        dishName : this.state.dishName,
        date : this.state.date
      })
    })
      .then(response => {
        this.setState({open: false});
      }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    });
  }

  render() {

    return (
      <div>
        <Button variant="outlined" onClick={this.handleOpen}>
          Add New Menu Item
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}
                aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Menu</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="dishName"
              value={this.state.dishName}
              onChange={this.handleChange}
              name="dishName"
              label="Dish Name"
              fullWidth
            />
            <TextField
              margin="dense"
              id="batchQty"
              value={this.state.orderQuantity}
              onChange={this.handleChange}
              name="orderQuantity"
              label="Quantity"
              type="number"
              fullWidth
            />
            <br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Date Orderered"
                value={this.state.date}
                onChange={this.handleBoughtDateChange}
                name={"dateordered"}
              />
            </MuiPickersUtilsProvider>
            <br/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default MenuForm;
