'use strict'

module.exports = (ObjectId) => {

    return {
        '_indicator': [{ type: ObjectId, ref: 'indicator' }],
        
        'act': { type: String },
        'description': { type: String },

        'metadata': { type: ObjectId, ref: 'metadata' }
    }
}

