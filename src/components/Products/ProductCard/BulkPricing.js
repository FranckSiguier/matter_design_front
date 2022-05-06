import axios from "axios";
import { MDBBtn, MDBInputGroup } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";

export const BulkPricing = ({ price, productId }) => {
  const [bulkPricingRules, setbulkPricingRules] = useState([]);
  const [bulkPricingRule, setbulkPricingRule] = useState({
    quantity_min: "",
    quantity_max: "",
    amount: "",
    type: "percent",
  });

  useEffect(() => {
    getBulkPricing();
  }, []);

  async function getBulkPricing() {
    const response = await axios({
      method: "get",
      url: `http://localhost:4000/products/${productId}/bulk-pricing-rules`,
    });
    setbulkPricingRules(response.data.data);
  }

  const addBulkPricingRule = async () => {
    const response = await axios({
      method: "post",
      url: `http://localhost:4000/products/${productId}/bulk-pricing-rules`,
      data: bulkPricingRule,
    });

    getBulkPricing();
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);

    setbulkPricingRule({
      ...bulkPricingRule,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <p className="p-3">
        Price: <strong>{price}</strong> $
      </p>
      <MDBInputGroup className="mb-3" noBorder textBefore="Quantity Min">
        <input
          onChange={handleInputChange}
          name="quantity_min"
          className="form-control"
          type="number"
          value={bulkPricingRule.quantity_min}
          placeholder="2"
        />
      </MDBInputGroup>

      <MDBInputGroup className="mb-3" noBorder textBefore="Quantity Max">
        <input
          onChange={handleInputChange}
          name="quantity_max"
          className="form-control"
          type="number"
          value={bulkPricingRule.quantity_max}
          placeholder="10"
        />
      </MDBInputGroup>

      <MDBInputGroup className="mb-3" noBorder textBefore="Amount (in %)">
        <input
          onChange={handleInputChange}
          name="amount"
          className="form-control rounded"
          type="text"
          value={bulkPricingRule.amount}
          placeholder="10"
        />
      </MDBInputGroup>

      <MDBBtn className="mb-auto" onClick={addBulkPricingRule}>
        Add a bulk pricing rule
      </MDBBtn>

      {bulkPricingRules.length >= 1 && (
        <p className="pt-4">Bulk Pricing rules already available : </p>
      )}
      {bulkPricingRules.length >= 1 &&
        bulkPricingRules.map((rule, index) => {
          return (
            <div className="pt-3" key={index}>
              <p>
                Quantity min : <strong>{rule.quantity_min}</strong>
              </p>
              <p>
                Quantity min : <strong>{rule.quantity_max}</strong>
              </p>
              <p>
                Amount : <strong>{rule.amount} %</strong>
              </p>
              <p>
                New Price{" "}
                <strong>{(price * (100 - rule.amount)) / 100} $</strong>
              </p>
            </div>
          );
        })}
    </>
  );
};
