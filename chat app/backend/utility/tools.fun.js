const bycrpt=require('bcryptjs')
const jwt=require('jsonwebtoken');

async function hashpasword(password){
const salt= bycrpt.genSaltSync(12);
const hashedpassword=bycrpt.hashSync(password,salt);
return hashedpassword
}


function hashcomaprepassword(raw,hashpassword){
return bycrpt.compareSync(raw,hashpassword);
   }



function generatetokenandSetcookie(userID,res){
   const token=jwt.sign({userID},process.env.JWT_SECRET_KEY,{expiresIn:'15d'});
      res.cookie('token',token,{httpOnly:true, //prevent xss attack
         secure:process.env.NODE_ENV!=="development",
         maxAge:15*24*60*60*1000
         ,sameSite:"strict"
      })

      }

/**
 * Sanitize input to prevent XSS attacks by encoding HTML entities
 * @param {string} input - The user input to sanitize
 * @returns {string} - The sanitized input
 */
function sanitizeInput(input) {
   return input.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#x27;')
               .replace(/\//g, '&#x2F;');
}



/**
 * Decode sanitized input back to its original form
 * @param {string} input - The sanitized input to decode
 * @returns {string} - The original unsanitized input
 */
function decodeInput(input) {
   return input.replace(/&amp;/g, '&')
               .replace(/&lt;/g, '<')
               .replace(/&gt;/g, '>')
               .replace(/&quot;/g, '"')
               .replace(/&#x27;/g, "'")
               .replace(/&#x2F;/g, '/');
}
// const originalUsername = decodeInput(sanitizedUsername);
// console.log(originalUsername);  // Displays the original unsanitized username




module.exports={hashpasword,hashcomaprepassword,generatetokenandSetcookie,sanitizeInput,decodeInput};