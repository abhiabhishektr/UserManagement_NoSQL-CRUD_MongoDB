// const p=new Promise((resolve, reject) => {
    
// })
// p
// .then
// .catch


// function name(params) {
    
//     return p()
// }

function asyncOperation() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        const success = true; // Set this to false to simulate a failure
        if (success) {
          resolve('Operation completed successfully');
        } else {
          reject('Operation failed');
        }
      }, 1000);
    });
  }
  

  asyncOperation()
  .then(result => {
    console.log('Fulfilled:', result);
  })
  .catch(error => {
    console.error('Rejected:', error);
  });
