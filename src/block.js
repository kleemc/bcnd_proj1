/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer.from(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }
    
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash                              
            // Recalculate the hash of the Block
            // Comparing if the hashes changed
            // Returning the Block is not valid
            // Returning the Block is valid

            const existingHash = self.hash;                             // extract existing hash from block
            self.hash = null;                                           // set has back to null temporarily
            const newHash = SHA256(JSON.stringify(self)).toString();    // create a new hash
            self.hash = existingHash;                                   // restore original

            if (existingHash == newHash) {
                resolve("Valid block")
            } else {
                reject("Invalid block")
          }
        });
     }
    

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
    
     getBData() {
        // Getting the encoded data saved in the Block
        // Decoding the data to retrieve the JSON representation of the object
        // Parse the data to an object to be retrieve.

        // Resolve with the data if the object isn't the Genesis block
        // Getting the encoded data saved in the Block

        let data = this.body;
        data = hex2ascii(data);

        if (this.height > 0) {
            return JSON.parse(data);
        } else {
            return "Error - this is a genesis block"
        }
    }
}



module.exports.Block = Block;                    // Exposing the Block class as a module
