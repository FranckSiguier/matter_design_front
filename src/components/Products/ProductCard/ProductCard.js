import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { BulkPricing } from "./BulkPricing";

export const ProductCard = ({ productId, name, description, price }) => {
  const [imageURL, setimageURL] = useState("");

  async function getImage() {
    const response = await axios({
      method: "get",
      url: `http://localhost:4000/products/${productId}/images`,
    });
    setimageURL(response.data[0].url_zoom);
  }

  useEffect(() => {
    getImage();
  }, []);

  return (
    <>
      <MDBCard style={{ maxWidth: "22rem" }}>
        <MDBCardImage src={imageURL} position="top" alt="product-image" />
        <MDBCardBody>
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBCardText>{description}</MDBCardText>
        </MDBCardBody>

        <BulkPricing price={price} productId={productId} />
      </MDBCard>
    </>
  );
};
