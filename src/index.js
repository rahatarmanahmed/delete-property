import property from 'lodash.property';
const _ = { property };

let deleteProperty = (property) => {
    const lastDotIndex = property.lastIndexOf('.');
    // Simple non-nested delete
    if(lastDotIndex === -1) {
        return (obj) => {
            // Return false for non-objects or non-existent props
            if(obj !== Object(obj) || !obj[property]) return false;
            return delete obj[property];
        };
    }
    // Nested delete
    const objKey = property.substring(0, lastDotIndex);
    const propKey = property.substring(lastDotIndex+1);
    return (obj) => {
        let prop = _.property(objKey)(obj);
        // Return false for non-existent props (and incidentally non-objects thx to _.property)
        if(!prop) return false;
        return delete prop[propKey];
    };
};

export default deleteProperty;
