document.getElementById("generateCertificate").addEventListener("click", () => {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");
    const points = 180; // Example: dynamic score can be fetched here
    const userName = "Eco Hero"; // dynamic name
  
    canvas.style.display = "block";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Background
    ctx.fillStyle = "#f0fff4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Border
    ctx.strokeStyle = "#38a169";
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
  
    // Title
    ctx.fillStyle = "#2f855a";
    ctx.font = "36px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("🌱 Eco Achievement Certificate", canvas.width / 2, 100);
  
    // User Info
    ctx.font = "24px Arial";
    ctx.fillStyle = "#22543d";
    ctx.fillText(`Awarded to: ${userName}`, canvas.width / 2, 200);
    ctx.fillText(`Eco Points: ${points}`, canvas.width / 2, 250);
  
    // Appreciation Message
    ctx.font = "20px Verdana";
    ctx.fillStyle = "#2d3748";
    ctx.fillText(`In recognition of your commitment to`, canvas.width / 2, 320);
    ctx.fillText(`a greener and sustainable lifestyle`, canvas.width / 2, 350);
  
    // Footer
    ctx.font = "16px Courier New";
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, canvas.width / 2, 420);
    ctx.fillText(`"Every small action counts!"`, canvas.width / 2, 460);
    ctx.fillText(`- GreenSteps.org`, canvas.width / 2, 490);
  
    // Download as Image
    const link = document.createElement("a");
    link.download = "eco_certificate.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  });
  
  // Share Button Function
  function shareBadge() {
    alert("Feature coming soon: Share your green journey on social media!");
  }
  