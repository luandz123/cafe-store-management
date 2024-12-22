import React from 'react';
import '../styles.css'; // Liên kết đến file CSS

const Menu = () => {
  const menuItems = [
    { id: 1, name: 'Bạc xỉu', price: 'IDR 25k' },
    { id: 2, name: 'Cafe đen đá', price: 'IDR 30k' },
    { id: 3, name: 'Espresso', price: 'IDR 15k' },
    { id: 4, name: 'Cassia', price: 'IDR 35k' },
    { id: 5, name: 'Cafe sữa', price: 'IDR 40k' },
    { id: 6, name: 'Sinh tố', price: 'IDR 40k' },
    { id: 7, name: 'Cafe đá xay pha kem', price: 'IDR 35k' },
    { id: 8, name: 'Trà sữa', price: 'IDR 40k' },
    { id: 9, name: 'Cafe chocolate', price: 'IDR 40k' },
    { id: 10, name: 'Soda bạc hà', price: 'IDR 40k' },
  ];

  return (
    <section id="menu" className="menu-section">
      <h2 className="menu-title">Menu <span>Kami</span>.</h2>
      <p className="menu-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nulla
        rerum dolore sit nisi voluptatem minima.
      </p>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div className="menu-item" key={item.id}>
            <div className={`menu-item-image image-${item.id}`}></div>
            <h3 className="menu-item-name">-{item.name}-</h3>
            <p className="menu-item-price">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
