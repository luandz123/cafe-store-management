import React from 'react';
import '../styles.css'; // Liên kết đến file CSS chính

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2 className="about-title">About <span>Us</span></h2>
      <div className="about-content">
        <div className="about-image"></div>
        <div className="about-text">
          <p>
            <strong>PTIT Coffee</strong> được tạo ra với sứ mệnh mang đến những hạt cà phê chất lượng nhất.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Consequatur magnam expedita saepe assumenda corrupti rem!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Porro quo distinctio dolor deserunt consectetur soluta
            possimus corporis dolorem officiis omnis?
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
