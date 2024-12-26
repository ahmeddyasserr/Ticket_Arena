import React, { useState, useEffect } from 'react';
import './css/edit.css';

export default function EditProfileView() {
  const [selected, setSelected] = useState(1);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    league: '',
    favourite_team: '',
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUserInfo();
    fetchOrders();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;
      const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData({
          username: data.username,
          email: data.email,
          league: data.league,
          favourite_team: data.favorite_team, 
        });
      } else {
        console.error('Failed to fetch user info:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;
      const response = await fetch('http://127.0.0.1:8000/api/user/orders/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Orders:', data); // Debugging log
        setOrders(data);
      } else {
        console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;
      const response = await fetch('http://127.0.0.1:8000/api/user/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Profile updated successfully');
        fetchUserInfo();
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-secondary text-white';
      case 'denied':
        return 'bg-danger text-white';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '100px' }} />

        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <h3>Profile</h3>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`${selected === 1 && 'active'} nav-link`}
                          onClick={() => setSelected(1)}
                        >
                          Settings
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`${selected === 2 && 'active'} nav-link`}
                          onClick={() => setSelected(2)}
                        >
                          Orders
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-3">
                      {selected === 1 && (
                        <form className="form" onSubmit={handleEditUser}>
                          <div className="form-group">
                            <label>Username</label>
                            <input
                              type="text"
                              className="form-control"
                              value={userData.username}
                              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="email"
                              className="form-control"
                              value={userData.email}
                              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>Favourite Team</label>
                            <input
                              type="text"
                              className="form-control"
                              value={userData.favourite_team}
                              onChange={(e) => setUserData({ ...userData, favourite_team: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>League</label>
                            <input
                              type="text"
                              className="form-control"
                              value={userData.league}
                              onChange={(e) => setUserData({ ...userData, league: e.target.value })}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary mt-3">Save</button>
                        </form>
                      )}
                      {selected === 2 && (
                        <div>
                          <h4>Order History</h4>
                          {orders.length > 0 ? (
                            orders.map((order) => (
                              <div key={order.confirmation_number} className="card mb-3">
                                <div className={`card-header ${getStatusClass(order.status)}`}>
                                  Status: {order.status}
                                </div>
                                <div className="card-body">
                                  <h5>Order #{order.confirmation_number}</h5>
                                  <table className="table">
                                    <thead>
                                      <tr>
                                        <th></th>
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items?.map((item, index) => (
                                        <tr key={index}>
                                          <td>
                                            {item.category === 'VIP' ? (
                                              <img
                                                src={item.team1_logo}
                                                alt="Team 1"
                                                style={{ width: '25px', height: '25px', marginRight: '10px' }}
                                              />
                                            ) : (
                                              <img
                                                src={item.image}
                                                alt={item.item_name}
                                                style={{ width: '50px', height: '50px' }}
                                              />
                                            )}
                                            {item.category === 'VIP' && (
                                              <img
                                                src={item.team2_logo}
                                                alt="Team 2"
                                                style={{ width: '25px', height: '25px', marginLeft: '10px' }}
                                              />
                                            )}
                                          </td>
                                          <td>{item.item_name || 'Unknown'}</td>
                                          <td>{item.category || 'Unknown'}</td>
                                          <td>{item.quantity || 0}</td>
                                          <td>${item.price?.toFixed(2) || '0.00'}</td>
                                          <td>${item.total?.toFixed(2) || '0.00'}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                  <h6>Total Price: ${order.total_price?.toFixed(2)}</h6>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No orders found</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}