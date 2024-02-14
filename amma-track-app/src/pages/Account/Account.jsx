import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  updatePassword,
  switchAccount,
  deleteAccount,
  updateUsername,
  updateUserImage,
  logOut
} from "../../redux/slices/authenticationSlice";
import "./Account.css";
import cameraIcon from "../../images/camera-icon.svg";
import { validatePassword } from "../../validations/validate";
import { clearUserWorkspaces } from "../../redux/slices/workspacesSlice";

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.loggedUser);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});
  const [newUsername, setNewUsername] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const errors = validatePassword(newPassword);
    setPasswordErrors(errors);

    if (Object.keys(errors).length === 0 && newPassword === confirmPassword) {
      dispatch(updatePassword({ userId: user.id, newPassword }));
      setNewPassword("");
      setConfirmPassword("");
      setFeedbackMessage("Password successfully changed.");
      setShowChangePasswordModal(false);
    } else if (newPassword !== confirmPassword) {
      setPasswordErrors({
        ...errors,
        confirmPassword: "Passwords do not match."
      });
    }
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    if (newUsername.trim() === "") {
      setFeedbackMessage("Username cannot be empty.");
      return;
    }
    const updatedUser = { ...user, userName: newUsername };
    dispatch(updateUsername({ userId: user.id, newUsername }));
    window.localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    setShowChangeUsernameModal(false);
    setFeedbackMessage("Username successfully changed.");
  };

  const handleSwitchAccount = () => {
    dispatch(switchAccount());
    dispatch(logOut());
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    dispatch(clearUserWorkspaces({ userId: user.id }));

    dispatch(deleteAccount({ userId: user.id }));
    dispatch(logOut());
    setShowDeleteModal(false);
    navigate("/");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Dispatch the action to update the image URL in the Redux state
        dispatch(updateUserImage({ userId: user.id, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="account-section">
      {showChangePasswordModal && (
        <div className="change-modal">
          <div className="change-modal-content">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
              {Object.keys(passwordErrors).length > 0 && (
                <div className="password-validation-errors">
                  {Object.values(passwordErrors).map((error, index) => (
                    <p key={index} className="error-message">
                      {error}
                    </p>
                  ))}
                </div>
              )}
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Change Password</button>
              <button onClick={() => setShowChangePasswordModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showChangeUsernameModal && (
        <div className="change-modal">
          <div className="change-modal-content">
            <h2>Change Username</h2>
            <form onSubmit={handleUsernameChange}>
              <input
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button type="submit">Change Username</button>
              <button onClick={() => setShowChangeUsernameModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Confirm Account Deletion</h2>
            <p>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <button onClick={handleDeleteConfirmation}>Yes, Delete</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="account-container">
        <div className="account-avatar">
          <img src={user.image || "/default-avatar.png"} alt="Profile" />
          <div className="account-avatar-overlay">
            <img
              src={cameraIcon}
              alt="Update"
              className="account-avatar-icon"
            />
            <input type="file" id="imageUpload" onChange={handleImageUpload} />
            <label htmlFor="imageUpload" className="account-avatar-upload">
              Update Photo
            </label>
          </div>
        </div>
        <div className="account-details">
          <h2>{user.userName}</h2>
          <p>{user.email}</p>
          <button onClick={() => setShowChangePasswordModal(true)}>
            Change Password
          </button>
          <button onClick={() => setShowChangeUsernameModal(true)}>
            Change Username
          </button>
          {feedbackMessage && (
            <p className="feedback-message">{feedbackMessage}</p>
          )}
          <button onClick={handleSwitchAccount}>Switch Account</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
}
