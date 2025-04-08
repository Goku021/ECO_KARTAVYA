document.addEventListener("DOMContentLoaded", () => {
    const tips = [
      {
        icon: "fa-recycle",
        title: "Recycle Properly",
        description: "Ensure you separate recyclables from non-recyclables to reduce landfill waste."
      },
      {
        icon: "fa-bicycle",
        title: "Use Sustainable Transport",
        description: "Opt for biking, walking, or public transport to reduce carbon emissions."
      },
      {
        icon: "fa-lightbulb",
        title: "Conserve Energy",
        description: "Switch off lights and electronics when not in use to save electricity."
      },
      {
        icon: "fa-shopping-bag",
        title: "Use Reusable Bags",
        description: "Bring your own bags when shopping to minimize plastic waste."
      },
      {
        icon: "fa-tint",
        title: "Save Water",
        description: "Fix leaks and turn off the tap while brushing to conserve water."
      },
      {
        icon: "fa-seedling",
        title: "Plant Trees",
        description: "Trees absorb CO2 and provide oxygen. Planting them helps combat climate change."
      },

      {
        icon: "fa-bottle-water",
        title: "Refill Water Bottles",
        description: "Use reusable bottles instead of buying plastic bottles every time."
      },
      {
        icon: "fa-utensils",
        title: "Avoid Food Waste",
        description: "Plan meals and store leftovers properly to reduce waste."
      },
      {
        icon: "fa-bicycle",
        title: "Cycle More",
        description: "Use a bicycle for short trips to reduce your carbon footprint."
      },
      {
        icon: "fa-recycle",
        title: "Recycle Regularly",
        description: "Separate your dry and wet waste and recycle plastics, paper, and metals."
      },
      {
        icon: "fa-tree",
        title: "Plant Trees",
        description: "Plant and care for trees to improve air quality and biodiversity."
      },
      {
        icon: "fa-shopping-bag",
        title: "Use Cloth Bags",
        description: "Always carry reusable cloth bags instead of plastic ones while shopping."
      },
      {
        icon: "fa-shower",
        title: "Short Showers",
        description: "Keep your showers short to save a significant amount of water."
      },
      {
        icon: "fa-bolt",
        title: "Use LED Bulbs",
        description: "Replace traditional bulbs with LEDs to use less power."
      },
      {
        icon: "fa-seedling",
        title: "Compost at Home",
        description: "Turn kitchen waste into compost to nourish your garden and reduce landfill."
      },
      {
        icon: "fa-bus",
        title: "Take Public Transport",
        description: "Reduce pollution and traffic by taking the bus or train."
      },
      {
        icon: "fa-walking",
        title: "Walk Short Distances",
        description: "Walking is eco-friendly and great for your health."
      },
      {
        icon: "fa-plug",
        title: "Unplug Devices",
        description: "Unplug chargers and devices when not in use to save energy."
      },
      {
        icon: "fa-donate",
        title: "Donate or Reuse",
        description: "Give away old clothes or electronics instead of throwing them out."
      },
      
      {
        icon: "fa-broom",
        title: "Say No to Single-Use",
        description: "Avoid disposable plates, cups, and cutlery whenever possible."
      }

      
    ];
  
    const tipsContainer = document.querySelector(".tips-container");
  
    tips.forEach(tip => {
      const tipCard = document.createElement("div");
      tipCard.classList.add("tip-card");
  
      tipCard.innerHTML = `
        <i class="fas ${tip.icon}"></i>
        <h3>${tip.title}</h3>
        <p>${tip.description}</p>
      `;
  
      tipsContainer.appendChild(tipCard);
    });
  });
  