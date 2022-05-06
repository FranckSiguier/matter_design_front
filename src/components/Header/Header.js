import React from "react";

export const Header = () => {
  return (
    <header>
      <div className="p-5 text-center bg-image">
        <h1 className="mb-3">Matter Design Test</h1>
        <h4 className="mb-3">Franck SIGUIER</h4>
        <a className="btn btn-primary" href="#products" role="button">
          See the products
        </a>
      </div>
    </header>
  );
};
