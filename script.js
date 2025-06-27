document.addEventListener('DOMContentLoaded', function () {
  const stackSlider = document.getElementById('stackSize');
  const stackDisplay = document.getElementById('stackDisplay');
  const position = document.getElementById('position');
  const vsPosition = document.getElementById('vsPosition');
  const bountyToggle = document.getElementById('bountyToggle');
  const results = document.getElementById('results');

  async function loadRanges() {
    const res = await fetch('./data/ranges.json');
    return res.json();
  }

  function displayRange(ranges, stack, pos, vsPos, isBounty) {
    const key = `${stack}_${pos}_${vsPos}_${isBounty ? "bounty" : "noBounty"}`;
    const data = ranges[key] || "No range data found.";
    results.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }

  function updateDisplay(ranges) {
    const stack = stackSlider.value;
    const pos = position.value;
    const vsPos = vsPosition.value;
    const isBounty = bountyToggle.checked;
    stackDisplay.textContent = stack;
    displayRange(ranges, stack, pos, vsPos, isBounty);
  }

  loadRanges().then(ranges => {
    stackSlider.addEventListener('input', () => updateDisplay(ranges));
    position.addEventListener('change', () => updateDisplay(ranges));
    vsPosition.addEventListener('change', () => updateDisplay(ranges));
    bountyToggle.addEventListener('change', () => updateDisplay(ranges));
    updateDisplay(ranges);
  });
});
