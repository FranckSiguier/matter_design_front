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

export const ProductCard = ({ productId, name, description, price }) => {
  const [imageURL, setimageURL] = useState("");

  useEffect(() => {
    async function getImage() {
      const response = await axios({
        method: "get",
        url: `http://localhost:4000/products/${productId}/images`,
      });
      setimageURL(response.data[0].url_zoom);
    }
    getImage();
  }, []);

  return (
    <>
      <MDBCard style={{ maxWidth: "22rem" }}>
        <MDBCardImage src={imageURL} position="top" alt="..." />
        <MDBCardBody>
          <MDBCardTitle>{name}</MDBCardTitle>
          <MDBCardText>{description}</MDBCardText>
          <div className="d-flex justify-content-between">
            <MDBBtn href="#">Add to Cart</MDBBtn>
            <p>{price} $</p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};
