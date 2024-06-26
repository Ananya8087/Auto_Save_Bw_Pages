(function () {
  

  let isSaveInProgress = false; // Flag to track if save draft operation is in progress

  // Function to simulate clicking the "Next Page" or "Previous Page" button
  function clickPageNavigationButton(direction) {
    return new Promise((resolve, reject) => {
      let buttonSelector;
      if (direction === 'next') {
        buttonSelector = '.image_controls .p-button img[src*="rightArrow"]';
      } else if (direction === 'previous') {
        buttonSelector = '.image_controls .p-button img[src*="leftArrow"]';
      }

      const pageButton = document.querySelector(buttonSelector)?.closest('.p-button');
      if (pageButton) {
        console.log(`${direction} page button found. Simulating click...`);
        pageButton.disabled = false; // Ensure button is enabled
        pageButton.click(); // Simulate click event
        console.log(`Clicked on the "${direction.charAt(0).toUpperCase() + direction.slice(1)} Page" button.`);

        // Additional logging to observe changes after navigation
        setTimeout(() => {
          console.log('After navigation: Current URL:', window.location.href);
          console.log('After navigation: Document title:', document.title);
          // Add more observations as needed
          resolve(); // Resolve the promise after navigation completes
        }, 7000); // Adjust delay as needed to ensure navigation completes
      } else {
        console.log(`${direction} page button not found.`);
        reject(new Error(`${direction} page button not found.`));
      }
    });
  }

  // Function to simulate clicking the "Save Draft" button
  function clickSaveDraftButton() {
    return new Promise((resolve, reject) => {
      if (isSaveInProgress) {
        console.log('Save operation already in progress. Ignoring.');
        return reject(new Error('Save operation already in progress.'));
      }

      const saveDraftButton = document.querySelector('.qcButtons .qc_reject_btn');
      if (saveDraftButton) {
        isSaveInProgress = true; // Set flag to true before starting save operation
        console.log('Attempting to click on the "Save Draft" button.');
        saveDraftButton.click();
        console.log('Clicked on the "Save Draft" button.');

        // Simulate an asynchronous save operation
        setTimeout(() => {
          console.log('Save Draft completed.');
          isSaveInProgress = false; // Reset flag after save draft completes
          resolve(); // Resolve the promise after save draft completes
        }, 1000); // Simulated delay of 1000 milliseconds (adjust as needed)
      } else {
        console.log('Save Draft button not found.');
        reject(new Error('Save Draft button not found.'));
      }
    });
  }

  // Function to create the "Save & Next" and "Save & Previous" buttons
  function createSaveAndNavigationButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.top = '5px';
    buttonContainer.style.right = '400px';
    buttonContainer.style.zIndex = '1000'; // Ensure it's on top of other elements

    // Save & Previous button
    const saveAndPreviousButton = document.createElement('button');
    saveAndPreviousButton.textContent = 'Save & Previous';
    saveAndPreviousButton.id = 'save_and_previous';
    saveAndPreviousButton.style.padding = '10px';
    saveAndPreviousButton.style.cursor = 'pointer';
    saveAndPreviousButton.style.marginRight = '10px';

    saveAndPreviousButton.addEventListener('click', () => {
      clickSaveDraftButton()
        .then(() => {
          console.log('Save Draft completed. Initiating previous page navigation...');
          return clickPageNavigationButton('previous');
        })
        .then(() => {
          console.log('Previous page navigation completed.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });

    // Save & Next button
    const saveAndNextButton = document.createElement('button');
    saveAndNextButton.textContent = 'Save & Next';
    saveAndNextButton.id = 'save_and_next';
    saveAndNextButton.style.padding = '10px';
    saveAndNextButton.style.cursor = 'pointer';

    saveAndNextButton.addEventListener('click', () => {
      clickSaveDraftButton()
        .then(() => {
          console.log('Save Draft completed. Initiating next page navigation...');
          return clickPageNavigationButton('next');
        })
        .then(() => {
          console.log('Next page navigation completed.');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    });

    buttonContainer.appendChild(saveAndPreviousButton); // Append Save & Previous first
    buttonContainer.appendChild(saveAndNextButton); // Then append Save & Next
    document.body.appendChild(buttonContainer);
  }

  // Call function to create the "Save & Next" and "Save & Previous" buttons on page load
  createSaveAndNavigationButtons();

})();
