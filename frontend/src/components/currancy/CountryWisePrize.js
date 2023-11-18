import React, { Component } from "react";

class ProductPriceByCountry extends Component {
  constructor(props) {
    super(props);

    // Define the price mapping with country codes and respective prices
    this.priceMapping = {
      IN: { currency: "₹", price: 500 }, // Default price in INR
      US: { currency: "$", price: 10 },
      UK: { currency: "£", price: 8 },
      CA: { currency: "$", price: 12 },
      AU: { currency: "$", price: 14 },
      // Add more countries and prices as needed
    };

    this.state = {
      userCountry: "IN", // Default user country is set to IN (India)
    };
  }

  componentDidMount() {
    // In a real-world scenario, fetch the user's country through geolocation and update the state.
    // For simplicity, we set the user's country as IN in this example.
  }

  render() {
    const { userCountry } = this.state;
    const priceInfo = this.priceMapping[userCountry];

    return (
      <div>
        <h1>Product Price:</h1>
        {priceInfo ? (
          <div>
            Price: {priceInfo.currency} {priceInfo.price}
          </div>
        ) : (
          <div>Country not found in price mapping.</div>
        )}
      </div>
    );
  }
}

export default ProductPriceByCountry;
