document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("irisForm");
    const result = document.querySelector(".result");
    const predictionText = document.getElementById("prediction-text");
    const tryAgainBtn = document.querySelector(".try-again-btn");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const data = {
        sepal_length: parseFloat(document.getElementById("sepal_length").value),
        sepal_width: parseFloat(document.getElementById("sepal_width").value),
        petal_length: parseFloat(document.getElementById("petal_length").value),
        petal_width: parseFloat(document.getElementById("petal_width").value),
      };
  
      try {
        const response = await fetch("/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) throw new Error("Prediction failed");
  
        const res = await response.json();
        predictionText.textContent = res.prediction;
        result.classList.remove("hidden");
      } catch (err) {
        console.error("Error:", err);
        alert("Error in prediction");
      }
    });
  
    tryAgainBtn.addEventListener("click", () => {
      result.classList.add("hidden");
      document.getElementById("irisForm").reset();
    });
  });
  