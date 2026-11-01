import React from 'react';
import ReactDOM from 'react-dom';

const { createClient } = window.supabase;

const { useState, useEffect } = React;

const supabase = createClient(
  window.SUPABASE_URL,
  window.SUPABASE_KEY
);

const WHATSAPP_NUMBER = '2348108546206';

const BANK_DETAILS = {
  bankName: 'Opay',
  accountName: 'Akinnubi Fatihat Titilayo',
  accountNumber: '8128404991'
};

const MENU = [
  {
    id: 1,
    name: 'Jollof Rice with Chicken',
    category: 'Rice & Combos',
    description: 'Delicious Nigerian jollof rice served with chicken.',
    price: 4000,
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1638436684761-7e59f8a9072f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Fried Rice with Chicken',
    category: 'Rice & Combos',
    description: 'Tasty fried rice served with chicken.',
    price: 4500,
    emoji: '🍚',
    image: 'https://images.unsplash.com/photo-1772729440931-e8efd3adc748?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Stir-fry Pasta with Chicken',
    category: 'Rice & Combos',
    description: 'Stir-fried pasta served with chicken.',
    price: 3500,
    emoji: '🍝',
    image: 'https://images.unsplash.com/photo-1693609929783-f6a1cfd35b41?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Stir-fry Noodles with Egg',
    category: 'Noodles',
    description: 'Stir-fried noodles served with egg.',
    price: 2000,
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1698380998250-1620ddbe7279?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Stir-fry Noodles with Chicken',
    category: 'Noodles',
    description: 'Stir-fried noodles served with chicken.',
    price: 3000,
    emoji: '🍜',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Amala with Assorted',
    category: 'Swallow & Soup',
    description: 'Amala served with assorted meat.',
    price: 4000,
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Pepper Soup',
    category: 'Swallow & Soup',
    description: 'A delicious serving of pepper soup.',
    price: 5000,
    emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Pepper Soup with White Rice',
    category: 'Swallow & Soup',
    description: 'Pepper soup served with white rice.',
    price: 6000,
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    name: 'Plantain',
    category: 'Extras',
    description: 'Sweet, golden fried plantain.',
    price: 500,
    emoji: '🍌',
    image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    name: 'Meat',
    category: 'Extras',
    description: 'An extra serving of meat.',
    price: 500,
    emoji: '🍖',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 11,
    name: 'Chicken',
    category: 'Extras',
    description: 'An extra serving of chicken.',
    price: 1200,
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 12,
    name: 'Turkey',
    category: 'Extras',
    description: 'An extra serving of turkey.',
    price: 3000,
    emoji: '🍗',
    image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?auto=format&fit=crop&w=800&q=80'
  }
];



function formatPrice(amount) {
  return '₦' + amount.toLocaleString('en-NG');
}

function App() {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState(MENU);
  const [category, setCategory] = useState('All');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [receiptMessage, setReceiptMessage] = useState('');
  const [error, setError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

const categories = [
  'All',
  ...new Set(menuItems.map(item => item.category))
];

const filteredMenu = category === 'All' ?
  menuItems :
  menuItems.filter(item => item.category === category);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart(previousCart => {
      const existing = previousCart.find(
        item => item.id === product.id
      );

      if (existing) {
        return previousCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setError('');
    setOrderPlaced(false);
  }
  
  


  function changeQuantity(id, change) {
    setCart(previousCart =>
      previousCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    );

    setOrderPlaced(false);
  }

  function updateCustomer(event) {
    const { name, value } = event.target;

    setCustomer(previous => ({
      ...previous,
      [name]: value
    }));
  }

  function placeOrder(event) {
    event.preventDefault();
    setError('');
    setOrderPlaced(false);

    if (cart.length === 0) {
      setError('Please add at least one meal to your cart.');
      return;
    }

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim()
    ) {
      setError('Please complete your name, phone number and delivery address.');
      return;
    }

    if (!WHATSAPP_NUMBER.trim()) {
      setError(
        'The kitchen WhatsApp number has not been configured yet.'
      );
      return;
    }

    const orderNumber = 'FLK-' + Date.now().toString().slice(-6);

    const orderLines = cart.map(item =>
      `${item.name} x ${item.quantity} = ${formatPrice(
        item.price * item.quantity
      )}`
    );

    const message = [
      'FATILUX KITCHEN — NEW ORDER',
      '',
      `Order reference: ${orderNumber}`,
      `Customer: ${customer.name}`,
      `Phone: ${customer.phone}`,
      `Delivery address: ${customer.address}`,
      '',
      'ORDER DETAILS',
      ...orderLines,
      '',
      `TOTAL: ${formatPrice(subtotal)}`,
      `Payment method: ${
        paymentMethod === 'transfer'
          ? 'Bank transfer'
          : 'Confirm payment method with kitchen'
      }`,
      '',
      paymentMethod === 'transfer'
        ? `Bank: ${BANK_DETAILS.bankName}\nAccount name: ${BANK_DETAILS.accountName}\nAccount number: ${BANK_DETAILS.accountNumber}`
        : '',
      '',
      `Receipt/proof message: ${
        receiptMessage.trim() || 'Customer will confirm payment with the kitchen.'
      }`,
      `Additional notes: ${customer.notes.trim() || 'None'}`,
      '',
      'Customer acknowledges the stated non-refundable payment policy.'
    ].filter(Boolean).join('\n');

    const whatsappURL =
      'https://wa.me/' +
      WHATSAPP_NUMBER.replace(/\D/g, '') +
      '?text=' +
      encodeURIComponent(message);

    window.open(whatsappURL, '_blank');

    setOrderPlaced(true);
  }
  
  async function loadCustomerMenu() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('id', { ascending: true });
  
  if (error) {
    console.error('Could not load customer menu:', error.message);
    return;
  }
  
  if (data) {
  setMenuItems(
      data.map(function(item) {
        return {
          id: item.id,
          name: item.name,
          category: item.category || 'Other',
          description: item.description || '',
          price: Number(item.price),
          emoji: item.emoji || '🍽️',
          image: item.image || ''
        };
      })
    );
  }
}

useEffect(function() {
  loadCustomerMenu();
}, []);

  return (
    <div className="app">
      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-mark">F</span>
          <span>
            <strong>FATILUX</strong>
            <small>KITCHEN</small>
          </span>
        </a>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#menu">Our Menu</a>
          <a href="#checkout">Order</a>
        </nav>

        <a className="cart-link" href="#checkout">
          Your Cart <span>{totalItems}</span>
        </a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              FRESHLY PREPARED · MADE WITH LOVE
            </span>

            <h1>
              Good food.
              <br />
              <span>Beautiful moments.</span>
            </h1>

            <p>
              Enjoy delicious homemade meals prepared with care.
              Choose your favourites and place your order with ease.
            </p>

            <a href="#menu" className="primary-button">
              Explore Our Menu <span>→</span>
            </a>

            <div className="hero-details">
              <span>✦ Freshly prepared meals</span>
              <span>✦ Convenient ordering</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-circle">
              <span>F</span>
            </div>
            <div className="hero-caption">
              <span>THE FATILUX EXPERIENCE</span>
              <strong>Made to satisfy.</strong>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div>
            <span className="benefit-icon">✦</span>
            <div>
              <strong>Quality Ingredients</strong>
              <p>Food prepared with care.</p>
            </div>
          </div>

          <div>
            <span className="benefit-icon">♡</span>
            <div>
              <strong>Made with Love</strong>
              <p>Homemade goodness in every bite.</p>
            </div>
          </div>

          <div>
            <span className="benefit-icon">↗</span>
            <div>
              <strong>Easy Ordering</strong>
              <p>Send your order through WhatsApp.</p>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <span className="eyebrow">DISCOVER YOUR FAVOURITES</span>
              <h2>Our Menu</h2>
              <p>Find something delicious for your next meal.</p>
            </div>

            <a href="#checkout" className="text-link">
              View your order →
            </a>
          </div>

          <div className="categories">
            {categories.map(item => (
              <button
                key={item}
                className={category === item ? 'category active' : 'category'}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="food-grid">
            {filteredMenu.map(item => (
              <article className="food-card" key={item.id}>
                <div className="food-image">
                <span className="food-emoji">
                 <img
                 src={item.image}
                 alt={item.name}
                 className="food-image"
                onError={(e) => {
                 e.currentTarget.style.display = 'none';
                      }}
                    />
                </span>
                   

                  <span className="food-category">{item.category}</span>
                </div>

                <div className="food-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  <div className="food-bottom">
                    <strong>{formatPrice(item.price)}</strong>

                    <button
                      className="add-button"
                      onClick={() => addToCart(item)}
                      aria-label={`Add ${item.name} to cart`}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="menu-note">
            Menu items and prices shown are examples. Replace them with
            Fatilux Kitchen's actual menu before publishing.
          </p>
        </section>

        <section className="checkout-section" id="checkout">
          <div className="section-heading">
            <div>
              <span className="eyebrow">YOUR MEAL, YOUR WAY</span>
              <h2>Complete Your Order</h2>
              <p>Review your cart and enter your delivery details.</p>
            </div>
          </div>

          <div className="checkout-grid">
            <div className="checkout-panel">
              <h3>Your Cart ({totalItems})</h3>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <span>🛍️</span>
                  <strong>Your cart is waiting.</strong>
                  <p>Add your favourite meals from our menu.</p>
                  <a href="#menu" className="text-link">
                    Browse menu →
                  </a>
                </div>
              ) : (
                <div className="cart-items">
                  {cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-icon">{item.emoji}</div>

                      <div className="cart-item-info">
                        <strong>{item.name}</strong>
                        <span>{formatPrice(item.price)} each</span>

                        <div className="quantity-controls">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <strong className="line-total">
                        {formatPrice(item.price * item.quantity)}
                      </strong>
                    </div>
                  ))}
                </div>
              )}

              <div className="total-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <p className="delivery-note">
                Delivery charges, if applicable, will be confirmed by
                the kitchen before your order is finalized.
              </p>
            </div>

            <form className="checkout-panel" onSubmit={placeOrder}>
              <h3>Delivery Details</h3>

              <label htmlFor="customer-name">Full Name</label>
              <input
                id="customer-name"
                name="name"
                value={customer.name}
                onChange={updateCustomer}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

              <label htmlFor="customer-phone">Phone Number</label>
              <input
                id="customer-phone"
                name="phone"
                type="tel"
                value={customer.phone}
                onChange={updateCustomer}
                placeholder="Enter your phone number"
                autoComplete="tel"
                required
              />

              <label htmlFor="customer-address">Delivery Address</label>
              <textarea
                id="customer-address"
                name="address"
                value={customer.address}
                onChange={updateCustomer}
                placeholder="Enter your full delivery address"
                autoComplete="street-address"
                required
              />

              <label htmlFor="customer-notes">
                Additional Instructions (Optional)
              </label>
              <textarea
                id="customer-notes"
                name="notes"
                value={customer.notes}
                onChange={updateCustomer}
                placeholder="Landmarks or special instructions"
              />

              <div className="payment-heading">
                <h3>Payment Method</h3>
              </div>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                />
                <span>
                  <strong>Bank Transfer</strong>
                  <small>Pay using the kitchen's bank details.</small>
                </span>
              </label>

              <div className="bank-details">
                <p>
                  <span>Bank</span>
                  <strong>{BANK_DETAILS.bankName}</strong>
                </p>
                <p>
                  <span>Account Name</span>
                  <strong>{BANK_DETAILS.accountName}</strong>
                </p>
                <p>
                  <span>Account Number</span>
                  <strong>{BANK_DETAILS.accountNumber}</strong>
                </p>
              </div>

              <label htmlFor="receipt-message">
                Payment Receipt / Proof
              </label>
              <textarea
                id="receipt-message"
                value={receiptMessage}
                onChange={event => setReceiptMessage(event.target.value)}
                placeholder="Enter your payment reference or state that you will send proof on WhatsApp."
              />

              <div className="refund-notice">
                <strong>Important Payment Notice</strong>
                <p>
                  Please confirm your order details and payment amount
                  before transferring money. Payments are non-refundable
                  once an order has been accepted and preparation has
                  started, subject to applicable consumer protection law.
                  Contact the kitchen if there is an issue with your order.
                </p>
              </div>

              {error && (
                <div className="form-message error" role="alert">
                  {error}
                </div>
              )}

              {orderPlaced && (
                <div className="form-message success" role="status">
                  WhatsApp should have opened with your order details.
                  Send the message to submit your order.
                </div>
              )}

              <button type="submit" className="submit-button">
                Send Order on WhatsApp <span>↗</span>
              </button>

              <p className="secure-note">
                Your order will be sent to the kitchen through WhatsApp.
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">F</span>
          <span>
            <strong>FATILUX</strong>
            <small>KITCHEN</small>
          </span>
        </a>

        <p>Good food, thoughtfully prepared.</p>

        <span className="footer-copy">
          © {new Date().getFullYear()} Fatilux Kitchen
        </span>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);