import './App.css';

function App() {
  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "40px",
    background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    minHeight: "100vh",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  };

  const avatarStyle = {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "20px",
    border: "4px solid #4CAF50",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <img
          src="https://i.pravatar.cc/150?img=4"
          alt="avatar"
          style={avatarStyle}
        />
        <h1>Xin chào thầy, em là <span style={{ color: "#4CAF50" }}>La Nguyễn Phúc Thành</span></h1>
        <h3>Sinh viên Khoa Công Nghệ Thông Tin</h3>
        <h4>Trường Đại học Sư Phạm Kỹ Thuật TP.HCM (HCMUTE)</h4>
        <p><b>Email:</b> 22110414@student.hcmute.edu.vn</p>
        
        <hr style={{ margin: "20px 0" }} />
    
      </div>
    </div>
  );
}

export default App;
