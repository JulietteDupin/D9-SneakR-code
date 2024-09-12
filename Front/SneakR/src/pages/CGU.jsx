import React from 'react';
import Navbar from '../tools/Navbar';

const CGU = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <Navbar />
      <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>Terms and Conditions</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>1. Company Information</h2>
        <p style={{ margin: '0 0 10px' }}>
          <strong>SneakR SARL</strong><br />
          Head Office: 16 rue Théodore Blanc, 33520 Bruges<br />
          SIREN: 423 855 196 – NAF Code: 8559A<br />
          Email: <a href="mailto:juliette.dupin@epitech.digital" style={{ color: '#0066cc', textDecoration: 'none' }}>juliette.dupin@epitech.digital</a><br />
          Publication Director: Juliette Dupin, Aëlynn Michenet, Solène Lefeu<br />
          Website: <a href="http://localhost:5173/" style={{ color: '#0066cc', textDecoration: 'none' }}>http://localhost:5173/</a>
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>2. Purpose</h2>
        <p style={{ margin: '0 0 10px' }}>
          These Terms and Conditions (T&Cs) govern online sales of SneakR SARL’s products. They apply to all orders placed on the website <a href="http://localhost:5173/" style={{ color: '#0066cc', textDecoration: 'none' }}>http://localhost:5173/</a> (hereinafter referred to as “the Site”).
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>3. Products</h2>
        <p style={{ margin: '0 0 10px' }}>
          The products offered for sale are sneakers available on the Site. The essential characteristics of the products are described on the product pages. SneakR SARL reserves the right to modify its offers at any time.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>4. Prices</h2>
        <p style={{ margin: '0 0 10px' }}>
          Prices are listed in US dollars (USD) and include all applicable taxes. Shipping costs are the responsibility of the customer and will be added to the total amount of the order at checkout.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>5. Order</h2>
        <p style={{ margin: '0 0 10px' }}>
          An order is considered confirmed when the customer finalizes their cart and completes the payment. SneakR SARL reserves the right to cancel or refuse an order if there is doubt about the customer's solvency or in case of out-of-stock items.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>6. Payment</h2>
        <p style={{ margin: '0 0 10px' }}>
          Payment is made online by credit card or any other available payment method on the Site. Transactions are secured via SSL encryption protocol.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>7. Delivery</h2>
        <p style={{ margin: '0 0 10px' }}>
          Products are delivered to the address provided at the time of the order. Delivery times are specified on the Site and may vary depending on product availability and destination.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>8. Right of Withdrawal</h2>
        <p style={{ margin: '0 0 10px' }}>
          In accordance with applicable legislation, the customer has 14 days from the receipt of the products to exercise their right of withdrawal without providing a reason. Products must be returned in their original condition and complete packaging.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>9. Warranty and Returns</h2>
        <p style={{ margin: '0 0 10px' }}>
          Products come with the legal warranty of conformity and warranty against hidden defects. In case of defective or non-compliant products, the customer may request an exchange or refund.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>10. Liability</h2>
        <p style={{ margin: '0 0 10px' }}>
          SneakR SARL is not liable for indirect or unforeseen damages resulting from the use of the products purchased on the Site. SneakR SARL’s liability is limited to the amount of the order.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>11. Personal Data</h2>
        <p style={{ margin: '0 0 10px' }}>
          Information collected during the order process is necessary for managing the commercial relationship. In accordance with data protection laws, the customer has the right to access, rectify, and delete their data.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>12. Changes to T&Cs</h2>
        <p style={{ margin: '0 0 10px' }}>
          SneakR SARL reserves the right to modify these T&Cs at any time. Changes will apply to any order placed after the publication of the new terms on the Site.
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '5px', marginBottom: '10px', color: '#333' }}>13. Governing Law and Jurisdiction</h2>
        <p style={{ margin: '0 0 10px' }}>
          These T&Cs are governed by French law. In case of dispute, the courts of Bordeaux will have jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default CGU;
