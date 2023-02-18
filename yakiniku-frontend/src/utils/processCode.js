const processCode = async (groups) => {
    
      let mints = [];
      let emails = [];
    
      for (var i = 0; i < groups.length; i++) {
        console.log(groups[i]);
    
        const mintNumber = parseInt(groups[i].mintValue)
        mints.push(mintNumber);
    
        const emailArray = groups[i].emails.split(' ').join('').split(",");
        emails.push(emailArray)
      }
    
      console.log(mints);
      console.log(emails);
      // call function with mints and emails
    };

export default processCode;