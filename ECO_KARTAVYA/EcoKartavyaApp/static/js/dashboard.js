document.addEventListener('DOMContentLoaded', () => {
    // Progress ring animation
    const progressCircle = document.querySelector('.progress-ring .progress');
    const percentageLabel = document.querySelector('.percentage');
    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const progressValue = 65; // Example value; you can update this dynamically

    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    function setProgress(percent) {
        const offset = circumference - (percent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        percentageLabel.textContent = `${percent}%`;
    }

    setTimeout(() => {
        setProgress(progressValue);
    }, 300);

    // Animate EcoPoints count
    const pointsEl = document.getElementById('points');
    const finalPoints = parseInt(pointsEl.textContent);
    let count = 0;

    const counter = setInterval(() => {
        if (count < finalPoints) {
            count += 25; // You can adjust the speed
            pointsEl.textContent = count > finalPoints ? finalPoints : count;
        } else {
            clearInterval(counter);
        }
    }, 30);

    // Fade in on scroll (for future enhancements)
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    faders.forEach(fader => observer.observe(fader));
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("ecoDashboardChart").getContext("2d");
    const chartDataSelector = document.getElementById("chartDataSelector");
    const chartTypeSelector = document.getElementById("chartTypeSelector");

    const chartDataSets = {
        weekly: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [3, 4, 2, 5, 1, 6, 4],
            label: 'Plastic Bags Avoided'
        },
        daily: {
            labels: ['8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM'],
            data: [1, 2, 1, 3, 2, 1],
            label: 'Electricity Saved (kWh)'
        },
        monthly: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            data: [12, 9, 15, 10, 7, 14],
            label: 'Liters of Water Saved'
        },
        products: {
            labels: ['Reusable Bottle', 'Cloth Bag', 'Bamboo Brush', 'LED Bulb'],
            data: [8, 10, 5, 12],
            label: 'Eco Products Used'
        }
    };

    let ecoChart;

    function createChart(dataType, chartType) {
        const selected = chartDataSets[dataType];

        if (ecoChart) ecoChart.destroy();

        ecoChart = new Chart(ctx, {
            type: chartType,
            data: {
                labels: selected.labels,
                datasets: [{
                    label: selected.label,
                    data: selected.data,
                    backgroundColor: [
                        '#38a169', '#48bb78', '#68d391', '#9ae6b4',
                        '#c6f6d5', '#f0fff4', '#81e6d9'
                    ],
                    borderColor: '#2f855a',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: "#2d3748",
                            font: {weight: 'bold'}
                        }
                    },
                    title: {
                        display: true,
                        text: 'Your Eco Contribution',
                        color: '#2f855a',
                        font: {
                            size: 18,
                            weight: 'bold'
                        },
                        padding: {top: 10, bottom: 20}
                    },
                    tooltip: {
                        backgroundColor: "#2f855a",
                        titleColor: "#fff",
                        bodyColor: "#fff"
                    }
                },
                scales: chartType === 'radar' || chartType === 'doughnut' || chartType === 'pie' ? {} : {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "#4a5568"
                        },
                        grid: {
                            color: "#e2e8f0"
                        }
                    },
                    x: {
                        ticks: {
                            color: "#4a5568"
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Initial chart
    createChart("weekly", "bar");

    chartDataSelector.addEventListener("change", () => {
        createChart(chartDataSelector.value, chartTypeSelector.value);
    });

    chartTypeSelector.addEventListener("change", () => {
        createChart(chartDataSelector.value, chartTypeSelector.value);
    });
});

document.getElementById("downloadPNG").addEventListener("click", () => {
    const canvas = document.getElementById("ecoDashboardChart");
    const link = document.createElement("a");
    link.download = "eco_dashboard_chart.png";
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
});

document.getElementById("exportPDF").addEventListener("click", async () => {
    const {jsPDF} = window.jspdf;
    const canvas = document.getElementById("ecoDashboardChart");

    const canvasImage = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF('landscape');
    pdf.setFontSize(18);
    pdf.text("Your Eco Contribution Chart", 14, 20);
    pdf.addImage(canvasImage, "PNG", 10, 30, 270, 120); // Adjust to fit

    pdf.save("eco_chart_report.pdf");
});

// document.getElementById("generateCertificateBtn").addEventListener("click", () => {
//   const canvas = document.getElementById("certificateCanvas");
//   const ctx = canvas.getContext("2d");
//
//   // Clear previous drawing
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//   // Background
//   ctx.fillStyle = "#e6fffa";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//   // Border
//   ctx.strokeStyle = "#38a169";
//   ctx.lineWidth = 8;
//   ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
//
//   // Title
//   ctx.fillStyle = "#22543d";
//   ctx.font = "bold 40px 'Segoe UI'";
//   ctx.textAlign = "center";
//   ctx.fillText("Certificate of Eco Achievement", canvas.width / 2, 100);
//
//   // Subtitle
//   ctx.font = "20px 'Segoe UI'";
//   ctx.fillStyle = "#2f855a";
//   ctx.fillText("Awarded to", canvas.width / 2, 160);
//
//   // User Name (static for now, can be dynamic)
//   ctx.font = "32px 'Segoe UI'";
//   ctx.fillStyle = "#065f46";
//   ctx.fillText("John Doe", canvas.width / 2, 210);
//
//   // Eco contribution text
//   ctx.font = "18px 'Segoe UI'";
//   ctx.fillStyle = "#2f855a";
//   ctx.fillText("For your green actions and dedication towards a sustainable future.", canvas.width / 2, 260);
//
//   // Points & appreciation
//   ctx.font = "18px 'Segoe UI'";
//   ctx.fillText("Total Points: 240 | Level: 🌱 Premium Guardian", canvas.width / 2, 310);
//
//   // Date & EcoKartavya Text
//   const date = new Date().toLocaleDateString();
//   ctx.font = "16px 'Segoe UI'";
//   ctx.textAlign = "left";
//   ctx.fillText("EcoKartavya", 60, 650);
//
//   ctx.textAlign = "right";
//   ctx.fillText(`Date: ${date}`, canvas.width - 60, 650);
//
//   // Load badge image
//   const badgeImg = document.getElementById("badgeImage");
//   badgeImg.onload = () => {
//     ctx.drawImage(badgeImg, canvas.width / 2 - 50, 340, 100, 100);
//
//     // Download logic after image loads
//     const link = document.createElement("a");
//     link.download = "eco_certificate.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   };
//
//   // If already loaded (cached)
//   if (badgeImg.complete) {
//     ctx.drawImage(badgeImg, canvas.width / 2 - 50, 340, 100, 100);
//     const link = document.createElement("a");
//     link.download = "eco_certificate.png";
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   }
// });
//
//
// document.addEventListener("DOMContentLoaded", () => {
//   const toggleBtn = document.getElementById("profileToggle");
//   const dropdown = document.getElementById("profileDropdown");
//
//   toggleBtn.addEventListener("click", (e) => {
//     e.stopPropagation(); // prevent window click from immediately hiding it
//     dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
//   });
//
//   // Click outside to close
//   window.addEventListener("click", (e) => {
//     if (!e.target.closest(".profile-dropdown")) {
//       dropdown.style.display = "none";
//     }
//   });
// });
//
// function showProfileSection(type) {
//   const container = document.getElementById("profileContainer");
//   container.style.display = "block";
//   if (type === "view") {
//     container.innerHTML = `
//       <h2 class="profile-section-title">👤 User Profile</h2>
//       <p><strong>Name:</strong> John Doe</p>
//       <p><strong>Email:</strong> johndoe@example.com</p>
//       <p><strong>Total Eco Points:</strong> 240</p>
//       <p><strong>Membership:</strong> 🌱 Premium</p>
//     `;
//   } else if (type === "edit") {
//     container.innerHTML = `
//       <h2 class="profile-section-title">✏️ Edit Profile</h2>
//       <form>
//         <label>Name</label><br>
//         <input type="text" value="John Doe" /><br><br>
//         <label>Email</label><br>
//         <input type="email" value="johndoe@example.com" /><br><br>
//         <label>Password</label><br>
//         <input type="password" placeholder="•••••••••" /><br><br>
//         <button type="submit">Update Profile</button>
//       </form>
//     `;
//   }
// }
document.getElementById("generateCertificateBtn").addEventListener("click", () => {
    const canvas = document.getElementById("certificateCanvas");
    const ctx = canvas.getContext("2d");

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#e6fffa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = "#38a169";
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = "#22543d";
    ctx.font = "bold 40px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText("Certificate of Eco Achievement", canvas.width / 2, 100);

    // Subtitle
    ctx.font = "20px 'Segoe UI'";
    ctx.fillStyle = "#2f855a";
    ctx.fillText("Awarded to", canvas.width / 2, 160);

    // ✅ Dynamic Username
    ctx.font = "32px 'Segoe UI'";
    ctx.fillStyle = "#065f46";
    ctx.fillText(userName, canvas.width / 2, 210);

    // Eco contribution text
    ctx.font = "18px 'Segoe UI'";
    ctx.fillStyle = "#2f855a";
    ctx.fillText("For your green actions and dedication towards a sustainable future.", canvas.width / 2, 260);

    // ✅ Points & Level (dynamic)
    ctx.font = "18px 'Segoe UI'";
    ctx.fillText(`Total Points: ${totalPoints} | Level: ${ecoLevel}`, canvas.width / 2, 310);

    // Date & EcoKartavya Text
    const date = new Date().toLocaleDateString();
    ctx.font = "16px 'Segoe UI'";
    ctx.textAlign = "left";
    ctx.fillText("EcoKartavya", 60, 650);

    ctx.textAlign = "right";
    ctx.fillText(`Date: ${date}`, canvas.width - 60, 650);

    // Load badge image
    const badgeImg = document.getElementById("badgeImage");
    const drawAndDownload = () => {
        ctx.drawImage(badgeImg, canvas.width / 2 - 50, 340, 100, 100);

        // Download logic
        const link = document.createElement("a");
        link.download = `EcoKartavya_Certificate_${userName.replace(/\s+/g, "_")}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    if (badgeImg.complete) {
        drawAndDownload();
    } else {
        badgeImg.onload = drawAndDownload;
    }
});
