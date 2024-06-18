(function () {
  // Simulate function to click on the "Next Page" button
  function clickNextPageButton() {
  const nextPageButton = document.querySelector('.image_controls .p-button img[src*="rightArrow"]').closest('.p-button');
  if (nextPageButton) {
  console.log('Next page button found. Simulating click...');
  nextPageButton.disabled = false; // Ensure button is enabled
  nextPageButton.click(); // Simulate click event
  console.log('Clicked on the "Next Page" button.');
  
    // Additional logging to observe changes after navigation
    setTimeout(() => {
      console.log('After navigation: Current URL:', window.location.href);
      console.log('After navigation: Document title:', document.title);
      // Add more observations as needed
    }, 7000); // Adjust delay as needed to ensure navigation completes
  } else {
    console.log('Next page button not found.');
  }
  }
  
  console.log('Waiting for 3 seconds before simulating click on "Next Page" button...');
  function clickSaveDraftButton() {
  return new Promise((resolve, reject) => {
  const saveDraftButton = document.querySelector('.qcButtons .qc_reject_btn');
  if (saveDraftButton) {
  console.log('Attempting to click on the "Save Draft" button.');
  saveDraftButton.click();
  console.log('Clicked on the "Save Draft" button.');
  

      // Simulate an asynchronous save operation (replace with actual logic)
      setTimeout(() => {
        console.log('Save Draft completed.');
        resolve();
      }, 7000); // Simulated delay of 2000 milliseconds (adjust as needed)
    } else {
      console.log('Save Draft button not found.');
      reject(new Error('Save Draft button not found.'));
    }
  });
  }
  // Simulate clicking the "Next Page" button after a delay
  setTimeout(() => {
  

  clickSaveDraftButton();
  clickNextPageButton();
  }, 7000); // Delay of milliseconds (adjust as needed)
  })();