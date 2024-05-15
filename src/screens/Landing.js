import React, { useState } from "react";
import './Landing.css';

const url = 'http://localhost:5000';

const Home = () =>
  <>
    <h1>Home page</h1>
    <p>
      You are viewing this page because you are logged in
    </p>
  </>

const Activation = () =>
  <>
    <h1>Activation page</h1>
  </>

const Account = () => {
  const [accountId, setAccountId] = useState("");
  const [accountUserProfile, setAccountUserProfile] = useState({});
  const [isEditedAccountProfile, setEditedAccountProfile] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${url}/account/${accountId}`, {
      method: "GET"
    }).then(response => {
      return response.json();
    }).then(response => {
      setAccountUserProfile(response);
    })
      .catch(error => {
        console.error(error)
      });
  }

  const handleAccountUpdatesSubmit = (event) => {
    event.preventDefault();
    fetch(`${url}/account/${accountId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountUserProfile)
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to update user profile");
      })
      .catch(error => {
        console.error(error)
      });
  }

  const validateAccountId = (id) => {
    return id && id.length;
  }

  const handleAddresChange = (event) => {
    setAccountUserProfile({ ...accountUserProfile, ...{ address: event.target.value } })
  }

  return (
    <>
      <h1>Account page</h1>
      <form className="searchForm" onSubmit={handleSubmit}>
        <label className="searchLabel">Enter accountId:
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(validateAccountId(e.target.value) && e.target.value)}
          />
        </label>
        <span />
        <input type="submit" />
      </form>
      <br />
      <h3>Account Info:</h3>
      <form className="accountForm" onSubmit={handleAccountUpdatesSubmit}>
        <label >First name:
          <input type="text" id="firstName" name="firstName" value={accountUserProfile.firstName} disabled /></label>
        <label>Last name:
          <input type="text" id="lastName" name="lastName" value={accountUserProfile.lastName} disabled /></label>
        <label>Owner address:
          <input
            type="text"
            id="address"
            name="address"
            value={accountUserProfile.address}
            disabled={!isEditedAccountProfile}
            onChange={handleAddresChange}
          /></label>
        <label>Data account created:
          <input type="text" id="createdAt" name="createdAt" value={accountUserProfile.createdAt} disabled /></label>
        {isEditedAccountProfile && <input type="submit" value="Update" className="accountFormUpdate" />}
      </form>
      <div className="accountProfileEditing">
        <button onClick={() => setEditedAccountProfile(true)} disabled={isEditedAccountProfile}>Edit</button>
        <button onClick={() => setEditedAccountProfile(false)} disabled={!isEditedAccountProfile}>Cancel</button>
      </div>
    </>
  )
}


const Landing = ({ }) => {
  const logout = () => {
    fetch(`${url}/logout`, {
      method: "GET"
    })
      .then(response => {
        if (response.status === 200) return response.json();
        throw new Error("failed to log out user");
      })
      .catch(error => {
        console.error(error)
      });

    window.location.reload();
  };

  const tabNames = ['home', 'activation', 'account'];
  const [currentTab, setCurrentTab] = useState(tabNames[0]);

  return (
    <div className={"main"}>
      <div className={"navBar"}>
        <div
          onClick={() => setCurrentTab(tabNames[0])}
          className={"navBarItemStyle"}
        >
          Home
        </div>
        <div
          onClick={() => setCurrentTab(tabNames[1])}
          className={"navBarItemStyle"}
        >
          Activation page
        </div>
        <div
          onClick={() => setCurrentTab(tabNames[2])}
          className="navBarItemStyle"
        >
          Account
        </div>
        <button
          onClick={logout}
          style={{
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      {currentTab === tabNames[0] && <Home />}
      {currentTab === tabNames[1] && <Activation />}
      {currentTab === tabNames[2] && <Account />}

    </div>
  );
};

export default Landing;