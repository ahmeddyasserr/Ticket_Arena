// import { toast } from 'react-toastify';
import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { useDispatch, useSelector } from 'react-redux';

// import { styled } from '@mui/material/styles';
// import { Box, Badge, Avatar } from '@mui/material';

// import { trainModel, editProfile, uploadAvatar, changePassword } from 'src/api/authSlice';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';

import './css/edit.css';

// ----------------------------------------------------------------------
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

export default function EditProfileView() {
  const user = {}
  // const dispatch = useDispatch();
  // const { t } = useTranslation();
  // const user = useSelector((state) => state.auth.data);
  const [selected, setSelected] = useState(1);
  //   const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    id: user?.user?.id,
    name: user?.user?.name || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
    address: user?.user?.address || '',
  });
  const [userPassword, setUserPassword] = useState({
    id: user?.user?.id,
    current_password: '',
    new_password: '',
    confirmed_Password: '',
  });

  const handleEditUser = (e) => {
    e.preventDefault();
    // toast.promise(dispatch(editProfile(userData)), {
    //   pending: `Profile is being updated ...`,
    //   success: `Profile is updated !`,
    //   error: `An Error Occured !`,
    // });
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
    // if (userPassword.new_password === userPassword.confirmed_Password) {
    //   toast.promise(dispatch(changePassword(userPassword)), {
    //     pending: `Password is being updated ...`,
    //     success: `Password is updated !`,
    //     error: `An Error Occured !`,
    //   });
    // }
  };

  const t = (item) => item;

  const handleChange = (e) => {
    const form = new FormData();
    form.append('image', e.target.files[0]);
    // toast.promise(dispatch(uploadAvatar({ id: user.user?.id, form })), {
    //   pending: `Avatar is being uploaded ...`,
    //   success: {
    //     render() {
    //       setTimeout(dispatch(trainModel()), 1000);
    //       return `Avatar is uploaded !`;
    //     },
    //   },
    //   error: `An Error Occured !`,
    // });
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
                      <h3>{t('editProfile')}</h3>
                      {
                        // <div className="photo">
                        //   <Badge
                        //     overlap="circular"
                        //     anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        //     badgeContent={
                        //       <Box
                        //         component="label"
                        //         sx={{
                        //           background: '#00CCFF',
                        //           color: '#fff',
                        //           width: '32px',
                        //           height: '32px',
                        //           display: 'flex',
                        //           justifyContent: 'center',
                        //           alignItems: 'center',
                        //           borderRadius: '100px',
                        //           '&:hover': {
                        //             background: '#35D7FF',
                        //             cursor: 'pointer',
                        //           },
                        //         }}
                        //       >
                        //         <VisuallyHiddenInput type="file" onChange={handleChange} />
                        //         <Iconify icon="bx:pencil" />
                        //       </Box>
                        //     }
                        //   >
                        //     <Avatar
                        //       alt={user.name}
                        //       /* eslint-disable no-unsafe-optional-chaining */
                        //       src={
                        //         user.user?.avatar_url ||
                        //         `/assets/images/avatars/avatar_${user?.user?.id % 25}.jpg`
                        //       }
                        //       /* eslint-enable no-unsafe-optional-chaining */
                        //       sx={{ width: 140, height: 140, border: '2px solid #87CEEB' }}
                        //     />
                        //   </Badge>
                        // </div>
                      }
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
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`${selected === 3 && 'active'} nav-link`}
                          onClick={() => setSelected(3)}
                        >
                          Password
                        </button>
                      </li>

                    </ul>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        {selected === 1 ? (
                          <form className="form" onSubmit={handleEditUser}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="fullName" className="w-100">
                                        {t('fullName')}
                                        <input
                                          id="fullName"
                                          className="form-control"
                                          type="text"
                                          value={userData.name}
                                          onChange={(e) =>
                                            setUserData({ ...userData, name: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="userName" className="w-100">
                                        {t('userType')}
                                        <input
                                          id="userName"
                                          className="form-control"
                                          type="text"
                                          name="username"
                                          placeholder="rana.g"
                                          value={user?.role?.toUpperCase()}
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="email" className="w-100">
                                        {t('email')}
                                        <input
                                          id="email"
                                          className="form-control"
                                          type="text"
                                          placeholder="user@example.com"
                                          value={userData.email}
                                          onChange={(e) =>
                                            setUserData({ ...userData, email: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="phoneNumber">
                                        {t('phone')}
                                        <input
                                          id="phoneNumber"
                                          className="form-control"
                                          type="text"
                                          placeholder="+20 111 379 9438"
                                          value={userData.phone}
                                          onChange={(e) =>
                                            setUserData({ ...userData, phone: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="address">
                                        {t('address')}
                                        <input
                                          id="address"
                                          className="form-control"
                                          type="text"
                                          placeholder="1368 Hayhurst Lane"
                                          value={userData.address}
                                          onChange={(e) =>
                                            setUserData({ ...userData, address: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">
                                  {t('save')}
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <div>
                            {selected === 3 ? (
                              <form className="form" onSubmit={handleEditPassword}>
                                <div className="row">
                                  <div className="col-12 col-sm-6 mb-3">
                                    <div className="mb-2">
                                      <b>{t('changePassword')}</b>
                                    </div>
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label className="w-100" htmlFor="curPass">
                                            {t('currentPassword')}
                                            <input
                                              id="curPass"
                                              className="form-control"
                                              type="password"
                                              placeholder="• • • • • • • • • • • • • • • • • • •"
                                              value={userPassword.current_password}
                                              onChange={(e) =>
                                                setUserPassword({
                                                  ...userPassword,
                                                  current_password: e.target.value,
                                                })
                                              }
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label className="w-100" htmlFor="newPass">
                                            {t('newPassword')}
                                            <input
                                              id="newPass"
                                              className="form-control"
                                              type="password"
                                              placeholder="• • • • • • • • • • • • • • • • • • •"
                                              value={userPassword.new_password}
                                              onChange={(e) =>
                                                setUserPassword({
                                                  ...userPassword,
                                                  new_password: e.target.value,
                                                })
                                              }
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col">
                                        <div className="form-group">
                                          <label className="w-100" htmlFor="conPass">
                                            {t('confirmPassword')}
                                            <input
                                              id="conPass"
                                              className="form-control"
                                              type="password"
                                              placeholder="• • • • • • • • • • • • • • • • • • •"
                                              value={userPassword.confirmed_Password}
                                              onChange={(e) =>
                                                setUserPassword({
                                                  ...userPassword,
                                                  confirmed_Password: e.target.value,
                                                })
                                              }
                                            />
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit">
                                      {t('save')}
                                    </button>
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <div className="form">
                                    <div className='bg-primary'>
                                      first match
                                    </div>
                                {/* <div className="row">
                                  <div className="col-12 col-sm-6 mb-3">
                                  </div>
                                </div> */}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3" style={{ width: '100px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
