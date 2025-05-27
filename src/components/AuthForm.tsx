import React, { useState } from 'react';

const AuthForm: React.FC = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const [fullName, setFullName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signInPhone, setSignInPhone] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [forgotPasswordPhone, setForgotPasswordPhone] = useState('');

  const handleTogglePanel = () => setIsSignUpActive(!isSignUpActive);

  const handleSubmitSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign In:', { signInPhone, signInPassword });
  };

  const handleSubmitSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign Up:', { fullName, signUpPhone, signUpPassword });
  };

  const handleSubmitForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Forgot Password for:', forgotPasswordPhone);
    setShowForgotPasswordModal(false);
    setForgotPasswordPhone('');
  };

  const css = `
    .auth-form-component-container {
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05);
      position: relative;
      overflow: hidden;
      width: 100%;
      max-width: 850px;
      min-height: 550px;
      font-family: 'Inter', sans-serif;
      display: flex;
    }

    .form-area-section {
      flex: 1.5;
      padding: 40px 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      position: relative;
      z-index: 2;
    }

    .form-area-section form {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: left;
    }

    .form-area-section h1 {
      font-weight: bold;
      margin: 0 0 25px 0;
      color: #000000;
      font-size: 28px;
    }

    .form-area-section input {
      background-color: #F3F3F3;
      border: 1px solid #E0E0E0;
      padding: 12px 15px;
      margin: 10px 0;
      width: 100%;
      border-radius: 8px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-area-section input:focus {
      outline: none;
      border-color: #5D3A9B;
      box-shadow: 0 0 0 2px rgba(93, 58, 155, 0.2);
    }

    .form-area-section .forgot-password-link-container {
      text-align: right;
      margin: 10px 0 20px 0;
    }

    .form-area-section a.forgot-password-link {
      color: #777;
      font-size: 13px;
      text-decoration: none;
    }

    .form-area-section a.forgot-password-link:hover {
      color: #5D3A9B;
    }

    .form-area-section button[type="submit"] {
      border-radius: 8px;
      border: none;
      background-color: #4A2F7C;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: bold;
      padding: 14px 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: background-color 0.2s;
      cursor: pointer;
      width: 100%;
      margin-top: 10px;
    }

    .form-area-section button[type="submit"]:hover {
      background-color: #5D3A9B;
    }

    .form-area-section span.form-switch-info.mobile-only {
      font-size: 13px;
      color: #555;
      margin-top: 20px;
      text-align: center;
    }

    .form-area-section span.form-switch-info.mobile-only a {
      color: #4A2F7C;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
    }

    .welcome-panel-section {
  flex: 1;
  background: linear-gradient(to right, #4A2F7C, #6A4CA5);
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
  clip-path: path("M0,0 Q50,50 0,100 L100%,100 L100%,0 Z");
}




    .welcome-panel-section h1 {
      font-weight: bold;
      margin: 0 0 15px 0;
      color: #FFFFFF;
      font-size: 26px;
    }

    .welcome-panel-section p {
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
      color: #E0E0E0;
    }

    .welcome-panel-section button {
      border-radius: 8px;
      border: 2px solid #FFFFFF;
      background-color: transparent;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: background-color 0.2s, color 0.2s;
      cursor: pointer;
    }

    .welcome-panel-section button:hover {
      background-color: #FFFFFF;
      color: #4A2F7C;
    }

    .forgot-password-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    .forgot-password-modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background-color: #fff;
      padding: 30px 40px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      width: 90%;
      max-width: 400px;
      text-align: center;
      position: relative;
    }

    .modal-content h2 {
      margin-top: 0;
      margin-bottom: 15px;
      color: #333;
      font-size: 20px;
    }

    .modal-content p {
      color: #555;
      font-size: 14px;
      margin-bottom: 20px;
      line-height: 1.6;
    }

    .modal-content input {
      background-color: #F3F3F3;
      border: 1px solid #E0E0E0;
      padding: 12px 15px;
      margin-bottom: 20px;
      width: 100%;
      border-radius: 8px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .modal-content input:focus {
      outline: none;
      border-color: #5D3A9B;
      box-shadow: 0 0 0 2px rgba(93, 58, 155, 0.2);
    }

    .modal-content button[type="submit"] {
      border-radius: 8px;
      border: none;
      background-color: #4A2F7C;
      color: #FFFFFF;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
    }

    .modal-content button[type="submit"]:hover {
      background-color: #5D3A9B;
    }

    .modal-close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 28px;
      font-weight: bold;
      color: #aaa;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .modal-close-button:hover {
      color: #333;
    }

    @media (max-width: 768px) {
      .auth-form-component-container {
        flex-direction: column-reverse;
        border-radius: 0;
        box-shadow: none;
        max-width: 100%;
      }

      .form-area-section, .welcome-panel-section {
        padding: 30px 20px;
        width: 100%;
        border-radius: 0;
      }

      .form-area-section h1 {
        font-size: 24px;
        text-align: center;
      }

      .welcome-panel-section h1 {
        font-size: 22px;
      }

      .welcome-panel-section p {
        margin: 15px 0 25px;
        font-size: 13px;
      }

      .welcome-panel-section {
        margin-left: 0;
        min-height: 220px;
      }
    }
  `;

  const SignInForm = () => (
    <form onSubmit={handleSubmitSignIn}>
      <h1>Sign In</h1>
      <input type="tel" placeholder="Phone Number (9XXXXXXXXX)" pattern="^(98|97)\\d{8}$" title="Use Nepali phone number." value={signInPhone} onChange={(e) => setSignInPhone(e.target.value)} required />
      <input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} required />
      <div className="forgot-password-link-container">
        <a href="#" className="forgot-password-link" onClick={(e) => { e.preventDefault(); setShowForgotPasswordModal(true); }}>Forgot Password?</a>
      </div>
      <button type="submit">Login</button>
      <span className="form-switch-info mobile-only">Don't have an account? <a onClick={handleTogglePanel}>Sign Up</a></span>
    </form>
  );

  const SignUpForm = () => (
    <form onSubmit={handleSubmitSignUp}>
      <h1>Create Account</h1>
      <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <input type="tel" placeholder="Phone Number (98XXXXXXXX)" pattern="^(98|97)\\d{8}$" title="Use Nepali phone number." value={signUpPhone} onChange={(e) => setSignUpPhone(e.target.value)} required />
      <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
      <button type="submit">Sign Up</button>
      <span className="form-switch-info mobile-only">Already have an account? <a onClick={handleTogglePanel}>Sign In</a></span>
    </form>
  );

  return (
    <>
      <style>{css}</style>
      <div className="auth-form-component-container">
        <div className="form-area-section">{isSignUpActive ? <SignUpForm /> : <SignInForm />}</div>
        <div className="welcome-panel-section">
          {isSignUpActive ? (
            <>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button onClick={handleTogglePanel}>Login</button>
            </>
          ) : (
            <>
              <h1>Hello, Player!</h1>
              <p>Register with your personal details to sign up</p>
              <button onClick={handleTogglePanel}>Sign Up</button>
            </>
          )}
        </div>
      </div>

      <div className={`forgot-password-modal ${showForgotPasswordModal ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="modal-close-button" onClick={() => setShowForgotPasswordModal(false)}>&times;</button>
          <h2>Reset Password</h2>
          <p>Enter your phone number below. We will send you a link to reset your password.</p>
          <form onSubmit={handleSubmitForgotPassword}>
            <input type="tel" placeholder="Phone Number (9XXXXXXXXX)" pattern="^(98|97)\\d{8}$" title="Use Nepali phone number." value={forgotPasswordPhone} onChange={(e) => setForgotPasswordPhone(e.target.value)} required />
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
