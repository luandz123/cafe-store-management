import React from 'react';
import '../styles.css'; // Import CSS nếu cần

const Home = () => {
  return (
    <section id="home" className="section">
      <div className="home-content">
        <h1 className="home-title">Chào mừng quý khách đã ghé thăm.</h1>
        <p className="home-description">
          Chúng tôi đi khắp thế giới để tìm kiếm cà phê tuyệt vời. Trong quá trình đó,
          chúng tôi phát hiện ra những hạt điều đặc biệt và niềm đam mê tạo nên một trải nghiệm đặc biệt mang chúng về.
        </p>
      </div>
    </section>
  );
};

export default Home;
