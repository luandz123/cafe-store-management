import React from 'react';
import '../styles.css'; // Liên kết đến file CSS
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa'; // Sử dụng icon

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">
        <span>PTIT</span> Coffee.
      </h2>
      <div className="contact-content">
        {/* Bản đồ */}
        <div className="contact-map"></div>

        {/* Biểu mẫu liên hệ */}
        <form className="contact-form">
          <div className="form-group">
            <i><FaUser /></i>
            <input type="text" value="luannguyen" readOnly />
          </div>
          <div className="form-group">
            <i><FaEnvelope /></i>
            <input type="email" value="coffee12@gmail.com" readOnly />
          </div>
          <div className="form-group">
            <i><FaPhone /></i>
            <input type="tel" value="0989269926" readOnly />
          </div>
          <div className="form-group rating">
            <span>Đánh giá:</span>
            <div className="stars">
              ★ ★ ★ ★ ★
            </div>
          </div>
          <div className="form-group">
            <button type="button" className="btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
