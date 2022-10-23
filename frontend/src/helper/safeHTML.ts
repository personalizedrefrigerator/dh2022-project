
const safeHTML = (data: string|null|undefined) => {
    if (data === null || data === undefined) {
        return null;
    }

    let result = data.replace(/[>]/g, '&gt;').replace(/[<]/g, '&lt;');
    result = result.replace(/[*][*](\S.*\S)[*][*]/g, '<b>$1</b>');

    return result;
};
export default safeHTML;