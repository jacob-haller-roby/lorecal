export const uniq = (array, identity) => {
    return array.reduce((acc, cur) => {
        if(acc.every(el => identity(el) !== identity(cur))) {
            acc.push(cur);
        }
        return acc;
    }, [])
};