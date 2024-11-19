import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "_patientName", "type": "string" },
      { "internalType": "string", "name": "_gender", "type": "string" },
      { "internalType": "string", "name": "_diagnosedDisease", "type": "string" },
      { "internalType": "string", "name": "_treatment", "type": "string" },
      { "internalType": "string", "name": "_visitDate", "type": "string" },
      { "internalType": "string", "name": "_nextVisitDate", "type": "string" },
    ],
    "name": "addHealthRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
];

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [account, setAccount] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosedDisease, setDiagnosedDisease] = useState("");
  const [treatment, setTreatment] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [nextVisitDate, setNextVisitDate] = useState("");
  const [healthRecords, setHealthRecords] = useState([]);
  const [showPatientRecords, setShowPatientRecords] = useState(false);
  const [showDoctorRecords, setShowDoctorRecords] = useState(false);
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const connectWalletOnLoad = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.getNetwork();
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]);

          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
            } else {
              alert("Please connect an account to continue");
              setAccount(null);
            }
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
          alert("Failed to connect to MetaMask. Check your MetaMask settings.");
        }
      } else {
        alert("MetaMask is not installed. Please install it to use this app.");
      }
    };
    connectWalletOnLoad();
  }, []);

  const handleSubmit = async () => {
    if (!account) {
      alert("Please connect your MetaMask wallet to add a record.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.addHealthRecord(
        patientName,
        gender,
        diagnosedDisease,
        treatment,
        visitDate,
        nextVisitDate
      );

      await tx.wait();
      alert("Health record added successfully!");

      const newRecord = {
        patientName,
        gender,
        diagnosedDisease,
        treatment,
        visitDate,
        nextVisitDate,
      };
      setHealthRecords([...healthRecords, newRecord]);
    } catch (error) {
      console.error("Error adding health record:", error);
      alert("Failed to add health record. Check the console for details.");
    }
  };

  const handleViewPatientRecords = () => {
    setShowPatientRecords(!showPatientRecords);
  };

  const handleViewDoctorRecords = () => {
    if (!isAuthenticated) {
      alert("Please login with your credentials.");
      return;
    }
    setShowDoctorRecords(!showDoctorRecords);
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setShowPatientRecords(false);
    setShowDoctorRecords(false);
  };

  const handleLogin = () => {
    if (username === "Doc 1" && password === "Records001") {
      setIsAuthenticated(true);
      alert("Login successful!");
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    setShowDoctorRecords(false);
    alert("Logged out successfully.");
  };

  return (
    <div>
      <h1>Healthcare Record Management</h1>
      {account ? <p>Connected account: {account}</p> : <p>Please connect to MetaMask.</p>}

      <div>
        <button onClick={() => handleRoleSwitch("patient")}>Switch to Patient Mode</button>
        <button onClick={() => handleRoleSwitch("doctor")}>Switch to Doctor Mode</button>
      </div>

      {role === "patient" && (
        <div>
          <h2>Patient Mode</h2>
          <form>
            <input placeholder="Patient Name" onChange={(e) => setPatientName(e.target.value)} />
            <input placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
            <input placeholder="Disease Diagnosed" onChange={(e) => setDiagnosedDisease(e.target.value)} />
            <input placeholder="Treatment" onChange={(e) => setTreatment(e.target.value)} />
            <input placeholder="Visit Date" type="date" onChange={(e) => setVisitDate(e.target.value)} />
            <input placeholder="Next Visit Date" type="date" onChange={(e) => setNextVisitDate(e.target.value)} />
            <button type="button" onClick={handleSubmit}>Add Record</button>
          </form>
          <button onClick={handleViewPatientRecords}>
            {showPatientRecords ? "Hide My Records" : "View My Records"}
          </button>
          {showPatientRecords && healthRecords.length > 0 && (
            <ul>
              {healthRecords.map((record, index) => (
                <li key={index}>
                  <p>Patient Name: {record.patientName}</p>
                  <p>Gender: {record.gender}</p>
                  <p>Disease Diagnosed: {record.diagnosedDisease}</p>
                  <p>Treatment: {record.treatment}</p>
                  <p>Visit Date: {record.visitDate}</p>
                  <p>Next Visit Date: {record.nextVisitDate}</p>
                  <hr />
                </li>
              ))}
            </ul>
          )}
          {showPatientRecords && healthRecords.length === 0 && <p>No records found.</p>}
        </div>
      )}

      {role === "doctor" && (
        <div>
          <h2>Doctor Mode</h2>
          {!isAuthenticated ? (
            <div>
              <h3>Login to View Records</h3>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          ) : (
            <div>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleViewDoctorRecords}>
                {showDoctorRecords ? "Hide Records" : "Request to View Records"}
              </button>
              {showDoctorRecords && healthRecords.length > 0 && (
                <ul>
                  {healthRecords.map((record, index) => (
                    <li key={index}>
                      <p>Patient Name: {record.patientName}</p>
                      <p>Gender: {record.gender}</p>
                      <p>Disease Diagnosed: {record.diagnosedDisease}</p>
                      <p>Treatment: {record.treatment}</p>
                      <p>Visit Date: {record.visitDate}</p>
                      <p>Next Visit Date: {record.nextVisitDate}</p>
                      <hr />
                    </li>
                  ))}
                </ul>
              )}
              {showDoctorRecords && healthRecords.length === 0 && <p>No records found.</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
